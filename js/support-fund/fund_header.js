//TOP버튼 스크롤 있을때만 보이기
const topIcon = document.querySelector('.header_icon_top');
$(window).scroll(function(event) {
  topIcon.classList.remove('hidden');
  
  //스크롤이 최상단이라면 아이콘 숨기기
  if(window.scrollY == 0) {
    topIcon.classList.add('hidden');
  }
});