closeModalWindow();
const loginBtn = document.getElementById('login_submit');

// 로그인 버튼에 로그인 기능 주입
loginBtn.onclick = function() {
  let userId= document.getElementById('user_id').value;
  let userPwd = document.getElementById('user_password').value;
  auth.signInWithEmailAndPassword(userId, userPwd)
    .then(function(firebaseUser) {
      // 로그인에 성공 할 시 실행
      loginSuccess(firebaseUser);
    })
    .catch(function(error) {
      // 로그인에 실패나 에러 발생 시 실행
      loginFail(error.code);
      console.dir(error);
    });
  }

function loginSuccess(user) {
  alert('로그인 성공');
  location.assign('/');
}
  
  // 로그인 실패 시 실행될 함수
const invalidEmail = 'auth/invalid-email';
const wrongPwd = 'auth/wrong-password';
function loginFail(errorCode) {
  let message = '로그인에 실패했습니다.\n'
  if(errorCode == invalidEmail) {
    message += '사유 : 없는 계정';
  }else if(errorCode == wrongPwd) {
    message += '사유 : 비밀번호 다름';
  }
  alert(message);
}