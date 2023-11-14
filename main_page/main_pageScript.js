const script = document.createElement('script');
const handle = document.getElementById("handle");
const drawer = document.getElementById("drawer");
const personCnt = document.getElementById("maxPerson");
const minusBtn = document.getElementById("minus");
const plusBtn = document.getElementById("plus");
const cancelBtn = document.getElementById("cancelBtn");
const setBtn = document.getElementById("setBtn");
const changeBtn = document.getElementById("change");

script.src = "http://dapi.kakao.com/v2/maps/sdk.js?appkey=?appkey=7bf82169a53be4c855eca8f52959e97e&autoload=false";
script.onload = () => {
    kakao.maps.load(() => {
       console.assert(kakao.maps.Map); 
    });
};
document.head.appendChild(script);

/*
    var markerPosition = new kakao.maps.LatLng(Lat, Lng);
    var marker = new kakao.maps.Marker({
        position: markerPosition
    });
    marker.setMap(map);*/

/**값받기 TODO: 위도 경도 받아서 마커 생성 혹은 삭제하기*/
document.querySelector("select").addEventListener("change", function(){
    let temp = setLocations(setStart.value);
    /**파라미터로 받은 위도 경도 값으로 마커확인하고  */
    var marker;
    var LatLng;
    /**마커 삭제  - 작동안함..*/
    if(marker){
        marker.setMap(null);
    }

    marker= new kakao.maps.Marker({
        position: new kakao.maps.LatLng(temp[0], temp[1])
    });

    switch(setStart.value){
        case "entrance":
            LatLng = setLocations("entrance");
            break;
        case "schoolyard":
            LatLng = setLocations("schoolyard");
            break;
        case "dorm":
            LatLng = setLocations("dorm");
            break;
        case "suckjang":
            LatLng = setLocations("suckjang");
            break;
        case "army":
            LatLng = setLocations("army");
            break;
        case "station":
            LatLng = setLocations("station");
            break;
        case "terminal":
            LatLng = setLocations("terminal");
            break;
    }
    var marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(LatLng[0], LatLng[1])
    });
    //console.log(Lat, " ", Lng);
    marker.setMap(map);
});

/**위도 경도 반환 함수 */
function setLocations(value){
    let Lat = 0.0;
    let Lng = 0.0;

    switch(value){
        case "entrance":
            Lat = 35.8625;
            Lng = 129.1945;
            break;
        case "schoolyard":
            Lat = 35.860583;
            Lng = 129.194609;
            break;
        case "dorm":
            Lat = 35.8625;
            Lng = 129.191178;
            break;
        case "suckjang":
            Lat = 35.863694;
            Lng = 129.191178;
            break;
        case "army":
            Lat = 35.854379;
            Lng = 129.237773;
            break;
        case "station":
            Lat = 35.798296;
            Lng = 129.138968;
            break;
        case "terminal":
            Lat = 35.8397794; 
            Lng = 129.202447;
            break;
    }
    return [Lat, Lng];
}

/** 출발, 도착 위치 바꾸기 - 완 : 나중에 마커 바뀌는거도 구현해야댐 */
changeBtn.addEventListener("click", function(){
    let start = document.getElementById("setStart");
    let arrive = document.getElementById("setArrive");
    let temp = start.value;
    start.value = arrive.value;
    arrive.value = temp;
});

/**슬라이딩 드로어 이벤트*/
handle.addEventListener("click", function(){
    if (drawer.classList.contains("drawer_open")) {
        drawer.classList.remove("drawer_open");
        drawer.classList.add("drawer_close");

    } else {
        drawer.classList.remove("drawer_close");
        drawer.classList.add("drawer_open");
    }
});

/**사람 수 조정 +, - 버튼 */
plusBtn.addEventListener("click", function(){
    let temp=0;
    if(parseInt(personCnt.innerText) < 4){
        minusBtn.disabled=false;
        minusBtn.style.background="rgb(255, 155, 47)";
        temp = parseInt(personCnt.innerText)+1;
        personCnt.innerText = temp;
        if(personCnt.innerText==4){
            plusBtn.style.background="rgb(171, 171, 171)";
            plusBtn.disabled=true;
        }
    }
});

minusBtn.addEventListener("click", function(){
    let temp=0;
    if(parseInt(personCnt.innerText) > 2){
        plusBtn.disabled=false;
        plusBtn.style.background="rgb(255, 155, 47)";
        temp = parseInt(personCnt.innerText)-1;
        personCnt.innerText = temp;
        if(personCnt.innerText==2){
            minusBtn.style.background="rgb(171, 171, 171)";
            minusBtn.disabled=true;
        }
    }
});

/**취소 버튼 이벤트 */
 cancelBtn.addEventListener('click', function(){
    drawer.classList.remove("drawer_open");
    drawer.classList.add("drawer_close");
 });

/**완료버튼 이벤트 TODO: 누를 시 매칭 + 정보를 넘겨주는 기능 추가 필요 */
 setBtn.addEventListener('click', function(){
    window.location.href="../matching_room/matching_room.html"; //임시
 });


/**지도 생성하기❤️ 
export function generateMap(){
    var container = document.getElementById('map');
		var options = {
			center: new kakao.maps.LatLng(35.862192, 129.195048),
			level: 3
		};
		var map = new kakao.maps.Map(container, options);
}*/

/*var markerPosition  = new kakao.maps.LatLng(35.8625, 129.1945); 
// 마커를 생성합니다
var marker = new kakao.maps.Marker({
    position: markerPosition
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);*/