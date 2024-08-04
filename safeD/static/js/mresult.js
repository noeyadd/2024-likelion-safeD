document.addEventListener("DOMContentLoaded", function () {
    const home_img = document.getElementById("home_img");
    home_img.src = "img/home2.png";

    const btnNote = document.querySelector(".btn-note");
    const overlay = document.getElementById("overlay");
    const closeBtn = document.querySelector(".close-btn");

    // 오답노트 버튼 클릭 시 오버레이 표시
    btnNote.addEventListener("click", function () {
        overlay.style.display = "flex";
    });

    // 오버레이 닫기 버튼 클릭 시 오버레이 숨기기
    closeBtn.addEventListener("click", function () {
        overlay.style.display = "none";
    });
});
