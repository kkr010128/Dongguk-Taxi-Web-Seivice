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


    
