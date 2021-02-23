const table_home = db.ref('public/home');
let mainData = [];
let carouselData = [];
let sectionItemData = [];

const getData = (ref) => {
  return new Promise((resolve, reject) => {
    const onError = error => reject(error);
    const onData = snap => resolve(
      // snap.val()
      snap.forEach(ss => {
        mainData.push(ss.val());
      })
    );
    ref.on("value", onData, onError);
  });
};

getData(table_home)
  .then((value) => {
    // resolve() was called
    carouselData = mainData[0];
    sectionItemData = mainData[1];
    makeCarousel(carouselData);
    makeSection(sectionItemData);
    showAdminButton();
    // closeModalWindow();
  })
  .catch((error) => {
    // reject() was called
    // Something went wrong while fetching the data.
    // Handle that error here.
    console.log('에러발생');
    console.dir(error);
  });

// db에 입력된 carousel 데이터 처리
function makeCarousel(data) {
  // 사용하기 편하도록 배열로 변경
  let carouselArr = Object.values(data);
  let indicatorLiArr = document.querySelectorAll('.carousel-indicators>li');
  let itemContainer = document.querySelector('.carousel-inner');
  
  itemContainer.innerHTML = "";
  for(let i = 0; i < carouselArr.length; i++) {
    // 인디게이터 히든 제거
    indicatorLiArr[i].classList.remove('hidden');
    // 배열 길이만큼 아이템 만들기
    let str = 
    '<div class=carousel-item>' +
    '<img src="" alt=slide>' + 
    '<div class=carousel-caption><h3>' + carouselArr[i].title + '</h3>' + 
    '<h5>' + carouselArr[i].caption + '</h5></div></div>';
    itemContainer.innerHTML += str;
  }
  let itemArr = document.querySelectorAll('.carousel-item');
  itemArr[0].classList.add('active');

  // carousel에 이미지 주입
  let imgEleArr = document.querySelectorAll('.carousel-item>img');
  for(let i = 0; i < imgEleArr.length; i++) {
    insertImage(imgEleArr[i], carouselArr[i].img);
  }
  insertLinkEvent();
  btnCarousel();
}

// 대표이미지 수정 버튼
function btnCarousel() {
  document.getElementById('button_carousel').onclick = function() {
    location.assign('/view/admin/home/admin_carousel.html');
  };
}

// 섹션제작
function makeSection(data) {
  // 넘어온 데이터 배열로 변환
  let itemDataArr = Object.values(data);
  let container = document.querySelector('.index_section2');
  container.innerHTML = "";
  // 아이템 수 만큼 만들고 주입
  for(let i = 0; i < itemDataArr.length; i++) {
    let str = '<div class=section_item><a href=' + itemDataArr[i].href + '>' +
    '<div class=section_img><img src="" alt=' + itemDataArr[i].title + '></div>' +
    '<div class=section_text><h5>' + itemDataArr[i].title + '</h5><span>' + itemDataArr[i].caption + '</span></div>' + 
    '<div class=setction_nav_go>바로가기</div></a>' + 
    '<button class="hidden button_admin" onclick=btnSectionItem(' + (i + 1) + ')>내용수정</button></div>';

    container.innerHTML += str;
  }
  let imgEleArr = document.querySelectorAll('.section_img>img');
  for(let i = 0; i < imgEleArr.length; i++) {
    insertImage(imgEleArr[i], itemDataArr[i].img);
    if((i + 1) == imgEleArr.length) {
      closeModalWindow();
    }
  }
}

// 섹션 아이템내용 수정 버튼 기능
function btnSectionItem(itemNum) {
  let str = '/view/admin/home/admin_section.html?item=' + itemNum;
  location.assign(str);
}

// 정부지원금 관련 carousel에 추가 이벤트
function insertLinkEvent() {
  let str = '지원금';
  let carouselTitleArr = document.querySelectorAll('.carousel-caption>h3');
  for(let i = 0; i < carouselTitleArr.length; i++) {
    //carousel title 중 '지원금' 을 포함한 제목이 있는 경우 클릭 시 지원금 페이지를 여는 이벤트 추가하기
    if(carouselTitleArr[i].innerText.includes(str)) {
      let carouselDiv = carouselTitleArr[i].parentElement.parentElement;
      carouselDiv.classList.add('link_support_fund');
      carouselDiv.onclick = function() {
        window.open('/view/support-fund/');
      }
      break;
    }
  }
}