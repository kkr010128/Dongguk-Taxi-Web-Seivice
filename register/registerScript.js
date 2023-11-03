// import { timeOver, code, setCode, setTimeOver } from "./registerData";
const email_sendButton = document.getElementById("send"); 
const register_codeButton = document.querySelector("#codeComfirm"); 
const register_comfirmButton= document.querySelector("#registerComfirm");
let code = null;
let timeOver = false;
let time_thred = null;

// 이벤트
email_sendButton.addEventListener("click", function() { //이메일 전송 버튼 이벤트
    const email = document.querySelector("#email");
    let emailNum = parseInt(email.value);
    if(!Number.isInteger(emailNum)) { //입력 값이 정수인지 여부
        return;
    }
    let time = 120; //인증 가능한 시간
    code = randomCode();
    // setCode(randomCode()); //유효 코드를 생성하여 저장
    // sendEmail(code, emailNum + "@dongguk.ac.kr");
    inputCodeUserInterfaceActivity();
    const timer = document.querySelector(".timer");
    time_thred = setInterval(function () { //타이머
                
        minutes = parseInt(time / 60, 10);
        seconds = parseInt(time % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timer.innerHTML  = minutes + ":" + seconds;

        if (--time < 0) {
            timeStop();
            timer.textContent = "인증만료"
        }
    }, 1000);
});

register_codeButton.addEventListener("click", function() {
    const register_code = document.querySelector("#code");
    if(timeOver) {
        return;
    }
    if(register_code.value != code) {
        return;
    }
    registerInformationUserInterfaceActivity();
});

// 이벤트

function inputCodeUserInterfaceActivity() {
    const register_email = document.querySelector(".register_email");
    register_email.style.display = "none";
    const register_codeInput = document.querySelector(".register_code");
    register_codeInput.style.display = "flex";
    const submitDiv = document.querySelector(".submit");
    submitDiv.style.display = "flex";
    register_codeButton.style.display = "inline";
}

function registerInformationUserInterfaceActivity() {
    const register_codeInput = document.querySelector(".register_code");
    register_codeInput.style.display = "none";
    register_codeButton.style.display = "none";
    register_comfirmButton.style.display = "inline";
    const register_pw = document.querySelector(".register_pw");
    register_pw.style.display = "flex";
    const register_gender = document.querySelector(".register_gender");
    register_gender.style.display = "flex";
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
    let code = "";
    for(let i = 0; i < 4; i++) {
        let random = parseInt(Math.random() * alpha.length);
        code += alpha[random];
    }
    return code;
}
