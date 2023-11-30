// import { ArrayList } from "../util/utilities";
const sendBtn = document.querySelector("#send_message");
const previousMessage = document.querySelector("previous_message");

sendBtn.addEventListener("click", function() {
    const date = new Date();
    const dateTime = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
    const message = document.querySelector("#message");
    const formDate = new FormData();
    formDate.append("studentID", sessionStorage.key(0));
    formDate.append("password", sessionStorage.getItem(sessionStorage.key(0)));
    formDate.append("content", message.value);
    formDate.append("dateTime", dateTime);
    const payload = new URLSearchParams(formDate);
    fetch('../../DataBase/chat', {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: payload
    });
});

function createChatGUI(chatList) {
    for(let i = chatList.length - 1; i >= 0; i--) {
        chat = chatList[i];
        const divElement = document.createElement("div");
        divElement.classList.add("chat_format");
        const ulElement = document.createElement("ul");
        const liElement = document.createElement("li");

        const senderDiv = document.createElement("div");
        senderDiv.classList.add("sender");
        const span1Element = document.createElement("span");
        span1Element.innerHTML = chat.studentID + " " + chat.name;
        senderDiv.appendChild(span1Element);
        liElement.appendChild(senderDiv);

        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message");
        const span2Element = document.createElement("span");
        span2Element.innerHTML = chat.content;
        messageDiv.appendChild(span2Element);
        liElement.appendChild(messageDiv);

        const timeDiv = document.createElement("div");
        timeDiv.classList.add("time");
        const span3Element = document.createElement("span");
        span3Element.innerHTML = chat.time;
        timeDiv.appendChild(span3Element);
        liElement.appendChild(timeDiv);

        ulElement.appendChild(liElement);
        divElement.appendChild(ulElement);
        
        const chatDiv = document.querySelector(".chat");
        chatDiv.children[0].appendChild(divElement);
    }
}

function getChatLog(studentID, password) {
    let recent = null;
    setInterval(() => { //완성 이제 스크롤 올렸을 때 이전 데이터만 불러오게 만들면 됨
        const date = new Date();
        const dateTime = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
        const formDate = new FormData();
        formDate.append("studentID", studentID);
        formDate.append("password", password);
        formDate.append("dateTime", dateTime);
        const payload = new URLSearchParams(formDate);
        fetch('../DataBase/loadChat', {
            method: 'post',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: payload
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            const Json = JSON.stringify(json);
            const obj = JSON.parse(Json);
            if(recent == null) {
                recent = obj.chat_information[0];
                createChatGUI(obj.chat_information);
            }
            else {
                const chatList = [];
                const chatLog = obj.chat_information;
                if(recent.chatNumber != chatLog[0].chatNumber) {
                    for(let i = 0; i < chatLog.length; i++) {
                        if(recent.chatNumber == chatLog[i].chatNumber) {
                            break;
                        }
                        chatList.push(chatLog[i]);
                    }
                }
                if(chatList.length > 0) {
                    recent = chatList[0];
                    createChatGUI(chatList);
                }
            }
        });
    }, 500);
}

window.onload = function() {
    if(sessionStorage.key(0) == null) {
        location.href = "../index.html";
        return;
    }
    let formDate = new FormData();
    formDate.append("studentID", sessionStorage.key(0));
    formDate.append("password", sessionStorage.getItem(sessionStorage.key(0)));
    const payload = new URLSearchParams(formDate);
    fetch('../DataBase/loginCheck', {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: payload
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        const userJson = JSON.stringify(json);
        const obj = JSON.parse(userJson);
        if(obj.result == "failure") {
            location.href = "../index.html";
        }
        else {
            getChatLog(obj.result.success.studentID, obj.result.success.password);
        }
    });
}