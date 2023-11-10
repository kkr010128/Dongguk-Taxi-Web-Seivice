const LoginBtn = document.getElementById("loginBtn");

/**html 로드 시 쿠키 남아있으면 자동 로그인 이벤트 - 미구현 */
document.addEventListener("DOMContentLoaded", function(){

});

/**로그인 누를 시  */
LoginBtn.addEventListener("click", function(){
    var getEmail = document.getElementById("email");
    var getPw = document.getElementById("password");

    //TODO:로그인 데이터 DB에서 체크해서 적용하기
    if(getEmail.value==getPw.value){ //임시
        if(isChecked()){
            //console.log(isChecked()); 확인용
            setCookie(getEmail.value, getPw.value, 1);
            window.location.href = "http://127.0.0.1:5500/../main_page/main_page.html"; //임시
        } 
    }else{ //안 맞으면 경고창 띄우고 새로고침
        alert("이메일 혹은 비밀번호를 다시 확인하세요");
        location.replace(location.href); 
    }

});

/**회원가입 페이지로 이동시키는 함수*/
function gotoSignUp(){
    window.location.href="./register/register.html";
}

/**입력값 이메일인지 체크해서 툴팁 띄우기*/
function checkEmail() {
    var emailInput = document.querySelector('input[type="email"]');
    var tooltip = document.getElementById('tooltip');
    var pattern = /^[a-zA-Z0-9._%+-]+@dongguk\.ac.kr$/;

    if (!pattern.test(emailInput.value)) { //이메일 패턴 일치하지 않을 때

        LoginBtn.disabled = true;
        tooltip.style.display = "inline"; //툴팁 보이기
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
        tooltip.style.display = "none"; // 툴팁 숨기기
    }
}

/**체크박스 체크 시 TODO: 로그인 정보 저장 어떻게 할 건지 구현*/
function isChecked(){ 
    var checkBox = document.getElementById("checkBox");
    var checker = false;
    if(checkBox.checked){
        checker = true;
    }
    /*checkBox.addEventListener("change", function(){
        if(this.checked) {
            checker = true;
        }else{
            checker = false;
        }
    });*/
    return checker;
}


/**쿠키값을 세팅*/
function setCookie (cookieName, cookieValue, expiresHour) {
    const expired = new Date();
    expired.setTime(expired.getTime() + expiresHour * 24 * 60 * 60 * 1000); 
    document.cookie = `${cookieName}=${cookieValue}; path=/; Expires=${expired};`;
}

/**쿠키 조회 */
function getCookie (cookieName){
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
    
    /*let result = '';
    //1. 쿠키 가져와서 분리
    document.cookie.split(';').map((item) => {
        // 2. 분리한 값의 앞뒤 공백 제거
        const cookieItem = item.trim();
        // 3. 키 값과 매칭이 되는 값을 반환
        if(item.includes(cookieName)) {
            result = cookieItem.split('=')[1]; 
        }
    });
    return result;*/
}

/**쿠키 삭제 - 로그아웃 시*/
function deleteCookie (cookieName) {
    document.cookie = `${cookieName}=0; max-age=0;`;
};
