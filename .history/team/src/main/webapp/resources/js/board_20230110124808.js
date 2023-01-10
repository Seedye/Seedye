// 첫 파일 선택
const inputFile1 = document.getElementById("inputFile1"); // 글쓰기 파일 선택, input태그
const inputFile = document.getElementsByClassName("inputFile");
const inputFilearea1 = document.getElementById("inputFilearea1"); // 업로드할 사진을 선택해주세요 문구 나오는 곳
//! 추가 파일 선택
// // 영역
const inputFilearea2 = document.getElementById("inputFilearea2");
const inputFilearea3 = document.getElementById("inputFilearea3");
const inputFilearea4 = document.getElementById("inputFilearea4");
// // input 태그
// const inputFile2 = document.getElementById("inputFile2");
// const inputFile3 = document.getElementById("inputFile3");
// const inputFile4 = document.getElementById("inputFile4");
 



// 파일 추가해줄 큰 영역
const boardViewContentImgArea = document.getElementById(
  "boardViewContentImgArea"
);

const imgDelete = document.getElementsByClassName("board-Write-img-delete"); // 파일 지우기


let inputFilearea = 0;

// const
// for (var i = 0; i < inputFile.length; i++) {
// let j = inputFilearea;
let fileInputNum = 0;
let inputFileCheck = 0;
for(let i=0; i<inputFile.length; i++){
  inputFile[i].addEventListener("change", (e) => {
  
    if (e.target.files[0] != undefined) {
      // 첫 파일 선택 영역 안보이게
      inputFilearea1.style.display = "none";
      // 첫번재 선택된 파일 갯수
      let filesLength = parseInt(e.target.files.length);
  
      // 선택파일 4개라면
      if (filesLength > 4) {
        alert("사진 첨부는 4개까지 가능합니다.");
        fileInputNum = 4;
      } else {
        fileInputNum = e.target.files.length;
      }
      // console.log("선택한 파일 갯수 : " + filesLength);
  
      for (let i = 0; i < fileInputNum; i++) {
        // 이벤트 발생한 파일 길이 만큼 for문 돌림
        const reader = new FileReader(); // 파일 읽는 객체
        reader.readAsDataURL(e.target.files[i]); // 파일 정보를 불러와서 URL형태로 저장
  
        reader.onload = (e) => {
          // <div class="board-view-content-img">
          //   <div class="board-Write-img-delete">&times;</div>
  
          //   <img src="../../resources/images/게시판테스트img1.jpg" alt="">
          // </div>
  
          const contentImgDiv = document.createElement("div");
          const ImgDeleteDiv = document.createElement("div");
          const fileImg = document.createElement("img");
  
          ImgDeleteDiv.setAttribute("id", "ImgDelete" + inputFileCheck);
          contentImgDiv.classList.add("board-view-content-img");
          ImgDeleteDiv.classList.add("board-Write-img-delete");
  
          fileImg.setAttribute("src", e.target.result);
  
          // 조립하기
          // ImgDeleteDiv.append("X");
          contentImgDiv.append(ImgDeleteDiv, fileImg);
          boardViewContentImgArea.append(contentImgDiv);
  
          // 이미지 삭제
          // const ImgDelete = document.getElementById("ImgDelete" + inputFileCheck);
          // ImgDelete.addEventListener("click", () => {
          //   console.log("삭제 클릭되었음");
          //   contentImgDiv.remove();
          //   inputFileCheck--;
          //   console.log(inputFileCheck);
          // });
  
          // inputFileCheck=fileInputNum;
          console.log("중간에 확인:"+inputFileCheck);
        };
        inputFileCheck++;
        
        console.log("중간에 확인22:"+inputFileCheck);
      }
      console.log("중간에 확인ㅁ나어로:"+inputFileCheck);
    }
    console.log("중간에 확인2546846:"+inputFileCheck);
    console.log(fileInputNum);
    if(fileInputNum==1){
    
      inputFilearea2.classList.remove("add-file-area-hidden");
      inputFilearea2.classList.add("add-file-area");
      inputFilearea3.classList.add("add-file-area-hidden");
      inputFilearea4.classList.add("add-file-area-hidden");
    }else if(fileInputNum==2){
      inputFilearea3.classList.add("add-file-area");
      inputFilearea3.classList.remove("add-file-area-hidden");
      inputFilearea2.classList.add("add-file-area-hidden");
      inputFilearea4.classList.add("add-file-area-hidden");
    }else if(fileInputNum==3){
      inputFilearea4.classList.remove("add-file-area-hidden");
      inputFilearea2.classList.add("add-file-area-hidden");
      inputFilearea3.classList.add("add-file-area-hidden");
      inputFilearea4.classList.add("add-file-area");
    }else {
      inputFilearea2.classList.add("add-file-area-hidden");
      inputFilearea3.classList.add("add-file-area-hidden");
      inputFilearea4.classList.add("add-file-area-hidden");
      // inputFilearea2.classList.add("add-file-area-hidden");
    }
    inputFilearea++;
    // console.log("마지막 콘솔 출력 : " + inputFilearea);
  
    
  });
}

console.log("inputFileCheck:"+inputFileCheck);


// }
// 게시글작성 유효성 검사
function writeValidate(){

  if(boardTitle.value.trim().length == 0){
    alert("제목입력은 필수 입니다.");
    boardTitle.value="";
    boardTitle.focus();
    return false;
  }
  if(boardContent.value.trim().length == 0){
    alert("내용입력은 필수 입니다.");
    boardContent.value="";
    boardContent.focus();
    return false;
  }
  return true;
}




