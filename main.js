const LoginBtn = document.getElementsById('LoginBtn');

/**로그인 누를 시 두근두근 분기점  TODO:로그인 데이터 DB에서 체크해서 적용하기 */
LoginBtn.addEventListener('click', function(){
    const getId = document.getElementById('email');
    const getPw = document.getElementById('password');
    console.log(getId);
    //window.location.href = './main_page.html';
});


/**회원가입 페이지로 이동시키는 함수*/
function gotoSignUp(){
    window.location.href="register.html"
}
function checkEmail() {
    var emailInput = document.querySelector('input[type="email"]');
    var tooltip = document.getElementById('tooltip');
    var pattern = /^[a-zA-Z0-9._%+-]+@dongguk\.edu$/;

    if (!pattern.test(emailInput.value)) {
        tooltip.style.visibility = "visible";
    } else {
        tooltip.style.visibility = "hidden";
    }
}

document.addEventListener("click",function(e){
    var tooltip = document.getElementById('tooltip');
    var emailInput = document.querySelector('input[type="email"]');
    if (e.target !== emailInput) {
        tooltip.style.visibility = "hidden";
    }
});
    window.location.href="./register/register.html"
}
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
console.log(isMobile);
