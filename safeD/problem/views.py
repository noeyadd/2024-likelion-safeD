from django.shortcuts import render, redirect
from .models import ProblemQuiz
import random

def start(request):
    return render(request, 'problem.html')

def pstart(request):
    quizzes = list(ProblemQuiz.objects.all())
    random_quizzes = random.sample(quizzes, 5)
    request.session['quiz_ids'] = [quiz.id for quiz in random_quizzes]
    request.session['current_index'] = 0
    request.session['score'] = 0
    request.session['wrong_answers'] = []
    request.session['answers'] = []
    
    return redirect('problem:quiz_view')

def quiz_view(request):
    current_index = request.session.get('current_index', 0)
    quiz_ids = request.session.get('quiz_ids', [])
    if current_index >= len(quiz_ids):
        return redirect('problem:result_view')
    
    quiz_id = quiz_ids[current_index]
    quiz = ProblemQuiz.objects.get(id=quiz_id)
    context = {'quiz': quiz, 'index': current_index + 1}
    return render(request, 'pquiz.html', context)

def submit_answer(request):
    if request.method == 'POST':
        selected_option = request.POST.get('option')
        quiz_id = request.POST.get('quiz_id')
        quiz = ProblemQuiz.objects.get(id=quiz_id)
        
        current_index = request.session.get('current_index', 0)

        if selected_option == quiz.correct_option:
            request.session['score'] += 1
            request.session['answers'].append('O')
        else:
            wrong_answers = request.session.get('wrong_answers', [])
            wrong_answers.append({'quiz_id': quiz_id, 'selected_option': selected_option, 'index': current_index})
            request.session['wrong_answers'] = wrong_answers
            request.session['answers'].append('X')
        request.session['current_index'] += 1
        return redirect('problem:quiz_view')
    return redirect('problem:quiz_view')

def result_view(request):
    score = request.session.get('score', 0)
    total = len(request.session.get('quiz_ids', []))
    answers = request.session.get('answers', [])

    return render(request, 'presult.html', {'score': score, 'total': total, 'answers' : answers})

def note_view(request):
    current_index = request.session.get('note_current_index', 0)
    wrong_answers = request.session.get('wrong_answers', [])
    
    if not wrong_answers:
        return render(request, 'pnote.html', {'message': '틀린 문제가 없습니다.'})
    
    # 틀린 문제를 원래 순서대로 정렬
    wrong_answers.sort(key=lambda x: x['index'])

    # current_index가 리스트의 길이를 넘지 않도록 보정
    current_index = min(current_index, len(wrong_answers) - 1)
    request.session['note_current_index'] = current_index

    current_wrong_answer = wrong_answers[current_index]
    quiz_id = current_wrong_answer['quiz_id']
    selected_option = current_wrong_answer['selected_option']
    quiz = ProblemQuiz.objects.get(id=quiz_id)
    context = {
        'quiz': quiz,
        'index': current_index + 1,
        'total': len(wrong_answers),
        'is_first': current_index == 0,
        'is_last': current_index == len(wrong_answers) - 1,
        'selected_option': selected_option
    }
    return render(request, 'pnote.html', context)

def note_navigation(request, direction):
    if direction == 'next':
        wrong_answers = request.session.get('wrong_answers', [])
        if request.session['note_current_index'] == len(wrong_answers) - 1:
            request.session['note_current_index'] = 0
        else:
            request.session['note_current_index'] = request.session.get('note_current_index', 0) + 1
    return redirect('problem:note_view')