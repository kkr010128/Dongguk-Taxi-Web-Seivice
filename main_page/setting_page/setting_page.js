// function redirectDevInfo() {
//     window.location.href = "http://dongguk-taxi.kro.kr/dongguk_dh/main_page/setting_page/dev_info/dev_info.html";
//   }



  const handle = document.getElementById("handle");
  const drawer = document.getElementById("drawer");
  
  handle.addEventListener('click', function(){
      if (drawer.classList.contains("drawer_close")) {
          drawer.classList.remove("drawer_close");
          drawer.classList.add("drawer_open");
      }else if(drawer.classList.contains("drawer_open")){
          drawer.classList.remove("drawer_open");
          drawer.classList.add("drawer_close");
      }
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



