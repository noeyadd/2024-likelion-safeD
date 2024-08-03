document.addEventListener("DOMContentLoaded", function () {
  const home_img = document.getElementById("home_img");
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

  home_img.src = "img/home2.png";

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      if (answered) return;
      answered = true;
      if (button === correctBtn) {
        correctBtn.style.backgroundColor = "#FFC93D";
        resultText.innerHTML = "정답!<br>다음으로 이동합니다";
        overlay.classList.add("correct");
        overlay.classList.remove("incorrect");
        resultImg.src = "img/correct.png";
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
        resultImg.src = "img/incorrect.png";
        checkAnswerBtn.style.display = "inline-block";
        btnOverlay.forEach((btn) => {
          btn.classList.add("incorrect");
          btn.classList.remove("correct");
        });
      }
      overlay.style.display = "flex";
      nextQuestionBtn.style.display = "block";
    });
  });

  nextQuestionOverlayBtn.addEventListener("click", function () {
    window.location.href = "problem-1.html";
  });

  nextQuestionBtn.addEventListener("click", function () {
    window.location.href = "problem-1.html";
  });

  checkAnswerBtn.addEventListener("click", function () {
    overlay.style.display = "none";
    buttons.forEach((button) => {
      if (button !== nextQuestionBtn) {
        button.disabled = true;
      }
    });
  });
});
