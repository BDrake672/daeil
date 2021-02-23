//페이지 파라미터로 들어온 이름을 알아내는 기능
function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// summernpte 로딩
function setSummernote() {
  $('#summernote').summernote({
    minHeight: 400,             // 최소 높이
    maxHeight: null,             // 최대 높이
    focus: false,                  // 에디터 로딩후 포커스를 맞출지 여부
    lang: "ko-KR",					// 한글 설정
    placeholder: '내용을 입력하세요.',	//placeholder 설정
  });
  $('#summernote').summernote('undo');
  $('#summernote').summernote('redo');
}

// 제출 버튼 이벤트
function buttonPostSumbit(arr, pathName) {
  let titleInput = document.getElementById('post_title');
  let attatchmentsInput = document.getElementById('post_attatchments');
  let captionInput = document.getElementById('summernote');
  
  // 제목이나 내용 빈값 체크
  let titleStr = titleInput.value.replace(" ", "");
  if(titleStr == "" || titleStr == null || $('#summernote').summernote('isEmpty')) {
    alert('빈 값으로 제출할 수 없습니다.');
    return;
  }

  // 내용 객체화
  // 게시글 번호 지정
  let pathStr = "";
  if(pathName == 'new') {
    let postNum = (arr.length + 1);
    for(let i = 0; i < arr.length; i++) {
      let str = 'post';
      if(postNum < 10) {
        str += '0' + postNum;
      }else{
        str += postNum;
      }
      if(arr[i].path_name == str) {
        postNum++;
      }
    }
    if(postNum < 10) {
      pathStr = 'post0' + postNum;
    }else {
      pathStr = 'post' + postNum;
    }
  }else{
    pathStr = pathName;
  }
  let fileStr = '/files/';
  let fileNameSpan = document.getElementById('file_name');
  fileStr += fileNameSpan.innerText;
  let post = {
    title: titleInput.value,
    file: fileStr,
    context: captionInput.value,
    path_name: pathStr
  }

  console.dir(post);

  // db에 입력
  db.ref('public/board/' + pathStr).set(post);
  alert('작성완료');
  location.assign('/view/support/support.html');
}

// 로그인 되어있는지 먼저 체크
auth.onAuthStateChanged(function (user) {
  if(user == null) {
    alert('관리자 로그인 후 이용하세요.');
    location.assign('/');
    return;
  }
  // db연결해서 값 읽어오기
  let table_board = db.ref('public/board');
  let postArr = [];

  const getData = (ref) => {
    return new Promise((resolve, reject) => {
      const onError = error => reject(error);
      const onData = snap => resolve(
        // snap.val()
        snap.forEach(ss => {
          postArr.push(ss.val());
        })
        );
        ref.on("value", onData, onError);
      });
    };
    
    getData(table_board)
    .then((value) => {
      // resolve() was called
      // 섬머노트 불러오기
      setSummernote();
      
      // 파라미터로 들어온 값을 읽는다.
      let parameter = getParameterByName('post');
      if(parameter == "") {
        //잘못된 접근이다. 돌려보낸다
        alert('잘못된 접근 방식입니다.');
        location.assign('/view/support/support.html');
      }else if(parameter == 'new') {
        // 신규 게시물일 경우
        // 버튼에 제출 이벤트 주입
        document.getElementById('button_post_submit').onclick = function() {
          buttonPostSumbit(postArr, parameter);
        }
      }else if(typeof(parseInt(parameter)) === "number") {
        // 기존 게시글을 수정하는 거라면 실행됨
        let post = postArr[(parameter-1)];
        insertPostData(post);
        // 버튼에 제출 이벤트 주입
        document.getElementById('button_post_submit').onclick = function() {
          buttonPostSumbit(postArr, post.path_name);
        }
      }
      closeModalWindow();
    })
    .catch((error) => {
      // reject() was called
      // Something went wrong while fetching the data.
      // Handle that error here.
      console.log('에러발생');
      console.dir(error);
    });
  });

// 버튼을 누르면 input을 여는 이벤트
function openInputFile() {
  document.getElementById('post_attatchments').click();
}

// 첨부파일을 선택하면 파일 업로드 및 span에 표시
function uploadFileAndShowFileName(inputFileEle) {
  let fileName = inputFileEle.value.substring((inputFileEle.value.lastIndexOf('\\') + 1), inputFileEle.value.length);
  let fileNameSpan = document.getElementById('file_name');

  // 취소버튼 이나 파일 선택 안했을 때
  if(inputFileEle.value == null || inputFileEle.value == "") {
    return;
  }

  fileNameSpan.innerText = fileName;
  inputFileEle.className = '/files/' + fileName;

  uploadFile(inputFileEle);
}

// 기존 게시물을 수정 할 경우 
function insertPostData(data) {
  let titleInput = document.getElementById('post_title');
  let fileNameSpan = document.getElementById('file_name');
  let postAttatchments = document.getElementById('post_attatchments');
  let summernote = $('#summernote')

  titleInput.value = data.title;
  postAttatchments.classList.add(data.file);
  fileNameSpan.innerText = data.file.substring((data.file.lastIndexOf('/') + 1), data.file.length);
  summernote.summernote('code', data.context);
}