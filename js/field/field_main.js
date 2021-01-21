const fieldArr = document.querySelectorAll('.nav_container>a');
//클릭된 nav item의 색상을 변경하고 해당 카테고리를 보여주는 기능
for(let i = 0; i < fieldArr.length; i++) {
  fieldArr[i].onclick = function() {
    let fieldSectionContainerArr = document.querySelectorAll('.field_section_container');
    for(let j = 0; j < fieldArr.length; j++) {
      if(i == j) {
        fieldArr[j].classList.add('current');
        fieldSectionContainerArr[j].classList.remove('hidden');
        continue;
      }
      fieldArr[j].classList.remove('current');
      fieldSectionContainerArr[j].classList.add('hidden');
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
const fieldSectionContainerArr = document.querySelectorAll('.field_section_container');
//받은 파라미터에 따라 해당되는 페이지를 보여주는 기능
for(let i = 0; i < fieldSectionContainerArr.length; i++) {
  if(page == "") {
    fieldSectionContainerArr[0].classList.remove('hidden');
    for(let j = 1; j < fieldSectionContainerArr.length; j++) {
      fieldSectionContainerArr[j].classList.add('hidden');
    }
    break;
  }
  if(fieldSectionContainerArr[i].classList.contains(page)) {
    fieldSectionContainerArr[i].classList.remove('hidden');
    fieldArr[i].classList.add('current');
    continue;
  }
  fieldSectionContainerArr[i].classList.add('hidden');
  fieldArr[i].classList.remove('current');
}