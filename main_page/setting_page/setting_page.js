// function redirectDevInfo() {
//     window.location.href = "http://dongguk-taxi.kro.kr/dongguk_dh/main_page/setting_page/dev_info/dev_info.html";
//   }

  const handle = document.getElementById("handle");
  const drawer = document.getElementById("drawer");
  const mainWrap = document.querySelectorAll(".wrap_main");
  
  function drawerOpen(){
    if (drawer.classList.contains("drawer_close")) {
      console.log("drawer Open!");
      drawer.classList.remove("drawer_close");
      drawer.classList.add("drawer_open");
    }
    else if (drawer.classList.contains("drawer_open")) {
      console.log("drawer Closed");
      drawer.classList.remove("drawer_open");
      drawer.classList.add("drawer_close");
    }
  }
  
  function drawerClose(){
    if (drawer.classList.contains("drawer_open")) {
      console.log("drawer Closed!");
      drawer.classList.remove("drawer_open");
      drawer.classList.add("drawer_close");
    }
  }
  
  handle.addEventListener("click", drawerOpen);
  mainWrap.forEach((e) => e.addEventListener("click", drawerClose));

  /**드로어 슬라이드 이벤트*/
  document.addEventListener("DOMContentLoaded", function(){
    const slideBar = document.querySelectorAll("hr");
    var x;
    var y;
    
    //터치 시작
    slideBar.forEach((bar) => bar.addEventListener("touchstart",(event)=>{
      x = event.touches[0].pageX;
      y = event.touches[0].pageY;
      console.log("event: touchstart x: ", x, "y: ", y);
    }));

    //터치 중
    slideBar.forEach((bar) => bar.addEventListener("touchmove", function(e){
      console.log("event:touchmove Start");  
    }));

    //터치 끝난 시점
    slideBar.forEach((bar) => bar.addEventListener("touchend", function(e){
      var moveX = e.changedTouches[0].pageX;
      var moveY = e.changedTouches[0].pageY;
      if(y<moveY){
        drawer.classList.remove("drawer_open");
        drawer.classList.add("drawer_close");
      }
      console.log("event: touchend x: ", moveX, "y: ", moveY);
    }));
  });
  

  const imageUpload = document.getElementById("imageUpload");

  imageUpload.addEventListener("change", function(event) {
  const file = event.target.files[0];
  
  // 파일 처리 로직 추가
});





// const homeBar = document.querySelector(".home");
// homeBar.addEventListener("click", function() {
   
// });

// document.addEventListener('touchmove', function (event) {
//     if (event.scale !== 1) { event.preventDefault(); }
//   }, { passive: false });

//   document.documentElement.addEventListener('touchstart', function (event) {
//     if (event.touches.length > 1) {
//          event.preventDefault(); 
//        } 
// }, false);

// var lastTouchEnd = 0; 

// document.documentElement.addEventListener('touchend', function (event) {
//     var now = (new Date()).getTime();
//     if (now - lastTouchEnd <= 300) {
//          event.preventDefault(); 
//        } lastTouchEnd = now; 
// }, false);



