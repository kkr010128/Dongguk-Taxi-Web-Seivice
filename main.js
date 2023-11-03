const LoginBtn = document.getElementById("loginBtn");

/**로그인 누를 시  */
LoginBtn.addEventListener("click", function(){
    var getEmail = document.getElementById("email");
    var getPw = document.getElementById("password");

    //TODO:로그인 데이터 DB에서 체크해서 적용하기
    if(getEmail.value==getPw.value){ 
        
        //window.location.href = "127.0.0.1:5500"; //임시
    }else{ //안 맞으면 경고창 띄우고 새로고침
        alert("이메일 혹은 비밀번호를 다시 확인하세요");
        location.replace(location.href); 
    }
    //console.log(getEmail.value);
});

/**회원가입 페이지로 이동시키는 함수*/
function gotoSignUp(){
    window.location.href="./register/register.html";
}

/**입력값 이메일인지 체크해서 툴팁 띄우기*/
function checkEmail() {
    var emailInput = document.querySelector('input[type="email"]');
    var tooltip = document.getElementById('tooltip');
    var pattern = /^[a-zA-Z0-9._%+-]+@dongguk\.edu$/;

    if (!pattern.test(emailInput.value)) { //이메일 패턴 일치하지 않을 때

        LoginBtn.disabled = true;
        tooltip.style.visibility = "visible"; //툴팁 보이기
        LoginBtn.style.cursor = "default";//입력 안됬을 때는 못 누르게
        LoginBtn.style.background = "#d3d3d3"; //배경
        LoginBtn.style.color = "white"; //글자

    } else { //이메일 형식이 일치할 때만 로그인버튼 활성화

        LoginBtn.style.color= "white"; // 글자색
        var lcolor = "rgb(194, 68, 46)"; // 버튼 좌측 색깔
        var rcolor = "rgb(255, 155, 47)"; // 버튼 우측 색깔

        LoginBtn.style.cursor = "pointer"; //커서 변환
        LoginBtn.style.background = `linear-gradient(to left, ${lcolor}, ${rcolor})`;
        LoginBtn.disabled = false; //버튼 클릭 불가 해제
        tooltip.style.visibility = "hidden"; // 툴팁 숨기기
    }
}


/**체크박스 체크 시 TODO: 로그인 정보 저장 어떻게 할 건지 구현*/
function isChecked(){ 
    var getEmail = document.getElementById("email");
    var getPw = document.getElementById("password");
    var checkBox = document.getElementById("checkBox");

    checkBox.addEventListener("change", function(){
        console.log("ㅎㅇㅇㅎㅇㅎㅇ");
    });
    
}

/**쿠키값을 세팅*/
const setCookie = (cookieName, cookieValue, expiresHour) => {
    const expired = new Date();
    expired.setTime(expired.getTime() + expiresHour * 24 * 60 * 60 * 1000);
    document.cookie = `${cookieName}=${cookieValue}; path=/; Expires=${expired};`;
}

/**쿠키 조회 */
const getCookie = (cookieName) => {
    let result = '';
    //1. 쿠키 가져와서 분리
    document.cookie.split(';').map((item) => {
        // 2. 분리한 값의 앞뒤 공백 제거
        const cookieItem = item.trim();
        // 3. 키 값과 매칭이 되는 값을 반환
        if(item.includes(cookieName)) {
            result = cookieItem.split('=')[1];
        }
    });
    return result;
}

/**쿠키 삭제 */
const deleteCookie = (cookieName) => {
    document.cookie = `${cookieName}=0; max-age=0;`;
};

/*document.addEventListener("click",function(e){
    var tooltip = document.getElementById('tooltip');
    var emailInput = document.querySelector('input[type="email"]');
    if (e.target !== emailInput) {
        tooltip.style.visibility = "hidden";
    }
});
    window.location.href="./register/register.html"
}
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
console.log(isMobile);*/
