const table_member = db.ref('public/member');
let members = [];

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
    makeMembers(members);
    showAdminButton();
    closeModalWindow();
  })
  .catch((error) => {
    // reject() was called
    // Something went wrong while fetching the data.
    // Handle that error here.
    console.log('에러발생');
    console.dir(error);
  });

// 정보를 이용해 구성원을 만드는 기능
function makeMembers(membersArr) {
  // 이름표
  let memberTag = document.querySelector('div.member_tag');
  // 전체 컨테이너
  let peapleConatainer = document.querySelector('div.peaple_container');
  // 초기화
  memberTag.innerHTML = "";
  peapleConatainer.innerHTML = "";
  // 만들기 및 주입
  for(let i = 0; i < membersArr.length; i++) {
    let tagStr = '<a href=#>' + membersArr[i].name + '</a>';
    let personStr = '<div class=person_container>' +
    '<div class=person_picture>' + '<img src=' + membersArr[i].img + ' alt='  + membersArr[i].name + '></div>' +
    '<div class=person_information><div class=person_name><h5>' + membersArr[i].job + '</h5><ul><li><h4>' + membersArr[i].name + '</h4></li></ul></div>' +
    '<div class=person_major><h5>전문분야</h5><ul>';
    for(let j=0; j < Object.values(membersArr[i].field).length; j++) {
      personStr += '<li>· ' + Object.values(membersArr[i].field)[j] + '</li>';
    }
    personStr += '</ul></div>' +
    '<div person_career><h5>경력사항</h5><ul>';
    for(let j = 0; j < Object.values(membersArr[i].career).length; j++) {
      personStr += '<li>· ' + Object.values(membersArr[i].career)[j] + '</li>';
    }
    personStr += '</ul></div>' + 
    '<div class=person_contact><h5>연락처</h5><ul>' +
    '<li>· TEL : ' +  membersArr[i].contact.tel + '</li>' +
    '<li>· MAIL : ' +  membersArr[i].contact.mail + '</li></ul></div>' +
    '<div>' +
    '<button id=btn_change_member' + i + ' class="hidden button_admin" type="button" onclick=changeMemberInfo(' + i + ')>정보수정</button>' + 
    '<button id=btn_delete_member' + i + ' class="hidden button_admin" type="button" onclick=deleteMember(' + i + ')>인물삭제</button>' +
    '</div></div></div>';
    
    memberTag.innerHTML += tagStr;
    peapleConatainer.innerHTML += personStr;
  }
  peapleConatainer.parentElement.innerHTML += '<div><button id="button_insert_new_member" class="hidden button_admin" onclick="insertNewMember()">구성원 추가</button></div>';
  showThisMan();
}

//이름표를 클릭하면 해당인의 정보를 보여주는 기능
function showThisMan() {
  let tagArr = document.querySelectorAll('.member_tag > a');
  let peaple = document.querySelectorAll('.person_container');
  // 처음에 생성되면 첫번째 인물만 보여주기
  tagArr[0].classList.add('current');
  for(let i = 0; i < tagArr.length; i++) {
    if(i != 0) {
      peaple[i].classList.add('hidden');
    }
    // 이름표 클릭시 해당 인물로 변경
    tagArr[i].onclick = function() {
      this.classList.add('current');
      peaple[i].classList.remove('hidden');
      for(let j = 0; j < tagArr.length; j++) {
        if(j == i) { continue; }
        tagArr[j].classList.remove('current');
        peaple[j].classList.add('hidden');
      }
    }
  }
}

// 정보수정 버튼
function changeMemberInfo(index) {
  let str = '/view/admin/introduce/admin_member.html?member=' + index;
  location.assign(str);
  stopPropagation();
}

// 구성원 추가 버튼
function insertNewMember() {
  let str = '/view/admin/introduce/admin_member.html?member=new';
  location.assign(str);
}

// 삭제버튼
function deleteMember(index) {
  let selectMember = members[index];
  let confirmStr = '삭제하면 데이터를 되돌릴 수 없습니다.\n\'' + selectMember.name + '\'을 삭제합니다. 맞으면 "확인"을 입력하세요.';
  let confirm = prompt(confirmStr);
  if(confirm == '확인') {
    let pathStr = 'public/member/' + selectMember.path_name;
    db.ref(pathStr).remove();
    alert('삭제 완료');
    location.reload();
  }
}