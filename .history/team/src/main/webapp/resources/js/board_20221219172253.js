const inputFile = document.getElementById("inputFile"); // 글쓰기 파일 선택
const boardViewContentImgSelect = document.getElementById("boardViewContentImgSelect"); // 업로드할 사진을 선택해주세요 문구 나오는 곳
const boardViewContentImgArea = document.getElementById("boardViewContentImgArea");//파일 넣고 합치기 할때
// const addInputFile = document.getElementById("addInputFile"); // 파일 추가 선택
// 파일 선택
const inputAddFile = document.getElementById("inputAddFile");
let inputFileCheck = 0; // 파일 갯수 확인용

inputFile.addEventListener("change", (e)=>{

  console.log(inputFileCheck);

  if(e.target.files[0] != undefined){
    boardViewContentImgSelect.style.display="none";
    var filesLength = parseInt(e.target.files.length); 
    // 파일 4개 이하일 경우 추가 버튼 보이게
    if(filesLength <4){
      inputAddFile.classList.remove("add-file-area-hidden");
      inputAddFile.classList.add("add-file-area");
    }
    // 파일 4개일 경우 추가 버튼 안보이게
    if(inputFileCheck == 3){
      inputAddFile.classList.remove("add-file-area");
      inputAddFile.classList.add("add-file-area-hidden");
    }
    // 파일이 4개면 4번만 하게 만들거임
    let fileInputNum = 0;
    if(filesLength > 4){
      fileInputNum = 4;
      alert("파일은 4개까지만 첨부가능합니다.")
    }else{
      fileInputNum = e.target.files.length;
    }

    for(let i=0; i < fileInputNum; i++){
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

        contentImgDiv.classList.add("board-view-content-img");
        ImgDeleteDiv.classList.add("board-Write-img-delete");
        fileImg.setAttribute("src", e.target.result);

        // 조립하기
        ImgDeleteDiv.append('X');
        contentImgDiv.append(ImgDeleteDiv, fileImg);
        boardViewContentImgArea.append(contentImgDiv);

        inputFileCheck++;
        
      }
      // console.log(object);
    }
    

  }

});

