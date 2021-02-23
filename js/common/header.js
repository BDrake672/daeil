//header 네비게이션 마우스 오버시 추가 항목 보이게
const nav_introduce = document.querySelector('.nav_introduce');
const nav_field = document.querySelector('.nav_field');
const nav_contact = document.querySelector('.nav_contact');

const nav_inroduce_item_container = document.querySelector('.nav_introduce_item_container');
const nav_field_item_container = document.querySelector('.nav_field_item_container');
const nav_support_item_container = document.querySelector('.nav_support_item_container');
//회사소개 마우스 이벤트
nav_introduce.onmouseover = function() {
  nav_inroduce_item_container.classList.remove('hide');
}
nav_introduce.onmouseout = function() {
  nav_inroduce_item_container.classList.add('hide');
}
//업무분야 마우스 이벤트
nav_field.onmouseover = function() {
  nav_field_item_container.classList.remove('hide');
}
nav_field.onmouseout = function() {
  nav_field_item_container.classList.add('hide');
}
//고객지원 마우스 이벤트
nav_contact.onmouseover = function() {
  nav_support_item_container.classList.remove('hide');
}
nav_contact.onmouseout = function() {
  nav_support_item_container.classList.add('hide');
}

//추가항목 마우스오버시 배경색 변경
const navIntroduceItem = document.querySelectorAll('.nav_introduce_item');
const navFieldItemArr = document.querySelectorAll('.nav_field_item');
const navSupportItemArr = document.querySelectorAll('.nav_support_item');
if(window.innerWidth > 1023) {
  for(let i = 0; i < navIntroduceItem.length; i++) {
    navIntroduceItem[i].onmouseover = function() {
      navIntroduceItem[i].classList.add('highlight');
    }
    navIntroduceItem[i].onmouseout = function() {
      navIntroduceItem[i].classList.remove('highlight');
    }
  }
  for(let i = 0; i < navFieldItemArr.length; i++) {
    navFieldItemArr[i].onmouseover = function() {
      navFieldItemArr[i].classList.add('highlight');
    }
    navFieldItemArr[i].onmouseout = function() {
      navFieldItemArr[i].classList.remove('highlight');
    }
  }
  for(let i = 0; i < navSupportItemArr.length; i++) {
    navSupportItemArr[i].onmouseover = function() {
      navSupportItemArr[i].classList.add('highlight');
    }
    navSupportItemArr[i].onmouseout = function() {
      navSupportItemArr[i].classList.remove('highlight');
    }
  }
}

//아이콘 클릭 시 메뉴 보이게, 다시 누르면 안보이게
const toggleBtn = document.querySelector('.header_nav_icon');
const headerNav = document.querySelector('.header_nav');

toggleBtn.addEventListener('click', function() {
  this.classList.toggle('active');
  headerNav.classList.toggle('active');
});

//TOP버튼 스크롤 있을때만 보이기
const topIcon = document.querySelector('.header_icon_top');
$(window).scroll(function(event) {
  topIcon.classList.remove('hidden');
  
  //스크롤이 최상단이라면 아이콘 숨기기
  if(window.scrollY == 0) {
    topIcon.classList.add('hidden');
  }
});