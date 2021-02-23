// nav 아이템 선택시 해당 컨텐츠 보여주기
var fundNav = document.querySelectorAll('.fund_nav>ul>a');
var fundContents = document.querySelectorAll('.fund_contents');

for(let i = 0; i < fundNav.length; i++) {
  fundNav[i].onclick = function() {
    for(let j = 0; j < fundNav.length; j++) {
      if(i == j) {
        fundNav[i].classList.add('current');
        fundContents[i].classList.remove('hidden');
        continue;
      }
      fundNav[j].classList.remove('current');
      fundContents[j].classList.add('hidden');
    }
  }
}