const inputFile = document.getElementById("inputFile"); // 글쓰기 파일 선택
const boardViewContentImgSelect = document.getElementById("boardViewContentImgSelect"); // 업로드할 사진을 선택해주세요 문구 나오는 곳
// 파일 선택
const inputAddFile = document.getElementById("inputAddFile"); // 추가로 파일 선택
const imgDelete = document.getElementsByClassName("board-Write-img-delete"); // 파일 지우기
const inputFile2 = document.getElementById("inputFile2"); // 글쓰기 파일 선택

let inputFileCheck = 0; // input한 파일 갯수 확인용

var form = new FormData(); // 이미지 데이터 담기

inputFile.addEventListener("change", (e)=>{


  // console.log("input한 파일 갯수 : "+inputFileCheck);

  if(e.target.files[0] != undefined){

    boardViewContentImgSelect.style.display="none";
    var filesLength = parseInt(e.target.files.length); 
    // 파일 4개 이하일 경우 추가 버튼 보이게
    if(filesLength <4){
      inputAddFile.classList.remove("add-file-area-hidden");
      inputAddFile.classList.add("add-file-area");
    }else{
      inputAddFile.classList.remove("add-file-area");
      inputAddFile.classList.add("add-file-area-hidden");
    }
    // 파일 4개일 경우 추가 버튼 안보이게
    if(inputFileCheck == 3){
      inputAddFile.classList.remove("add-file-area");
      inputAddFile.classList.add("add-file-area-hidden");
    }
    // 파일이 4개면 4번만 하게 만들거임
    let fileInputNum = 0; // 미리보기 만들기 할때 몇개 만들어 줄지 정하기 위한 선언
    // 만약 "추가할 파일 리스트"가 4-"현재 추가된파일수"보다 크다면
    if(filesLength > 4-inputFileCheck){
      fileInputNum = 4-inputFileCheck;
      alert("파일은 4개까지만 첨부가능합니다.")
      inputAddFile.classList.remove("add-file-area");
      inputAddFile.classList.add("add-file-area-hidden");
    }else{
      inputFileCheck = e.target.files.length;
    }

    for(let i=0; i < inputFileCheck; i++){

      console.log(fileInputNum);
      // 이벤트 발생한 파일 길이 만큼 for문 돌림
      
      form.append("files", e.target.files[i]);
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

        ImgDeleteDiv.setAttribute("id", "ImgDelete"+inputFileCheck);
        contentImgDiv.classList.add("board-view-content-img");
        ImgDeleteDiv.classList.add("board-Write-img-delete");

        fileImg.setAttribute("src", e.target.result);


        // 조립하기
        ImgDeleteDiv.append('X');
        contentImgDiv.append(ImgDeleteDiv, fileImg);
        boardViewContentImgArea.append(contentImgDiv);

        // 이미지 삭제
        const ImgDelete = document.getElementById("ImgDelete"+inputFileCheck);
        ImgDelete.addEventListener("click", ()=>{

        console.log("삭제 클릭되었음");
        contentImgDiv.remove();
        inputFileCheck--;
        console.log(inputFileCheck);
        // 파일 4개 이하일 경우 추가 버튼 보이게
        if(inputFileCheck == 4){
          inputAddFile.classList.remove("add-file-area");
          inputAddFile.classList.add("add-file-area-hidden");
        }else{
          inputAddFile.classList.remove("add-file-area-hidden");
          inputAddFile.classList.add("add-file-area");
        }

        // 파일 4개일 경우 추가 버튼 안보이게
        if(inputFileCheck == 0){
          boardViewContentImgSelect.style.display="flex";
          inputAddFile.classList.remove("add-file-area");
          inputAddFile.classList.add("add-file-area-hidden");

        }
        
});
        inputFileCheck++;
        console.log("input한 파일 갯수 : "+inputFileCheck);
      }


      console.log(inputFileCheck);

    }
  }
});

