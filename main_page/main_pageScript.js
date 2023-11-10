/**테스트 */
const script = document.createElement('script');
const handle = document.getElementById("handle");
const drawer = document.getElementById("drawer");
const cancelBtn = document.getElementById("cancelBtn");
const setBtn = document.getElementById("setBtn");

script.src = "http://dapi.kakao.com/v2/maps/sdk.js?appkey=your_app_key&autoload=false";
script.onload = () => {
    kakao.maps.load(() => {
       console.assert(kakao.maps.Map); 
    });
};
document.head.appendChild(script);

/**슬라이딩 드로어 이벤트*/
handle.addEventListener('click', function(){
    if (drawer.classList.contains("drawer_open")) {
        drawer.classList.remove("drawer_open");
        drawer.classList.add("drawer_close");

    } else {
        drawer.classList.remove("drawer_close");
        drawer.classList.add("drawer_open");
    }
});

function changingPerson(sign){
    let personCnt = document.getElementById("maxPerson");
    let temp = 0;
    let minusBtn = document.getElementById("minus");
    let plusBtn = document.getElementById("plus");
    console.log("  ", personCnt.innerText, temp);
    if(sign=='+'){
        plusBtn.addEventListener("click", function(){
            if(parseInt(personCnt.innerText) < 4){
                minusBtn.disabled=false;
                minusBtn.style.background="rgb(255, 155, 47)";
                temp = parseInt(personCnt.innerText)+1;
                personCnt.innerText = temp;
            }else{
                plusBtn.style.background="rgb(171, 171, 171)";
                plusBtn.disabled=true;
            }
        });
    }else{
        minusBtn.addEventListener("click", function(){
            if(parseInt(personCnt.innerText) > 2){
                plusBtn.disabled=false;
                plusBtn.style.background="rgb(255, 155, 47)";
                temp = parseInt(personCnt.innerText)-1;
                personCnt.innerText = temp;
            }else{
                minusBtn.style.background="rgb(171, 171, 171)";
                minusBtn.disabled=true;
            }
        });
    }
}
/**취소 버튼 이벤트 */
 cancelBtn.addEventListener('click', function(){
    drawer.classList.remove("drawer_open");
    drawer.classList.add("drawer_close");
 });

/**완료버튼 이벤트 TODO: 누를 시 매칭 + 정보를 넘겨주는 기능 추가 필요 */
 setBtn.addEventListener('click', function(){
    window.location.href="../matching_room/matching_room.html"; //임시
 });

/*마커 테스트용
function startMarker(){
    var marker = new kakao.maps.Marker
}*/

/**지도 생성하기❤️ 
function generateMap(){
    var container = document.getElementById('map');
		var options = {
			center: new kakao.maps.LatLng(35.862192, 129.195048),
			level: 3
		};
		var map = new kakao.maps.Map(container, options);
        return map;
}*/