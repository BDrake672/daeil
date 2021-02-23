//페이지 파라미터로 들어온 이름을 알아내는 기능
function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

let parameter = getParameterByName('item');
const table_section = db.ref('public/home/section_items');
let itemArr = [];

//로그인 세션이 없으면 홈페이지로 보내기
auth.onAuthStateChanged(function (user) {
  if(user == null) {
    alert('로그인 후 이용하세요.');
    location.assign('/');
  }
});

// db조회함
const getData = (ref) => {
  return new Promise((resolve, reject) => {
    const onError = error => reject(error);
    const onData = snap => resolve(
      // snap.val()
      snap.forEach(ss => {
        itemArr.push(ss.val());
      })
    );
    ref.on("value", onData, onError);
  });
};

getData(table_section)
.then((value) => {
  // resolve() was called
  insertValues(itemArr[(Number(parameter) - 1)]);
  closeModalWindow();
})
.catch((error) => {
  // reject() was called
  // Something went wrong while fetching the data.
  // Handle that error here.
  console.log('에러발생');
  console.dir(error);
});

// form안에 해당되는 내용을 체워넣는 기능
function insertValues(obj) {
  let title = document.getElementById('title');
  let caption = document.getElementById('caption');
  let img = document.getElementById('img');
  let preview = document.querySelector('.preview');
  img.classList.add(obj.img)

  title.value = obj.title;
  caption.value = obj.caption;
  insertImage(preview, obj.img);

  img.onchange = function() {
    previewImage(img);
    uploadFile(img);
  }

  document.getElementById('button_submit_section_item').onclick = function() {
    btnSubmitSectionItem(obj);
  }
}

//제출 버튼 기능
function btnSubmitSectionItem(obj) {
  // 정보 객체화
  let item = {
    href: obj.href,
    img: obj.img,
    path_name: obj.path_name,
    title: document.getElementById('title').value,
    caption: document.getElementById('caption').value
  };

  // db에 전송
  let path = 'public/home/section_items/' + obj.path_name;
  db.ref(path).set(item);
  alert('완료');
  location.assign('/');
}