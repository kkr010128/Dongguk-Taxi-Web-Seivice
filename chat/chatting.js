function createChatGUI(chatList) {
    for(let i = 0; i < chatList.length; i++) {
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

function getChatID(studentID) {
    const formDate = new FormData();
    formDate.append("type", "get");
    formDate.append("studentID", studentID);
    const payload = new URLSearchParams(formDate);
    fetch('../../DataBase/chatSelect', {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: payload
    })
    .then(function(response) {
        return response.text();
    })
    .then(function(txt) {
        const num = parseInt(txt);
        getChatLog(num);
    });
}

function getChatLog(chatID) {
    const date = new Date();
    const dateTime = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
    const formDate = new FormData();
    formDate.append("chatID", chatID);
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
        createChatGUI(obj.chat_information);
    });
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
            getChatID(obj.result.success.studentID);
        }
    });
}