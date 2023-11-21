let pg_v = document.querySelector(".pg_v");
let pg = document.querySelector(".innerCircle");
let c = 0;
let c1 = -10; // 온도 그라데이션 표현을 위한것
let degree = 300; // 이 값 수정하면 온도 바뀜 0~360

// 30~40 사이 값으로 변환해서 저장. toFixed(1)은 소수점 1자리까지
let temper = (30 + (degree / 360) * 10).toFixed(1);

//온도에 따라 달라지는 코멘트
let degreeComent = null;
if (degree < 100) {
  degreeComent = "좋지 않아요..";
} else if (100 <= degree && degree < 200) {
  degreeComent = "보통이에요 :)";
} else if (200 <= degree && degree < 300) {
  degreeComent = "좋아요!";
} else if (300 <= degree) {
  degreeComent = "최고에요!";
}
document.getElementById("degree-value").textContent =
  temper + "도. " + degreeComent;

//온도계 돌아가는 애니메이션 setInterval({}, 1) 는 {}안에 이벤트, 1ms 마다 갱신
let plus = setInterval(() => {
  c += 1;
  c1 += 1;

  document.getElementById("temperature").textContent = c; // 숫자 띠리리링 하게

  pg.style.background = `conic-gradient(orange ${c1}deg, white ${c}deg)`; // 대충 큰 원이 잠수함 레이더처럼 한바퀴 돌면서 주황색으로 변함
  pg_v.innerHtml = Math.floor((c / 360) * 100) + "%"; // 그리고 안에 하얀색 살짝 작은 원으로 가려서 원형 프로그레스바 처럼 보이는것

  // 설정한 온도 이상으로 c가 올라가면 정지
  if (c >= degree) {
    clearInterval(plus);
    document.getElementById("temperature").textContent = temper;
  }
}, 1);

//스케쥴 코멘트
let scheduleTime = 10; // 팟 시간 변수
let departure = "경주역"; // 팟 출발지 변수
let destination = "동국대"; // 팟 목적지 변수
document.getElementById("schedule-text").textContent =
  scheduleTime + "시 " + departure + " - " + destination + " 팟이 있어요";

window.onload = function () {
  //로그인 안했는데 홈 주소로 들어려고 할때 다시 로그인 화면으로 보내줌
  // if(localStorage.getItem("test") == null) {
  //   location.href = "../login/index.html";
  // }
};

/*function openDrawer() {
  document.getElementById("user_log").style.height = "800px";
} 이용내역 네모 누르면 밑에 내역 쭈르륵 나오게 하고 싶엇는데 일단 보류 그냥 새 창 만들고 연결하던가 네모 누르면 드르륵 밑에 열리게 연결하던가..*/

function open_log() {
  window.location.href = "user_log/user_log.html"; // 이용내역 페이지로 이동
}
