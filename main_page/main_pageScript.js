var handle = document.getElementById("handle");
var drawer = document.getElementById("drawer");
/**슬라이딩 드로어 이벤트 - 구현 중 */
handle.addEventListener('click', function(){
    if (drawer.classList.contains("drawer_open")) {
        drawer.classList.remove("drawer_open");
        drawer.classList.add("drawer_close");

    } else {
        drawer.classList.remove("drawer_close");
        drawer.classList.add("drawer_open");
    }
})