// mailJs
(function() {
  emailjs.init("user_OKlWKl84fi2gKToHaS3xf");
  })();

// 모달창을 숨겨주는 메서드
function hideModalWindow() {
  document.querySelector('.send_modal_window').classList.add('hidden');
}

// 전송 버튼 클릭 시 이벤트
function sendMail() {
  let form = document.querySelector('form.gform');
  let inputName = document.getElementById('name');
  let inputEmail = document.getElementById('email');
  let inputPhone = document.getElementById('phone');
  let inputField = document.getElementById('field');
  let inputMessage = document.getElementById('message');
  let inputHoneypot = document.getElementById('honeypot');
  let sendModal = document.querySelector('div.send_modal_window');
  let loaderDiv = sendModal.querySelector('.loader');
  let thankyouMessage = sendModal.querySelector('.thankyou_message');
  
  // 스팸 방지 필드가 채워져있으면 리턴함.
  if(inputHoneypot.value != "") {
    console.log('스팸입니다.');
    return;
  }

  // 빈값 체크
  let inputArr = [];
  inputArr.push(inputName);
  inputArr.push(inputEmail);
  inputArr.push(inputPhone);
  inputArr.push(inputField);
  inputArr.push(inputMessage);

  for(let i = 0; i < inputArr.length; i++) {
    if(inputArr[i].value == null || inputArr[i].value.replace(" ", "") == "") {
      alert('빈 값을 채우고 요청하세요.');
      return;
    }
  }

  // 모달창 보이게 하기
  sendModal.classList.remove('hidden');

  // 필드 요소들 객체화
  let content = {
    name : inputName.value,
    email : inputEmail.value,
    phone : inputPhone.value,
    field : inputField.value,
    message : inputMessage.value
  }

  emailjs.send('service_z6nlv0f', 'template_bcus8f8', content)
    .then(function(response) {
      form.reset();
      loaderDiv.classList.add('hidden');
      thankyouMessage.classList.remove('hidden');
    }, function(error) {
      alert('이메일 전송에 실패했습니다.');
      console.dir(error);
      sendModal.classList.add('hidden');
    });
}

// 버튼에 주입
document.querySelector('button.thankyou_button').onclick = hideModalWindow;
document.querySelector('button.button-success').onclick = sendMail;

// 로딩참 숨김
closeModalWindow();