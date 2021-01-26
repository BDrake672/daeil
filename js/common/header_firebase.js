// 로그인이 되어있다면 유저 정보를 받아오는 함수
auth.onAuthStateChanged(function (user) {
  // 로그인된 사용자의 uid와 같은 정보의 user값을 읽는다
  db.ref('user/' + user.uid).once('value')
    .then(function(snapshot) {
      // header의 유저정보를 보이게 하고 아이디(이름) 표시하자
      showUserInfo(user.email, snapshot.val());
    });
});

function showUserInfo(email, value) {
  let name = value.name;

  let userInfo = document.querySelector('ul.user_info');
  userInfo.classList.remove('hidden');
  let userName = userInfo.firstElementChild;
  userName.innerHTML = email + '(' + name + ')';

  let btnLogout = document.getElementById('button_logout');
  btnLogout.onclick = function() {
    auth.signOut()
    .then(function() {
      alert('로그아웃 되었습니다.');
      location.assign('/');
    });
  }
}