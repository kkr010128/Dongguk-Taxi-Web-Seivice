/**테스트 */
const script = document.createElement('script');
const handle = document.getElementById("handle");
const drawer = document.getElementById("drawer");
const okBtn = document.getElementById("setBtn");

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

/**완료버튼 이벤트 TODO: 누를 시 매칭 + 정보를 넘겨주는 기능 추가 필요 */
 okBtn.addEventListener('click', function(){
    drawer.classList.remove("drawer_open");
    drawer.classList.add("drawer_close");
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