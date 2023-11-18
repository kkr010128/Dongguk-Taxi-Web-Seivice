function showLowerNav() {  
  const head = document.getElementsByTagName("head"); 
  const cssLinkElement = document.createElement("link");
  cssLinkElement.setAttribute("rel", "stylesheet");
  cssLinkElement.setAttribute("href", "./nav_neumorph.css");
  head[0].appendChild(cssLinkElement); 

  const body = document.getElementsByTagName("body"); 

  const navElement = document.createElement("nav"); 
  navElement.classList.add("nav");

  const navChildOptions = [["orange","메인"], 
                          ["red","매칭"], 
                          ["blue", "파티"], 
                          ["green", "채팅"], 
                          ["rebeccapurple", "설정"]];

  const a_href = "#"; // 필요할 때 바꾸기 나중에 navChildOption으로 각각 옵션줘도 댐
  const nav_normal = "nav-item";

  for(let i=0; i<navChildOptions.length; i++){
    const navChildSets = navChildOptions[i];
    const navChildElement = document.createElement("a");
    navChildElement.setAttribute("active-color", navChildSets[0]);
    navChildElement.setAttribute("href", a_href);
    if(i==0){
      navChildElement.classList.add(nav_normal);
      navChildElement.classList.add("is-active");
    }
    else{
      navChildElement.classList.add(nav_normal);
    }
    navChildElement.innerText = navChildSets[1];
    navElement.appendChild(navChildElement);
  }
  const navIndicatorElement = document.createElement("span");
  navIndicatorElement.setAttribute("class", "nav-indicator");
  navElement.appendChild(navIndicatorElement);
  body[0].appendChild(navElement);
}

showLowerNav();


const indicator = document.querySelector('.nav-indicator');
const items = document.querySelectorAll('.nav-item');

function handleIndicator(el) {
  items.forEach(item => {
    item.classList.remove('is-active');
    item.removeAttribute('style');
  });
  
  indicator.style.width = `${el.offsetWidth}px`;
  indicator.style.left = `${el.offsetLeft}px`;
  indicator.style.backgroundColor = el.getAttribute('active-color');

  el.classList.add('is-active');
  el.style.color = el.getAttribute('active-color');
}


items.forEach((item, index) => {
  item.addEventListener('click', (e) => { handleIndicator(e.target)});
  item.classList.contains('is-active') && handleIndicator(item);
});