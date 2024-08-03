document.addEventListener("DOMContentLoaded", function () {
  const home_img = document.getElementById("home_img");
  home_img.src = "img/home2.png";

  const scoreText = document.getElementById("score-text");
  const resultText = document.getElementById("result-text");
  const btnNote = document.querySelector(".btn-note");
  const overlay = document.getElementById("overlay");
  const closeBtn = document.querySelector(".close-btn");
  const btnOverlay = document.querySelector(".btn-overlay");

  const urlParams = new URLSearchParams(window.location.search);
  const score = urlParams.get("score") || 0;
  const mistakes = JSON.parse(urlParams.get("mistakes")) || [];

  scoreText.textContent = `점수 ${score}/5`;

  if (score == 5) {
    resultText.textContent = "훌륭해요! 모든 문제를 정확히 맞혔습니다. 도로 표지판에 대한 기억력이 뛰어나네요!";
  } else {
    resultText.textContent = `다시 도전해 보세요. ${
      5 - score
    }가지 문제에서 실수가 있었습니다. 더 많은 연습이 필요해요.`;
  }

  btnNote.addEventListener("click", function () {
    overlay.style.display = "flex";
    for (let i = 0; i < 5; i++) {
      const resultSpan = document.getElementById(`result-${i + 1}`);
      if (mistakes[i] === true) {
        resultSpan.textContent = "O";
      } else if (mistakes[i] === false) {
        resultSpan.textContent = "X";
      } else {
        resultSpan.textContent = "";
      }
    }
  });

  closeBtn.addEventListener("click", function () {
    overlay.style.display = "none";
  });

  btnOverlay.addEventListener("click", function () {
    window.location.href = "remember-1.html";
  });
});
