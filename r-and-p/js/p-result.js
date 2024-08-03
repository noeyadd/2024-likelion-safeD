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
    resultText.textContent =
      "훌륭해요! 모든 문제를 정확히 해결했습니다. 운전 시 매우 신중하고 적절하게 대처할 수 있겠어요!!";
  } else if (score >= 3) {
    resultText.textContent = "좋아요! 대부분의 문제를 잘 해결했습니다. 조금 더 연습하면 더욱 완벽해질 수 있습니다.";
  } else {
    resultText.textContent = `괜찮아요! ${score}가지 상황을 잘 해결했습니다. 더 많은 연습을 통해 문제 해결 능력을 향상시켜 보세요.`;
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
    window.location.href = "problem-1.html";
  });
});
