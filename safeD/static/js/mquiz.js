document.addEventListener("DOMContentLoaded", function () {
  const correctBtn = document.getElementById("correct-btn");
  const overlay = document.getElementById("overlay");
  const resultImg = document.getElementById("result-img");
  const resultText = document.getElementById("result-text");
  const nextQuestionOverlayBtn = document.getElementById("next-question-overlay");
  const nextQuestionBtn = document.getElementById("next-question");
  const checkAnswerBtn = document.getElementById("check-answer");
  const buttons = document.querySelectorAll(".btn");
  const btnOverlay = document.querySelectorAll(".btn-overlay");
  let answered = false;

  buttons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault(); // 폼 제출을 막음

      if (answered) return;
      answered = true;

      const formData = new FormData(document.getElementById("quiz-form"));
      formData.set("option", button.value); // 클릭된 버튼의 값을 설정

      fetch(document.getElementById("quiz-form").action, {
        method: "POST",
        headers: {
          "X-CSRFToken": formData.get("csrfmiddlewaretoken"),
        },
        body: new URLSearchParams(formData),
      }).then((response) => {
        if (response.ok) {
          if (button === correctBtn) {
            correctBtn.style.backgroundColor = "#FFC93D";
            resultText.innerHTML = "정답!<br><br>다음으로<br>이동합니다";
            overlay.classList.add("correct");
            overlay.classList.remove("incorrect");
            resultImg.src = correctImageUrl; // 정답 이미지 경로 설정
            checkAnswerBtn.style.display = "none";
            btnOverlay.forEach((btn) => {
              btn.classList.add("correct");
              btn.classList.remove("incorrect");
            });
          } else {
            button.style.backgroundColor = "#D6F0FF";
            correctBtn.style.backgroundColor = "#FFC93D";
            resultText.innerHTML = "오답!";
            overlay.classList.add("incorrect");
            overlay.classList.remove("correct");
            resultImg.src = incorrectImageUrl; // 오답 이미지 경로 설정
            checkAnswerBtn.style.display = "inline-block";
            btnOverlay.forEach((btn) => {
              btn.classList.add("incorrect");
              btn.classList.remove("correct");
            });
          }
          overlay.style.display = "flex";
          nextQuestionBtn.style.display = "block";
        }
      });
    });
  });

  checkAnswerBtn.addEventListener("click", function () {
    overlay.style.display = "none";
    buttons.forEach((button) => {
      if (button !== nextQuestionBtn) {
        button.disabled = true;
      }
    });
  });

  nextQuestionOverlayBtn.addEventListener("click", function () {
    window.location.href = quizViewUrl; // 다음 문제 페이지로 리디렉션
  });

  nextQuestionBtn.addEventListener("click", function () {
    window.location.href = quizViewUrl; // 다음 문제 페이지로 리디렉션
  });
});
