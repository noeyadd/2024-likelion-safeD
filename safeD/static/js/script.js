document.addEventListener("DOMContentLoaded", function () {
  const accelButton = document.getElementById("accelButton");
  const brakeButton = document.getElementById("brakeButton");
  const gorani = document.getElementById("gorani");
  const resultModal = document.getElementById("resultModal");
  const resultText = document.getElementById("resultText");
  const closeModal = document.querySelector(".close");
  const restartButton = document.getElementById("restartButton");
  const homeButton = document.getElementById("homeButton");
  const redLight = document.querySelector(".light.red");
  const yellowLight = document.querySelector(".light.yellow");
  const greenLight = document.querySelector(".light.green");
  const message = document.getElementById("message");
  const car = document.getElementById("car");

  let signalState = "green"; // 초기 신호 상태를 초록불로 설정
  let deerAppeared = false;
  let reactionStartTime;
  let reactionEndTime;
  let isMoving = false;

  // 신호등 상태를 초기화하는 함수
  function initializeSignal() {
    // 모든 신호등 색상을 비활성화
    redLight.classList.remove("active");
    yellowLight.classList.remove("active");
    greenLight.classList.remove("active");

    // 초록불을 켭니다
    signalState = "green";
    greenLight.classList.add("active");
  }

  // 신호등 상태를 변경하는 함수
  function changeSignal() {
    // 모든 신호등 색상을 비활성화
    redLight.classList.remove("active");
    yellowLight.classList.remove("active");
    greenLight.classList.remove("active");

    if (signalState === "green") {
      signalState = "red";
      redLight.classList.add("active"); // 빨간불 켜기
    } else if (signalState === "red") {
      signalState = "yellow";
      yellowLight.classList.add("active"); // 노란불 켜기
    } else if (signalState === "yellow") {
      signalState = "green";
      greenLight.classList.add("active"); // 초록불 켜기
    }
  }

  // 메시지 표시 함수
  function showMessage(text) {
    message.textContent = text;
    message.classList.remove("hidden");
    message.classList.add("show");

    // 일정 시간 후 메시지 숨기기
    setTimeout(() => {
      message.classList.remove("show");
      message.classList.add("hidden");
    }, 2000); // 2초 후에 숨김
  }

  // 자동차 움직임 시작 및 멈춤 함수
  function toggleCarMotion() {
    if (isMoving) {
      car.classList.remove("car-moving");
    } else {
      car.classList.add("car-moving");
    }
    isMoving = !isMoving;
  }

  // 엑셀 버튼 클릭 시 움직임 시작 또는 멈춤
  document.getElementById("accelButton").addEventListener("click", toggleCarMotion);
  // 브레이크 버튼 클릭 시 움직임 멈춤
  document.getElementById("brakeButton").addEventListener("click", function () {
    if (isMoving) toggleCarMotion();
  });

  // 고라니 등장 함수
  function appearDeer() {
    deerAppeared = true;
    reactionStartTime = new Date().getTime(); // 고라니 등장 시간 기록
    gorani.classList.remove("hidden"); // 고라니 표시
  }

  // 엑셀 버튼 클릭 시
  accelButton.addEventListener("click", function () {
    if (signalState === "red") {
      showMessage("Bad");
    } else if (signalState === "green") {
      showMessage("Good");
    }
  });

  // 브레이크 버튼 클릭 시 실행되는 함수
  brakeButton.addEventListener("click", function () {
    if (deerAppeared) {
      reactionEndTime = new Date().getTime();
      const reactionTime = (reactionEndTime - reactionStartTime) / 1000; // 반응 시간 계산 (초)
      endGame(reactionTime);
    } else if (signalState === "red") {
      showMessage("Good");
    } else if (signalState === "green") {
      showMessage("Bad");
    }
  });

  // 게임 종료 및 결과 모달 표시
  function endGame(reactionTime) {
    let reactionMessage = "";
    //0.7 이하 -> 아주 굿
    //0.7 초과 ~ 1.2 -> 굿
    //1.2 -> 분발하세요
    if (reactionTime <= 0.7) {
      reactionMessage = "훌륭해요! 반응 속도가 매우 빠릅니다. \n계속해서 연습해보세요.";
    } else if (reactionTime <= 1.2) {
      reactionMessage = "좋아요! 반응 속도가 양호합니다. \n조금 더 연습하면 더 빨라질 수 있어요.";
    } else {
      reactionMessage = "천천히 다시 도전해 보세요. 반응 속도가 느렸습니다. \n꾸준한 연습이 필요해요.";
    }

    resultText.innerText = `반응 시간: ${reactionTime} 초 \n\n ${reactionMessage}`;
    resultModal.style.display = "block";
    brakeButton.disabled = true;
    gorani.classList.add("hidden");
  }

  // 모달 닫기
  closeModal.addEventListener("click", function () {
    resultModal.style.display = "none";
  });

  // 게임 다시하기 버튼 클릭 시
  restartButton.addEventListener("click", function () {
    resultModal.style.display = "none";
    location.reload(); // 페이지를 새로고침하여 게임을 다시 시작
  });

  // Home으로 돌아가기 버튼 클릭 시
  homeButton.addEventListener("click", function () {
    window.location.href = "/"; // 홈 페이지로 이동
  });

  // 초기 신호등 상태를 설정
  initializeSignal();

  // 주기적으로 신호등 상태 변경
  setInterval(changeSignal, 3000);

  // 무작위로 고라니 등장
  setTimeout(appearDeer, Math.random() * 10000 + 5000); // 5초에서 15초 사이의 무작위 시간
});
