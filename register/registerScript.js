const email_sendButton = document.getElementById("send"); 
let code = null;
let time_thred;
let timeOver = false;

email_sendButton.addEventListener("click", function() {
    const email = document.querySelector("#email");
    if(email.value == "") { 
        return;
    }
    email.style.display = "none";
    email_sendButton.style.display = "none";
    let time = 120;
    code = randomCode();
    const register_num = document.querySelector(".register_num input");
    const timer = document.querySelector(".timer");
    const register_numSubmit = document.querySelector("#numComfirm");
    // const register_pw = document.querySelector(".register_pw input");
    register_num.style.display = "flex";
    timer.style.display = "flex";
    register_numSubmit.style.display ="flex";
    // register_pw.style.display = "flex";
    time_thred = setInterval(function () {
                
        minutes = parseInt(time / 60, 10);
        seconds = parseInt(time % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timer.innerHTML  = minutes + ":" + seconds;

        if (--time < 0) {
            timeStop();
            timer.textContent = "시간초과"
        }
    }, 1000);
});

function timeStop() {
    clearInterval(time_thred);
    timeOver = true;
}

function randomCode() {
    const alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let code = "";
    for(let i = 0; i < 3; i++) {
        let random = parseInt(Math.random() * alpha.length);
        code += alpha[random];
    }
    return code;
}
