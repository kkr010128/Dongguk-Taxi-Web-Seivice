const script = document.createElement("script");
const drawer = document.getElementById("drawer");
const personCnt = document.getElementById("maxPerson");
const minusBtn = document.getElementById("minus");
const plusBtn = document.getElementById("plus");
const markers = [null, null];

/*script.src = "http://dapi.kakao.com/v2/maps/sdk.js?appkey=?appkey=7bf82169a53be4c855eca8f52959e97e&autoload=false";
script.onload = () => {
    kakao.maps.load(() => {
       console.assert(kakao.maps.Map); 
    });
};
document.head.appendChild(script);*/

/**드롭다운 리스트 이벤트 */
document.querySelectorAll("select").forEach(function(e) {
    e.addEventListener("change", function(){
        if(this.name=="start_location"){
            setMarkers(this.value, "start");
        }else if(this.name=="arrive_location"){
            setMarkers(this.value, "arrive");
        }
    });
});

/**값받기 - 선택한 값 받아서 마커 생성 TODO: 마커 두 개 올려질 시에 맵 크기 줄이며 경로 생성*/
function setMarkers(values, which){
    var marker;
    var LatLng = [];

    switch(values){
        case "entrance":
            LatLng[0]=35.8625;
            LatLng[1]=129.1945;
            break;
        case "schoolyard":
            LatLng[0] = 35.860583;
            LatLng[1] = 129.194609;
            break;
        case "dorm":
            LatLng[0]=35.863694;
            LatLng[1]=129.191178;
            break;
        case "suckjang":
            LatLng[0]=35.8625;
            LatLng[1]=129.191178;
            break;
        case "army":
            LatLng[0]=35.854379;
            LatLng[1]=129.237773;
            break;
        case "station":
            LatLng[0]=35.798296;
            LatLng[1]=129.138968;
            break;
        case "terminal":
            LatLng[0]=35.8397794;
            LatLng[1]=129.202447;
            break;
    }
    marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(LatLng[0], LatLng[1])
    });

    /**이전 마커 삭제 */
    if(which=="start" && markers[0]!=null){
        markers[0].setMap(null);
        markers[0] = marker;
    }else if(which=="arrive" && markers[1]!=null){
        markers[1].setMap(null);
        markers[1] = marker;
    }

    which=="start" ? markers[0]=marker : markers[1]=marker;
    marker.setMap(map);
    
    //선 그리기(임시) - 최단경로는 길찾기 api사용해야함.
    if(markers[0]!=null && markers[1]!=null){
        var roadLine = new kakao.maps.Polyline({
            path: [markers[0].getPosition(), markers[1].getPosition()], //경로 지정
            strokeWeight: 3,                  //선 두께
            strokeColor: "rgb(255, 155, 47)", //선 색깔
            strokeOpacity: 0.7,               //선 불투명도
            strokeStyle: "shortdashdot"       //선 종류
        })
        roadLine.setMap(map);
    }

} //setMarkers


/** 출발, 도착 위치 바꾸기 - 마커 바뀌는거까지 구현 완*/
document.getElementById("change").addEventListener("click", function(){
    let start = document.getElementById("setStart");
    let arrive = document.getElementById("setArrive");
    let temp = start.value;
    let tmpMarker;

    start.value = arrive.value;
    arrive.value = temp;
    
    tmpMarker = markers[0];
    markers[0] = markers[1];
    markers[0] = tmpMarker;
});

/**슬라이딩 드로어 이벤트
document.getElementById("handle").addEventListener("click", function(){
    if (drawer.classList.contains("drawer_open")) {
        drawer.classList.remove("drawer_open");
        drawer.classList.add("drawer_close");

    } else {
        drawer.classList.remove("drawer_close");
        drawer.classList.add("drawer_open");
    }
});*/

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
document.getElementById("cancelBtn").addEventListener('click', function(){
    drawer.classList.remove("drawer_open");
    drawer.classList.add("drawer_close");
 });

/**완료버튼 이벤트 TODO: 누를 시 매칭 + 정보를 넘겨주는 기능 추가 필요 */
document.getElementById("setBtn").addEventListener('click', function(){
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
