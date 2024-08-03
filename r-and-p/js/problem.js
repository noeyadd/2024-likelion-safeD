document.addEventListener("DOMContentLoaded", function () {
  const home_img = document.getElementById("home_img");

  home_img.src = "img/home2.png";

  const startBtn = document.querySelector(".start-btn");
  startBtn.addEventListener("click", function () {
    window.location.href = "problem-1.html";
  });
});
