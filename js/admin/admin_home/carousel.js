const table_carousel = db.ref('public/home/carousel');
let carouselData = [];

const getData = (ref) => {
  return new Promise((resolve, reject) => {
    const onError = error => reject(error);
    const onData = snap => resolve(
      // snap.val()
      snap.forEach(ss => {
        carouselData.push(ss.val());
      })
    );
    ref.on("value", onData, onError);
  });
};

getData(table_carousel)
  .then((value) => {
    // resolve() was called
    makeCarouselForm(carouselData, carouselData.length);
    insertFunction(carouselData);
    showAdminButton();
  })
  .catch((error) => {
    // reject() was called
    // Something went wrong while fetching the data.
    // Handle that error here.
    console.log('에러발생');
    console.dir(error);
  });

// select의 값이 바뀌면 form을 추가하는 함수
function insertFunction(arr) {
  let select = document.getElementById('select_carousel');
  select.onchange = function() {
    makeCarouselForm(arr, this.value); };

  let selectOptions = document.querySelectorAll('#select_carousel>option');
  for(let i = 0; i < selectOptions.length; i++) {
    if(selectOptions[i].value == arr.length) {
      selectOptions[i].selected = true;
    }
  }

  let btnSubmit = document.getElementById('button_carousel_submit');
  btnSubmit.onclick = writeCarouselDB;
}

// select의 값이 변하면 실행될 함수. container 안을 채운다
function makeCarouselForm(arr, length) {
  let container = document.querySelector('.carousel_container');

  container.innerHTML = "";
  for(let i = 0; i < length; i++) {
    let str = 
    '<div class=carousel_item' + (i + 1) + '>' +
    '<div class=carousel_item' + (i + 1) + '_img><label for="carousel_item' + (i + 1) + '_img">이미지' + (i + 1) + '</label>' +
    '<input type="file" id="carousel_item' + (i + 1) + '_img" accept=".jpg" onchange="previewImage(this); uploadFile(this)" class=/images/index/slide'+ (i+1) + '.jpg>' +
    '<img src="" class="carousel_item_img_preview" alt=이미지' + (i + 1) + ' style="width:150px; height:100px"></div>' +
    '<div><laber for=carousel_item' + (i + 1) + '_title>이미지' + (i + 1) +'의 타이틀</label>' +
    '<input type="text" id="carousel_item' + (i + 1) + '_title" class="carousel_title" required>' +
    '</div><div><label for="carousel_item' + (i + 1) + '_caption">이미지' + (i + 1) + '의 내용</label>' +
    '<textarea id="carousel_item' + (i + 1) + '_caption" cols="30" rows="5" required class="carousel_caption"></textarea></div></div>';
    container.innerHTML += str;
  }

  insertDBData(arr, length);
}

// 만들어진 form 안에 db에서 읽어온 데이터를 집어넣는 기능
function insertDBData(arr, length) {
  let inputTitles = document.querySelectorAll('.carousel_title');
  let inputCaptions = document.querySelectorAll('.carousel_caption');
  let imgPreview = document.querySelectorAll('.carousel_item_img_preview');
  for(let i = 0; i < length; i++) {
    if(arr[i] != null) {
      inputTitles[i].value = arr[i].title;
      inputCaptions[i].value = arr[i].caption;
      insertImage(imgPreview[i], arr[i].img);
      if((i + 1) == length) {
        closeModalWindow();
      }
    }
  }
}

// submit 기능
function writeCarouselDB() {
  let length = document.getElementById('select_carousel').value;
  let titleInputArr = document.querySelectorAll('.carousel_title');
  let captionInputArr = document.querySelectorAll('.carousel_caption');

  if(length == 0) {
    alert('이미지는 1개 이상 있어야 합니다.');
    return;
  }
  // 빈 값 체크
  for(let i = 0; i < length; i++) {
    let titleStr = titleInputArr[i].value.replace(" ", "");
    let catpionStr = captionInputArr[i].value.replace(" ", "");
    if(titleStr == null || titleStr == "" || catpionStr == null || catpionStr == "") {
      alert('빈 값을 입력할 수 없습니다.');
      return;
    }
  }

  // 데이터 객체화
  let carouselObj = {};
  for(let i = 0; i < length; i++) {
    let obj = {};
    obj['title'] = titleInputArr[i].value;
    obj['caption'] = captionInputArr[i].value;
    obj['img'] = '/images/index/slide' + (i + 1) + '.jpg';
    let objName = 'carousel' + (i + 1);
    carouselObj[objName] = obj;
  }

  // db에 carousel 데이터 삭제 후 입력
  db.ref(table_carousel).remove();
  db.ref(table_carousel).set(carouselObj);

  alert('완료');
  location.assign('/');
}