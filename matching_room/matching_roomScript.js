const previousCalendar = document.querySelector(".calendar_previous");
const nextCalendar = document.querySelector(".calendar_next");
const previousRoom = document.querySelector(".matching_previous_room");
const nextRoom = document.querySelector(".matching_next_room");
let initDate = new Date();
let nowYear;
let nowMonth;
let roomList;
let roomPage = 0;

previousCalendar.addEventListener("click", function() {
    createCalendar(nowYear, nowMonth - 1);
});

nextCalendar.addEventListener("click", function() {
    createCalendar(nowYear, nowMonth + 1);
});

previousRoom.addEventListener("click", function() {
    roomPage = roomPage > 0 ? roomPage -1 : 0;
    setRoomPage();
});

nextRoom.addEventListener("click", function() {
    roomPage = roomPage < (roomList.length -1) ? roomPage + 1 : roomPage;
    setRoomPage();
});

function createCalendar(year, month) {
    let nowCalendarDate = new Date(year, month, 1);
    nowYear = nowCalendarDate.getFullYear();
    nowMonth = nowCalendarDate.getMonth();
    const calendar_now = document.querySelector(".calendar_now");
    const calendar_nowNodes = calendar_now.children;
    if(calendar_nowNodes[0] != null) {
        calendar_now.removeChild(calendar_nowNodes[0]);
    }
    const pElement = document.createElement("p");
    pElement.setAttribute("id", "yearAndMonth")
    pElement.innerHTML = nowCalendarDate.getFullYear() + "년 " + (nowCalendarDate.getMonth()+1) + "월";
    calendar_now.appendChild(pElement);

    const date_wrap = document.querySelector(".date_wrap");
    const date_wrapNodes = date_wrap.children;
    if(date_wrapNodes.length > 0) {
        const length = date_wrapNodes.length;
        for(let y = 0; y < length; y++) {
            date_wrap.removeChild(date_wrapNodes[0]);
        }
    }
    for(let i = 0; i < 6; i++) {
        const date_week = document.createElement("div"); 
        date_week.classList.add("date_week");
        for(let j = 0; j < 7; j++) {
            const dateElement = document.createElement("div"); 
            dateElement.classList.add("date");
            // const hrElement = document.createElement("hr");
            // hrElement.style.border = "solid 1px lightgray";
            const pElement = document.createElement("p");
            if(i == 0) {
                if(j < nowCalendarDate.getDay()) {
                    tmpCalendar = new Date(year, month);
                    tmpCalendar.setDate(tmpCalendar.getDate() - (nowCalendarDate.getDay() - j));
                    pElement.style.color = "lightgray";
                    pElement.innerHTML = tmpCalendar.getDate();
                }
                else {
                    nowCalendarDate.setDate(nowCalendarDate.getDate() + (j-nowCalendarDate.getDay()));
                    pElement.innerHTML = nowCalendarDate.getDate();
                    if(j == 0 || j == 6) {
                        pElement.style.color = "red";
                    }
                    else {
                        pElement.style.color = "#424242";
                    }
                }
            }
            else {
                nowCalendarDate.setDate(nowCalendarDate.getDate() + 1);
                pElement.innerHTML = nowCalendarDate.getDate();
                if(j == 0 || j == 6) {
                    pElement.style.color = "red";
                }
                else {
                    pElement.style.color = "#424242";
                }
            }
            if(nowCalendarDate.getMonth() != nowMonth) {
                pElement.style.color = "lightgray";
            }
            // dateElement.appendChild(hrElement);
            dateElement.appendChild(pElement);
            date_week.appendChild(dateElement);
        }
        date_wrap.appendChild(date_week);
    }
}

createCalendar(initDate.getFullYear(), initDate.getMonth());

const dateArray = document.getElementsByClassName("date");
for(let i = 0; i < dateArray.length; i++) {
    const tmpDate = dateArray[i];
    tmpDate.addEventListener("click", function() {
        const dateNode = tmpDate.children[0];
        let formDate = new FormData();
        formDate.append("year", nowYear);
        formDate.append("month", nowMonth + 1);
        formDate.append("date", dateNode.innerHTML);
        const payload = new URLSearchParams(formDate);
        if(dateNode.style.color != "lightgray") {
            fetch('../../../MatchingRoomList', {
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
                const roomJson = JSON.stringify(json);
                roomList = JSON.parse(roomJson).room_information;
                console.log(roomList);
                const calendarWrap = document.querySelector(".calendar_wrap");
                calendarWrap.style.display = "none";
                setRoomPage();
                const matchingRoomWrap = document.querySelector(".wrap");
                matchingRoomWrap.style.display = "flex";
            });
        }
    });
}

function setRoomPage() {
    const roomInfo = roomList[roomPage];
    const divElement = document.getElementsByClassName("matching_room_div");
    const h1Element = divElement[0].children[0];
    h1Element.innerHTML = "#" + roomInfo.number;
    const date = roomInfo.date.split("/");
    divElement[1].children[0].innerHTML = date[1] + "월" + date[2] + "일 " + roomInfo.time;
    divElement[2].children[0].innerHTML = roomInfo.from;
    divElement[4].children[0].innerHTML = roomInfo.to;
    let imgElement = divElement[5].children[0];
    imgElement.setAttribute("width", "60em");
    imgElement.setAttribute("height", "60em");
    if(roomInfo.gender == "남자") 
        imgElement.setAttribute("src", "../assets/main/room_list/gender_indicator_male.png");
    else if(roomInfo.gender == "여자") 
        imgElement.setAttribute("src", "../assets/main/room_list/gender_indicator_female.png");
    else 
        imgElement.setAttribute("src", "../assets/main/room_list/gender_no_matter_what.png");
    const peopleElement = divElement[6];
    if(peopleElement.children.length > 0) {
        const length = peopleElement.children.length;
        for(let i = 0; i < length; i++) {
            peopleElement.removeChild(peopleElement.children[0]);
        }
    }
    for(let i = 0; i < roomInfo.maximum; i++) {
        imgElement = document.createElement("img");
        imgElement.setAttribute("width", "40em");
        imgElement.setAttribute("height", "40em");
        if(i == 0) 
            imgElement.setAttribute("src", "../assets/main/room_list/person_joined.png");
        else {
            if(roomInfo.members[i - 1] != "null") 
                imgElement.setAttribute("src", "../assets/main/room_list/person_joined.png");
            else
                imgElement.setAttribute("src", "../assets/main/room_list/person_blank.png");
        }
        peopleElement.appendChild(imgElement);
    }
}