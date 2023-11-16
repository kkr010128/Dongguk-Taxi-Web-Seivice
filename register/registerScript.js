// import { timeOver, code, setCode, setTimeOver } from "./registerData";
const email_sendButton = document.getElementById("send"); 
const email_ResendButton = document.querySelector("#resend");
const register_codeButton = document.querySelector("#codeComfirm"); 
const register_comfirm= document.querySelector("#register_form");
const register_genderSelectButton= document.getElementsByName("gender");
const errorMessage = document.querySelector("#error_message");
const registerFinishButton = document.getElementById("confirm");
let code = null;
let timeOver = false;
let time_thred = null;
let gender = null;
let webMail = null;

// 이벤트
email_sendButton.addEventListener("click", function() { //이메일 전송 이벤트
    sendButtonFunction();
});  

email_ResendButton.addEventListener("click", function() { //이메일 재전송 이벤트
    sendButtonFunction();
}); 

registerFinishButton.addEventListener("click", function() { 
    window.location.href="../login/index.html";
}); 

register_codeButton.addEventListener("click", function() { //유효 코드 확인 이벤트
    const register_code = document.querySelector("#code");
    if(timeOver) {
        errorMessage.innerHTML = "인증 시간이 만료되었습니다."
        errorMessage.style.display = "flex";
        return;
    }
    if(register_code.value != code) {
        errorMessage.innerHTML = "코드가 일치하지 않습니다."
        errorMessage.style.display = "flex";
        return;
    }
    errorMessage.style.display = "none";
    registerInformationUserInterfaceActivity();
});

register_comfirm.addEventListener("submit", function(event) { //가입 완료 이벤트
    const formData = new FormData(register_comfirm);
    const userName = document.querySelector("#username");
    const password = document.querySelector("#password");
    const studentId = document.querySelector("#studentId");
    event.preventDefault();
    if(userName.value == "") {
        errorMessage.innerHTML = "이름을 입력해주세요."
        errorMessage.style.display = "flex";
        return;
    }
    else if(gender == null) {
        errorMessage.innerHTML = "성별을 선택해주세요."
        errorMessage.style.display = "flex";
        return;
    }
    else if(password.value == "") {
        errorMessage.innerHTML = "비밀번호를 입력해주세요."
        errorMessage.style.display = "flex";
        return;
    }
    else if(studentId.value == "") {
		errorMessage.innerHTML = "학번을 입력해주세요."
        errorMessage.style.display = "flex";
        return;
	}
    formData.append("gender", gender);
    formData.append("webMail", webMail);
    const payload = new URLSearchParams(formData);
    fetch('../../registerAction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: payload,
      })
      const popup = document.querySelector("#popup");
      popup.classList.add("open_popup")
})

for(let i = 0; i < register_genderSelectButton.length; i++) { //성별 선택 이벤트
    register_genderSelectButton[i].addEventListener("click", function() {
        register_genderSelectButton[i].style.border = "1px solid black";
        gender = register_genderSelectButton[i].value=="남자" ? 1 : 0;
        let otherButton = (register_genderSelectButton.length -1) - i;
        register_genderSelectButton[otherButton].style.border = "1px solid lightgray";
    });
}
// 이벤트

function inputCodeUserInterfaceActivity() { //이메일 전송 후 유효 코드 인터페이스 활성화
    const register_email = document.querySelector(".register_email");
    if(register_email.style.display == "none") {
        return;
    }
    register_email.style.display = "none";
    const register_code_wrap = document.querySelector(".register_code_wrap");
    register_code_wrap.style.display = "flex";
}

function registerInformationUserInterfaceActivity() { //유효 코드 인증 후 가입 정보 입력 인터페이스 활성화
    const register_code_wrap = document.querySelector(".register_code_wrap");
    register_code_wrap.style.display = "none";
    const form = document.getElementsByTagName("form");
    form[0].style.display = "flex";
}

function sendButtonFunction() { //전송 버튼 함수
    const email = document.querySelector("#email");
    if(!email.value.includes("@dongguk.ac.kr")) { 
        errorMessage.innerHTML = "@dongguk.ac.kr 형식으로 작성해주세요."
        return;
    }
    webMail = email.value;
    errorMessage.style.display = "none";
    let time = 180; //인증 가능한 시간
    code = randomCode();
    // setCode(randomCode()); //유효 코드를 생성하여 저장
    // sendEmail(code, emailNum + "@dongguk.ac.kr");
    inputCodeUserInterfaceActivity();
    const timer = document.querySelector(".timer");
    timer.style.display = "flex";
    email_ResendButton.style.display = "none";
    time_thred = setInterval(function () { //타이머
                
        minutes = parseInt(time / 60, 10);
        seconds = parseInt(time % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timer.innerHTML  = minutes + ":" + seconds;

        if (--time < 0) {
            timeStop();
            timer.style.display = "none";
            email_ResendButton.style.display = "inline";
        }
    }, 1000);
}

function sendEmail(msg, e) {
    var parmas = {
        message: msg,
        email: e
    }
    emailjs.send("service_btnzqmc", "template_ou4xc6d", parmas);
}

function timeStop() {
    clearInterval(time_thred);
    // setTimeOver(true);
    timeOver = true;
}

function randomCode() {
    const alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let numCount = 0;
    let code = "";
    for(let i = 0; i < 6; i++) {
        let random = null;
        let numSelection = false;
        if(numCount < 2) {
            if(6-i <= 2 - numCount) {
                numSelection = true;
            }
            else {
                if(Math.random() < 0.5){
                    numSelection = true;
                }
            }
        }
        if(numSelection) {
            random = parseInt(Math.random() * 10);
            numCount ++;
        }
        else {
            random = alpha[parseInt(Math.random() * alpha.length)];
        }
        code += random;
    }
    return code;
}
