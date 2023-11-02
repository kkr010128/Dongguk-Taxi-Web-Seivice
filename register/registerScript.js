const email_sendButton = document.getElementById("send"); 
const register_codeSubmit = document.querySelector("#codeComfirm"); 
let code = null;
let time_thred;
let timeOver = false;

email_sendButton.addEventListener("click", function() {
    const email = document.querySelector("#email");
    let emailNum = parseInt(email.value);
    if(!Number.isInteger(emailNum)) { 
        return;
    }
    email.style.display = "none";
    email_sendButton.style.display = "none";
    let time = 120;
    code = randomCode();
    // sendEmail(code, email + "@dongguk.ac.kr");
    const register_code = document.querySelector(".register_code input");
    const timer = document.querySelector(".timer");
    register_code.style.display = "flex";
    timer.style.display = "flex";
    register_codeSubmit.style.display = "inline";
    time_thred = setInterval(function () {
                
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

register_codeSubmit.addEventListener("click", function() {
    const register_code = document.querySelector("#code");
    if(timeOver) {
        return;
    }
    if(register_code != code) {
        return;
    }
    const register_pw = document.querySelector("#password");
    register_pw.style.display = "flex";
});

function sendEmail(msg, e) {
    var parmas = {
        message: msg,
        email: e
    }
    emailjs.send("service_btnzqmc", "template_ou4xc6d", parmas);
}

function timeStop() {
    clearInterval(time_thred);
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