inputFile2.addEventListener("change", (e)=>{


  // console.log("input한 파일 갯수 : "+inputFileCheck);

  if(e.target.files[0] != undefined){

    boardViewContentImgSelect.style.display="none";
    var filesLength = parseInt(e.target.files.length); 
    // 파일 4개 이하일 경우 추가 버튼 보이게
    if(filesLength <4){
      inputAddFile.classList.remove("add-file-area-hidden");
      inputAddFile.classList.add("add-file-area");
    }else{
      inputAddFile.classList.remove("add-file-area");
      inputAddFile.classList.add("add-file-area-hidden");
    }
    // 파일 4개일 경우 추가 버튼 안보이게
    if(inputFileCheck == 3){
      inputAddFile.classList.remove("add-file-area");
      inputAddFile.classList.add("add-file-area-hidden");
    }
    // 파일이 4개면 4번만 하게 만들거임
    let fileInputNum = 0; // 미리보기 만들기 할때 몇개 만들어 줄지 정하기 위한 선언
    // 만약 "추가할 파일 리스트"가 4-"현재 추가된파일수"보다 크다면
    if(filesLength > 4-inputFileCheck){
      fileInputNum = 4-inputFileCheck;
      alert("파일은 4개까지만 첨부가능합니다.")
      inputAddFile.classList.remove("add-file-area");
      inputAddFile.classList.add("add-file-area-hidden");
    }else{
      fileInputNum = e.target.files.length;
    }

    for(let i=0; i < inputFileCheck; i++){

      console.log(fileInputNum);
      // 이벤트 발생한 파일 길이 만큼 for문 돌림
      
      form.append("files", e.target.files[i]);
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

        ImgDeleteDiv.setAttribute("id", "ImgDelete"+inputFileCheck);
        contentImgDiv.classList.add("board-view-content-img");
        ImgDeleteDiv.classList.add("board-Write-img-delete");

        fileImg.setAttribute("src", e.target.result);


        // 조립하기
        ImgDeleteDiv.append('X');
        contentImgDiv.append(ImgDeleteDiv, fileImg);
        boardViewContentImgArea.append(contentImgDiv);

        // 이미지 삭제
        const ImgDelete = document.getElementById("ImgDelete"+inputFileCheck);
        ImgDelete.addEventListener("click", ()=>{

        console.log("삭제 클릭되었음");
        contentImgDiv.remove();
        inputFileCheck--;
        console.log(inputFileCheck);
        // 파일 4개 이하일 경우 추가 버튼 보이게
        if(inputFileCheck == 4){
          inputAddFile.classList.remove("add-file-area");
          inputAddFile.classList.add("add-file-area-hidden");
        }else{
          inputAddFile.classList.remove("add-file-area-hidden");
          inputAddFile.classList.add("add-file-area");
        }

        // 파일 4개일 경우 추가 버튼 안보이게
        if(inputFileCheck == 0){
          boardViewContentImgSelect.style.display="flex";
          inputAddFile.classList.remove("add-file-area");
          inputAddFile.classList.add("add-file-area-hidden");

        }
        
});
        inputFileCheck++;
        console.log("input한 파일 갯수 : "+inputFileCheck);
      }


      console.log(inputFileCheck);

    }
  }
});
// 글작성


  // console.log("실행은 하고있니?");
  // ImgDelete.click(function() {
  //   console.log("클릭되었음");
  //   $(this).remove();
  // });


//! 모달 연결
const boardView = document.getElementsByClassName("board-list-view"); // 게시물 리스트 한개
const boardViewModal = document.getElementById("boardViewModal"); // 상세보기 모달
const boardViewX = document.getElementById("boardViewX"); // 상세보기 X
const boardWriteModal  = document.getElementById("boardWriteModal"); // 글작성 모달
const boardWriteBtn = document.getElementById("boardWriteBtn"); // 글 작성 btn
const boardWriteX = document.getElementById("boardWriteX"); // 글 작성 시 X
const boardWriteInput = document.getElementById("boardWriteInput"); // 글 작성 완료btn
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

// 글작성 버튼 눌렀을때
boardWriteBtn.addEventListener("click", ()=>{
  boardWriteModal.style.display = "flex";
  document.body.style.overflow = "hidden";
});

// 글작성 취소
boardWriteX.addEventListener("click",()=>{
  boardWriteModal.style.display = "none";
  document.body.style.overflow = "unset";

});

// 글 작성 완료(데이터 넣기)
boardWriteInput.addEventListener("click", ()=>{
  boardWriteModal.style.display = "none";
  document.body.style.overflow = "unset";

  console.log()
});