//! 모달 연결
const boardView = document.getElementsByClassName("board-list-view"); // 게시물 리스트 한개

const boardWriteModal = document.getElementById("boardWriteModal"); // 글작성 모달
const boardWriteBtn = document.getElementById("boardWriteBtn"); // 글 작성 btn
const boardWriteX = document.getElementById("boardWriteX"); // 글 작성 시 X
const boardWriteInput = document.getElementById("boardWriteInput"); // 글 작성 완료btn

const boardTitle = document.getElementById("boardTitle"); //글내용
const boardContent = document.getElementById("boardContent"); //글내용

// 상세보기 눌렀을 때
// boardView[0].addEventListener("click", ()=>{
//   boardViewModal.style.display="flex";
//   document.body.style.overflow = "hidden";
// });

// // 상세보기 X
// boardViewX.addEventListener("click", ()=>{
//   boardViewModal.style.display = "none";
//   document.body.style.overflow = "unset";
// });
// boardViewX.addEventListener("click", ()=>{
//   boardViewModal.style.display = "none";
//   document.body.style.overflow = "unset";
// });

const contentDetailAnswer = document.getElementById("contentDetailAnswer");

(()=>{
  if(memberNo == ""){
    boardWriteBtn.style.display="none";
  }else{
    boardWriteBtn.style.display="flex";
  }
})();
// 글작성 버튼 눌렀을때
boardWriteBtn.addEventListener("click", () => {
  boardWriteModal.style.display = "flex";
  document.body.style.overflow = "hidden";

  // boardTitle.value="";
  // boardContent.value="";
  // boardViewContentImgArea.innerHTML="";

    // <label for="inputFile1">
    //   <i class="fa-solid fa-plus fa-3x"></i>
    //   <p>업로드할 사진을 선택해 주세요</p>
    // </label>
    // <input type="file" name="inputFile" id="inputFile1" class="inputFile" multiple="multiple">
  
    // const imgAreaDiv = document.createElement("div");
    // const inputFileLabel = document.createElement("label");
    // // const inputFileP = document.createElement("P");
    // const inputFileTextP = document.createElement("P");
    // // var inputFileText = document.createTextNode("업로드할 사진을 선택해 주세요");
    // const inputFileInput = document.createElement("input");
  
    // imgAreaDiv.classList.add("board-view-content-img-area");
    // imgAreaDiv.setAttribute("id", "boardViewContentImgArea");
    // inputFileLabel.setAttribute("for", "inputFile1");
    // inputFileLabel.setAttribute("class", "fa-solid fa-plus fa-3x");
    // inputFileTextP.innerText = "업로드할 사진을 선택해 주세요";
    // inputFileTextP.classList.add("inputFileTextP");
    // inputFileInput.setAttribute("type", "file");
    // inputFileInput.setAttribute("name", "inputFile");
    // inputFileInput.setAttribute("id", "inputFile1");
    // inputFileInput.classList.add("inputFile");
    // inputFileInput.setAttribute("multiple", "multiple");
  
    // inputFileLabel.append(inputFileTextP);
    // inputFilearea1.append(inputFileLabel, inputFileInput);
    // boardViewContentImgArea.append(inputFilearea1);
  
    inputFilearea1.style.display = "flex";

});
$('#boardTitle').keyup(function(){
  var rows = $('#boardTitle').val().split('\n').length;
  var maxRows = 1;
  if( rows > maxRows){
      // alert('3줄 까지만 가능합니다');
      modifiedText = $('#boardTitle').val().split("\n").slice(0, maxRows);
      $('#boardTitle').val(modifiedText.join("\n"));
  }
});

// 글작성 취소
boardWriteX.addEventListener("click", () => {
  boardWriteModal.style.display = "none";
  document.body.style.overflow = "unset";
  boardTitle.value = null;
  boardContent.value = null;
  boardViewContentImgArea.innerHTML = "";
  inputFilearea1.innerHTML = "";
  boardViewContentImgArea.innerText = "";
  location.reload();
  // console.log("취소눌림");
});

// 글 작성 완료(데이터 넣기)
boardWriteInput.addEventListener("click", () => {
  
  if(boardTitle.value.trim().length == 0){

  }
  if(boardContent.value.trim().length == 0){

  }else{
    boardWriteModal.style.display = "none";
    document.body.style.overflow = "unset";
  }
  // boardTitle.value = null;
  // boardContent.value = null;
  // inputFilearea1.innerHTML = "";
  // console.log()
});


//! 검색 기능
(()=>{
  const select = document.getElementById("search-key");// select 하는곳
  const input = document.getElementById("search-query") // input하는곳
  const option = document.querySelectorAll("#search-key > option");

  if(select != null){
    // 검색창 존재할 때
    const params = new URL(location.href).searchParams;
    // 줏에서 쿼리스트링만 분리한 객체

    const key = params.get("key");
    const query = params.get("query");

    // input에 이전 검색어를 값으로 추가
    input.value = query;

    // select에서 이전 검색한 key의 값과 일치하는 option태그에
    // selected 속성 추가
    for(let op of option){
      // option의 value와 key가 일치할 때
      if(op.value == key){
        // op.setAttribute("selected", true)
        op.selected = true;
      }
    }
  }

})();

const pageNoList = document.getElementsByClassName("board-list-page-no");
(()=>{
  for(let items of pageNoList){
    if(items.id == ""){
      const aaa = items.firstChild;

      items.style.backgroundColor = "#2db420";
      items.style.borderRadius = "50%";
      aaa.style.color="white";
      
    }else{
      items.style.borderBottom = "none";
    }
  }

})();


