closeModalWindow();

//페이지 파라미터로 들어온 이름을 알아내는 기능
function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

let parameter = getParameterByName('member');
const table_member = db.ref('member');
let members = [];

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
        members.push(ss.val());
      })
    );
    ref.on("value", onData, onError);
  });
};

getData(table_member)
.then((value) => {
  // resolve() was called
  console.dir(members);
  if(parameter != null && parameter != "" && parameter != 'new') {
    insertMemberForm(members[parameter]);
  }
})
.catch((error) => {
  // reject() was called
  // Something went wrong while fetching the data.
  // Handle that error here.
  console.log('에러발생');
  console.dir(error);
});

// 특정인의 수정 버튼으로 눌렀다면(파라미터가 있다면) 폼 안쪽을 체우기
function insertMemberForm(member) {
  document.getElementById('member_job').value = member.job;
  document.getElementById('member_name').value = member.name;
  let memberField = document.querySelector('ul.member_field');
  let inputValueArr = Object.values(member.field);
  makeList(memberField, inputValueArr, inputValueArr.length)
  let memberCareer = document.querySelector('ul.member_career');
  inputValueArr = Object.values(member.career);
  makeList(memberCareer, inputValueArr, inputValueArr.length);
  document.getElementById('member_contact_tel').value = member.contact.tel;
  document.getElementById('member_contact_mail').value = member.contact.mail;  
}

// 삭제버튼 기능
function deleteThisParent(btn) {
  // 버튼의 상위 ul 선택
  let ul = btn.parentElement.parentElement;
  // 상위 ul의 li들
  let liArr = ul.querySelectorAll('li');
  if(liArr.length == 1) {
    alert('반드시 1개 이상의 값은 필요합니다.');
    return;
  }
  // 상위 ul의 li중 버튼을 누른 li 제외
  let removedLiArrInputValues = [];
  for(let i = 0; i < liArr.length; i++) {
    if(btn.value == i) { continue; }
    removedLiArrInputValues.push(liArr[i].querySelector('input').value);
  }

  // list를 제외하고 나머지 li로 다시 만들기
  makeList(ul, removedLiArrInputValues, removedLiArrInputValues.length);
}

// 추가버튼 기능
function insertThisChild(btn) {
  let ul = (btn.parentElement).querySelector('ul');
  let liArr = ul.querySelectorAll('li');
  let inputValueArr = [];
  for(let i = 0; i < liArr.length; i++) {
    inputValueArr.push(liArr[i].querySelector('input').value);
  }
  makeList(ul, inputValueArr, (liArr.length + 1));
}

// 전문분야/경력사항 ul 안쪽 만들기
function makeList(ul, inputValueArr, length) {
  let className = ul.className;
  ul.innerHTML = "";
  if(className == "member_field") {
    let liCount = 1;
    for(let i = 0; i < length; i++) {
      let str = '<li><label for=member_field' + liCount + '>전문분야' + liCount + '</label>';
      if(inputValueArr[i]) {
        str += '<input type=text required id=member_field' + liCount + ' value=' + inputValueArr[i] + '>';
      }else{
        str += '<input type=text required id=member_field' + liCount + '>';
      }
      str += '<button type=button value=' + i + ' onclick=deleteThisParent(this)>삭제</button></li>';
      ul.innerHTML += str;
      liCount++;
    }
  }else if(className == "member_career") {
    let liCount = 1;
    for(let i = 0; i < length; i++) {
      let str = '<li><label for=member_career' + liCount + '>경력사항' + liCount + '</label>';
      if(inputValueArr[i]) {
        str += '<input type=text required id=member_career' + liCount + ' value=' + inputValueArr[i] + '>';
      }else{
        str += '<input type=text required id=member_career' + liCount + '>';
      }
      str += '<button type=button value=' + i + ' onclick=deleteThisParent(this)>삭제</button></li>';
      ul.innerHTML += str;
      liCount++;
    }
  }
}

// 폼 submit 이벤트
function writeMember() {
  let inputArr = document.querySelectorAll('#member_form input');
  // 빈값 체크
  for(let i = 0; i < inputArr.length; i++) {
    let str = inputArr[i].value.replace(" ", "");
    if(str == null || str == "") {
      alert('빈 값을 입력할 수 없습니다.');
      return;
    }
  }
  // db 경로 지정
  let dbPath = "";
  if(parameter == 'new' || parameter == "") {
    let pathNum = 1;
    let str;
    for(let i = 0; i < members.length; i++) {
      str = 'member' + pathNum;
      if(str == members[i].path_name) {
        pathNum++;
      }
    }
    dbPath += 'member' + pathNum;
  }else{
    dbPath += members[parameter].path_name;
  }
  // 전문분야 객체화
  let fieldInputArr = document.querySelectorAll('ul.member_field>li>input');
  let fieldKeyArr = [];
  let fieldValueArr = [];
  for(let i = 0; i < fieldInputArr.length; i++) {
    let keyStr = 'field' + (i+1);
    fieldKeyArr.push(keyStr);
    fieldValueArr.push(fieldInputArr[i].value);
  }
  let fieldObj = {};
  for(let i = 0; i < fieldKeyArr.length; i++) {
    fieldObj[fieldKeyArr[i]] = fieldValueArr[i];
  }
  // 경력사항 직렬화
  let careerInputArr = document.querySelectorAll('ul.member_career>li>input');
  let careerKeyArr = [];
  let careerValueArr = [];
  for(let i = 0; i < careerInputArr.length; i++) {
    let keyStr = 'career' + (i+1);
    careerKeyArr.push(keyStr);
    careerValueArr.push(careerInputArr[i].value);
  }
  let careerObj = {};
  for(let i = 0; i < careerInputArr.length; i++) {
    careerObj[careerKeyArr[i]] = careerValueArr[i];
  }
  // 연락처 직렬화
  let telData = document.getElementById('member_contact_tel').value;
  let mailData = document.getElementById('member_contact_mail').value;
  // 이미지 경로
  let imgPath = "/images/introduce/" + dbPath + '.jpg';
  // db에 맞는 객체 생성
  let member = {
    job: document.getElementById('member_job').value,
    name: document.getElementById('member_name').value,
    field: fieldObj,
    career: careerObj,
    img: imgPath,
    path_name: dbPath,
    contact: {
      tel : telData,
      mail : mailData
    }
  }

  console.dir(member);
  db.ref('members/' + dbPath).set(member);
  alert('db 입력 성공');
  location.assign('/view/introduce/introduce.html?page=member');
}