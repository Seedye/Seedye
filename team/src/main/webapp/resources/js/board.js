// 첫 파일 선택
const inputFile1 = document.getElementById("inputFile1"); // 글쓰기 파일 선택, input태그
const inputFile = document.getElementsByClassName("inputFile");
const inputFilearea1 = document.getElementById("inputFilearea1"); // 업로드할 사진을 선택해주세요 문구 나오는 곳
//! 추가 파일 선택
// // 영역
// const inputFilearea2 = document.getElementById("inputFilearea2");
// const inputFilearea3 = document.getElementById("inputFilearea3");
// const inputFilearea4 = document.getElementById("inputFilearea4");
// // input 태그
// const inputFile2 = document.getElementById("inputFile2");
// const inputFile3 = document.getElementById("inputFile3");
// const inputFile4 = document.getElementById("inputFile4");

// 파일 추가해줄 큰 영역
const boardViewContentImgArea = document.getElementById(
  "boardViewContentImgArea"
);

const imgDelete = document.getElementsByClassName("board-Write-img-delete"); // 파일 지우기

let inputFileCheck = 0;
let inputFilearea = 0;

// for (var i = 0; i < inputFile.length; i++) {
// let j = inputFilearea;
let fileInputNum = 0;
inputFilearea1.addEventListener("change", (e) => {
  // const inputFilearea = document.getElementById("inputFilearea"+inputFilearea);
  // inputFilearea.style.display="none";
  // console.log("input한 파일 갯수 : "+inputFileCheck);

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
    console.log("선택한 파일 갯수 : " + filesLength);

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

        inputFileCheck++;
        console.log("input한 파일 갯수 : " + inputFileCheck);
      };

      console.log("현재 넣어진 파일 갯수 : " + inputFileCheck);
    }
  }

  inputFilearea++;
  console.log("마지막 콘솔 출력 : " + inputFilearea);

  //   if(inputFileCheck!=4){
  //     //
  //     // <div class="board-view-content-img add-file-area-hidden" id="inputFilearea2">
  //     //   <label for="inputFile2">
  //     //     <div class="board-Write-img-delete">
  //     //       <i class="fa-solid fa-plus fa-1x"></i>
  //     //     </div>
  //     //   </label>
  //     //   <input type="file" name="inputFile" id="inputFile2" class="inputFile" multiple="multiple" hidden>
  //     // </div>

  //     const inputFileareaDiv = document.createElement("div");
  //     const inputFileLabel = document.createElement("label");
  //     const imgDeleteDiv = document.createElement("div");
  //     const inputFileInput = document.createElement("input");

  //     inputFileareaDiv.classList.add("board-view-content-img");
  //     inputFileareaDiv.setAttribute("id", "inputFilearea"+ inputFilearea);// 파일 몇번째 추가인가 작성
  //     inputFileLabel.setAttribute("for", "inputFile"+inputFilearea);
  //     imgDeleteDiv.classList.add("board-Write-img-delete");
  //     imgDeleteDiv.setAttribute("class","fa-solid fa-plus fa-1x" );
  //     inputFileInput.setAttribute("type","file");
  //     inputFileInput.setAttribute("name", "inputFile");
  //     inputFileInput.setAttribute("id","inputFile"+inputFilearea);
  //     inputFileInput.classList.add("inputFile");
  //     inputFileInput.setAttribute("multiple", "multiple");

  //     inputFileLabel.append(imgDeleteDiv,inputFileInput);
  //     inputFileareaDiv.append(inputFileLabel);
  //     boardViewContentImgArea.append(inputFileareaDiv);

  //   }
});
// }

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

// 글작성 버튼 눌렀을때
boardWriteBtn.addEventListener("click", () => {
  boardWriteModal.style.display = "flex";
  document.body.style.overflow = "hidden";

  // <label for="inputFile1">
  //   <i class="fa-solid fa-plus fa-3x"></i>
  //   <p>업로드할 사진을 선택해 주세요</p>
  // </label>
  // <input type="file" name="inputFile" id="inputFile1" class="inputFile" multiple="multiple">

  const imgAreaDiv = document.createElement("div");
  const inputFileLabel = document.createElement("label");
  // const inputFileP = document.createElement("P");
  const inputFileTextP = document.createElement("P");
  // var inputFileText = document.createTextNode("업로드할 사진을 선택해 주세요");
  const inputFileInput = document.createElement("input");

  imgAreaDiv.classList.add("board-view-content-img-area");
  imgAreaDiv.setAttribute("id", "boardViewContentImgArea");
  inputFileLabel.setAttribute("for", "inputFile1");
  inputFileLabel.setAttribute("class", "fa-solid fa-plus fa-3x");
  inputFileTextP.innerText = "업로드할 사진을 선택해 주세요";
  inputFileTextP.classList.add("inputFileTextP");
  inputFileInput.setAttribute("type", "file");
  inputFileInput.setAttribute("name", "inputFile");
  inputFileInput.setAttribute("id", "inputFile1");
  inputFileInput.classList.add("inputFile");
  inputFileInput.setAttribute("multiple", "multiple");

  inputFileLabel.append(inputFileTextP);
  inputFilearea1.append(inputFileLabel, inputFileInput);
  boardViewContentImgArea.append(inputFilearea1);

  inputFilearea1.style.display = "flex";
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
  console.log("취소눌림");
});

// 글 작성 완료(데이터 넣기)
boardWriteInput.addEventListener("click", () => {
  boardWriteModal.style.display = "none";
  document.body.style.overflow = "unset";

  // boardTitle.value = null;
  // boardContent.value = null;
  // inputFilearea1.innerHTML = "";
  // console.log()
});
