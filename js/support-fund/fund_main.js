// 네비게이션 아이템 선택 시 해당 아이템에 대한 내용 보여주기
let navItems = document.querySelectorAll('.fund_section>nav>ul>a');

for(let i = 0; i < navItems.length; i++) {
  navItems[i].onclick = function() {
    this.classList.add('current');

    for(let j = 0; j < navItems.length; j++) {
      if(j == i) { 
        if (i > 0) {
          navItems[(i - 1)].classList.add('before');
        }
        let str = 'items/fund_item' + i + '.html';
        $('.fund_main').load(str);
        continue;
      }
      navItems[j].classList.remove('current');
      navItems[j].classList.remove('before');
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

let item = getParameterByName('item');
if(item != "") {
  navItems[item].classList.add('current');
    for(let j = 0; j < navItems.length; j++) {
      if(j == item) { 
        if (item > 0) {
          navItems[(item - 1)].classList.add('before');
        }
        let str = 'items/fund_item' + item + '.html';
        $('.fund_main').load(str);
        continue;
      }
      navItems[j].classList.remove('current');
      navItems[j].classList.remove('before');
    }
}