const navArr = document.querySelectorAll('.nav_container>a');
//클릭된 nav item의 색상을 변경하고 해당 카테고리를 보여주는 기능
for(let i = 0; i < navArr.length; i++) {
  navArr[i].onclick = function() {
    let introduceSectionContainerArr = document.querySelectorAll('.introduce_section_container');
    for(let j = 0; j < navArr.length; j++) {
      if(i == j) {
        navArr[j].classList.add('current');
        introduceSectionContainerArr[j].classList.remove('hidden');
        continue;
      }
      navArr[j].classList.remove('current');
      introduceSectionContainerArr[j].classList.add('hidden');
    }
  }
}

//페이지 파라미터로 들어온 이름을 알아내는 기능
function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

let page = getParameterByName('page');
const introduceSectionContainerArr = document.querySelectorAll('.introduce_section_container');
//받은 파라미터에 따라 해당되는 페이지를 보여주는 기능
for(let i = 0; i < introduceSectionContainerArr.length; i++) {
  if(page == "") {
    introduceSectionContainerArr[0].classList.remove('hidden');
    for(let j = 1; j < introduceSectionContainerArr.length; j++) {
      introduceSectionContainerArr[j].classList.add('hidden');
    }
    break;
  }
  if(introduceSectionContainerArr[i].classList.contains(page)) {
    introduceSectionContainerArr[i].classList.remove('hidden');
    navArr[i].classList.add('current');
    continue;
  }
  introduceSectionContainerArr[i].classList.add('hidden');
  navArr[i].classList.remove('current');
}