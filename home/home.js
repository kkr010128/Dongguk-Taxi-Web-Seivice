let pg_v = document.querySelector(".pg_v");
let pg = document.querySelector(".innerCircle");
let c = 0;
let c1 = -10;
let degree = 300; // 이 값 수정하면 온도 바뀜 0~360

//온도에 따라 달라지는 코멘트
let degreeComent = null;
if (degree < 100) {
  degreeComent = "사람새끼신가요?";
} else if (100 <= degree && degree < 200) {
  degreeComent = "좀 더 친절하게";
} else if (200 <= degree && degree < 300) {
  degreeComent = "매너 굳~";
} else if (300 <= degree) {
  degreeComent = "이시대의 매너인";
}
document.getElementById("degree-value").textContent =
  degree + "도. " + degreeComent;

//온도계 돌아가는 애니메이션
let plus = setInterval(() => {
  c += 3;
  c1 += 3;
  pg.style.background = `conic-gradient(orange ${c1}deg, white ${c}deg)`;
  pg_v.innerHtml = Math.floor((c / 360) * 100) + "%";
  if (c >= degree) {
    clearInterval(plus);
  }
}, 10);

//스케쥴 코멘트
let scheduleTime = 10; // 팟 시간 변수
let departure = "경주역"; // 팟 출발지 변수
let destination = "동국대"; // 팟 목적지 변수
document.getElementById("schedule-text").textContent =
  scheduleTime + "시 " + departure + " - " + destination + " 팟이 있어요";
