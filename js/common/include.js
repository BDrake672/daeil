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