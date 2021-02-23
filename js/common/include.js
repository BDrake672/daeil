// setTimeout(function() {
//   const modal = document.querySelector('.modal_window');
//   modal.classList.add('hidden');
// }, 1500);

function includeHTML() {
  let includeAttr = $('[include-html]');
  let self, url;
  $.each(includeAttr, function() {
    self = $(this);
    url = self.attr('include-html');
    self.load(url, function() {
      self.removeAttr("include-html");
    });
  });
}

// 모달창을 닫아주는 기능.
// 파이어베이스 DB 읽어오는게 완료되면 호출하자.
function closeModalWindow() {
  let modal = document.querySelector('.modal_window');
  modal.classList.add('hidden');
}

// 파이어베이스 초기화 및 접속
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtBbPqSQ-Qy1h-7EkJ3NEtY-2sT8kyL4A",
  authDomain: "web-firebase-db-test.firebaseapp.com",
  projectId: "web-firebase-db-test",
  storageBucket: "web-firebase-db-test.appspot.com",
  messagingSenderId: "680685576176",
  appId: "1:680685576176:web:2f585c7176aa5f4dd0c735",
  measurementId: "G-YXGYMEZH3N"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();

// storage에서 이미지 파일을 읽어서 파라미터로 받은 img Tag의 src에 주입하는 기능
function insertImage(imgEle, path) {
  storage.ref().child(path).getDownloadURL().then(function(url) {
    imgEle.src = url;
  });
}

//로그인이 되어있다면 수정/추가 버튼들 보여주는 기능
function showAdminButton() {
  auth.onAuthStateChanged(function (user) {
    if(user != null) {
      let changeBtnArr = document.querySelectorAll('button.button_admin');
      for(let i = 0; i < changeBtnArr.length; i++) {
        changeBtnArr[i].classList.remove('hidden');
      }
    }
  });
}

// 업로드한 파일 미리보기 기능. 부모 노드의 child로 input.file태그와 img태그가 있어야한다.
function previewImage(inputEle) {
  if(inputEle.files && inputEle.files[0]) {
    let reader = new FileReader();
    reader.onload = function(e) {
      let imgEle = inputEle.parentElement.querySelector('img');
      imgEle.src = e.target.result;
    }
    reader.readAsDataURL(inputEle.files[0]);
  }
}

// input의 값이 변경되면 파일을 업로드한다.
function uploadFile(inputFile) {
  showFileUploadModal();
  let _file = inputFile.files[0];
  let pathName = inputFile.className;
  storage.ref().child(pathName).put(_file).then(function() {
    closeFileUploadModal();
  })
}

function showFileUploadModal() {
  document.querySelector('.file_upload_modal_window').classList.remove('hidden');
}

function closeFileUploadModal() {
  document.querySelector('.file_upload_modal_window').classList.add('hidden');
}