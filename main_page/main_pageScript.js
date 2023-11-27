const script = document.createElement("script");
const personCnt = document.getElementById("maxPerson");
const minusBtn = document.getElementById("minus");
const plusBtn = document.getElementById("plus");
const markers = [null, null]; //중요
const PolyLine = [null]; //중요

/*script.src = "http://dapi.kakao.com/v2/maps/sdk.js?appkey=?appkey=7bf82169a53be4c855eca8f52959e97e&libraries=services,clusterer,drawing?autoload=false";
script.onload = () => {
    kakao.maps.load(() => {
        console.assert(kakao.maps.Map); 
    });
};
document.body.appendChild(script);*/

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

/**값받기 - 선택한 값 받아서 마커 생성  TODO: 마커 이미지 출/도착 필요 ❤️❤️*/
function setMarkers(values, which){

    var marker;
    var LatLng = [];
    const vertexArr = []; //중요한 놈임

    PolyLine[0]!=null ? PolyLine[0].setMap(null) : null;

    switch(values){
        case "entrance":
            LatLng[0]=35.8625;
            LatLng[1]=129.1945;
            break;
        case "schoolyard":
            LatLng[0] = 35.860479;
            LatLng[1] = 129.194337;
            break;
        case "dorm":
            LatLng[0]=35.863694;
            LatLng[1]=129.191178;
            break;
        case "suckjang":
            LatLng[0]=35.8625;
            LatLng[1]=129.191178;
            break;
        case "yeonhop":
            LatLng[0]=35.842033;
            LatLng[1]=129.182027;
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

    //이전 마커 지우기
    if(which=="start" && markers[0]!=null){
        markers[0].setMap(null);
        markers[0] = marker;
    }else if(which=="arrive" && markers[1]!=null){
        markers[1].setMap(null);
        markers[1] = marker;
    }

    which=="start" ? markers[0]=marker : markers[1]=marker;
    marker.setMap(map);

    //지도 중심 이동하기, 경로 생성
    if(markers[0]==null || markers[1]==null){
        map.panTo(new kakao.maps.LatLng(LatLng[0], LatLng[1]));
    }else if(markers[0]!=null && markers[1]!=null) { 

        map.setBounds(new kakao.maps.LatLngBounds(markers[0].getPosition(), markers[1].getPosition()));
        if(vertexArr.length!=0)
            vertexArr.length=0;
        
        //console.log(vertexArr.length);
        var start_x = markers[0].getPosition().getLng();
        var start_y = markers[0].getPosition().getLat();
        var arrive_x = markers[1].getPosition().getLng();
        var arrive_y = markers[1].getPosition().getLat();

        var routeUrl = `https://apis-navi.kakaomobility.com/v1/directions?priority=RECOMMEND&car_type=1&car_fuel=GASOLINE&origin=${start_x},${start_y}&destination=${arrive_x},${arrive_y}`;

        let header = {
            method: "GET",
            headers: {
                Authorization: "KakaoAK a6f9e20a12bfdba4e1ef0fc22d616bcc"
            },
        };
        //Ajax 호출
        fetch(routeUrl, header)
        .then((response) => {
            if (!response.ok) {
                throw new Error("error");
            }
            return response.json();
        })
        .then((data)=> {
            //console.log(data.routes[0].sections[0].roads);
            
            //겁나 중요한 샛기
            var createRoute = data.routes[0].sections[0].roads.forEach(marker => {
                marker.vertexes.forEach((vertex, num)=>{
                    if(num%2==0){
                        vertexArr.push(new kakao.maps.LatLng(marker.vertexes[num+1], marker.vertexes[num]));
                    }
                });
            })
            var roadLine = new kakao.maps.Polyline({
                path: vertexArr,
                strokeWeight: 3,                  
                strokeColor: "red", 
                strokeOpacity: 0.7,               
                strokeStyle: "shortdashdot"       
            });
            PolyLine[0] = roadLine;
            roadLine.setMap(map);

        })
    }
}

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
    markers[1] = tmpMarker;
});


/**사람 수 조정 +, - 버튼 */
plusBtn.addEventListener("click", function(){
    let temp=0;
    if(parseInt(personCnt.innerText) < 4){
        minusBtn.disabled=false;
        minusBtn.style.borderColor="rgb(255, 194, 85)";
        temp = parseInt(personCnt.innerText)+1;
        personCnt.innerText = temp;
        if(personCnt.innerText==4){
            plusBtn.style.borderColor="#ffffff";
            plusBtn.disabled=true;
        }
    }
});

minusBtn.addEventListener("click", function(){
    let temp=0;
    if(parseInt(personCnt.innerText) > 2){
        plusBtn.disabled=false;
        plusBtn.style.borderColor="rgb(255, 194, 85)";
        temp = parseInt(personCnt.innerText)-1;
        personCnt.innerText = temp;
    if(personCnt.innerText==2){
        minusBtn.style.borderColor="#ffffff";
        minusBtn.disabled=true;
        }
    }
});

/**취소 버튼 이벤트 */
document.getElementById("cancelBtn").addEventListener('click', function(){
    window.location.reload();
});
   
/**완료버튼 이벤트 TODO: 누를 시 매칭 + 정보를 넘겨주는 기능 추가 필요 */
document.getElementById("setBtn").addEventListener('click', function(){
    var serverUrl = "http://택시.com/main_page/main_page.html"; //"http://dongguk-taxi.kro.kr";
    
    var formdata = new FormData();
    formdata.append("equal_sex",);
    var swi = document.getElementById("switch1");
    console.log(swi.Check);
    var options = {
        method: "POST",
        body: formdata
    };
    fetch(serverUrl, options)
    .then(response => response.json())
    .then(data=>{
        console.log(data);
    })

    //window.location.href="../matching_room/matching_room.html"; //임시
});
   
/**지도 생성하기❤️ 
function generateMap(){
    var container = document.getElementById('map'),
    options = {
		center: new kakao.maps.LatLng(35.862192, 129.195048),
		level: 3
	};
	var map = new kakao.maps.Map(container, options);

    var roadLine = new kakao.maps.Polyline({
        strokeWeight: 5,                  //선 두께
        strokeColor: "rgb(255, 155, 47)", //선 색깔
        strokeOpacity: 0.7,               //선 불투명도
        strokeStyle: "shortdashdot"       //선 종류
    });

    return map;
}*/