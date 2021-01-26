const table_home = db.ref('home');
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
    closeModalWindow();
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
    '<img src=' + carouselArr[i].img + ' alt=slide>' + 
    '<div class=carousel-caption><h3>' + carouselArr[i].title + '</h3>' + 
    '<h5>' + carouselArr[i].caption + '</h5></div></div>';
    itemContainer.innerHTML += str;   
  }
  let itemArr = document.querySelectorAll('.carousel-item');
  itemArr[0].classList.add('active');
}