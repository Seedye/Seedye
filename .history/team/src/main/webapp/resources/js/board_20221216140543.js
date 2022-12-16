const inputFile = document.getElementById("inputFile"); // 글쓰기 파일 선택
const boardViewContentImgSelect = document.getElementById("boardViewContentImgSelect"); // 업로드할 사진을 선택해주세요 문구 나오는 곳
const boardViewContentImgArea = document.getElementById("boardViewContentImgArea");//파일 넣고 합치기 할때 
// 파일 선택
inputFile.addEventListener("change", (e)=>{

  if(e.target.files[0] != undefined){
    boardViewContentImgSelect.style.display="none";
    console.log(e.target.files.length);
    for(let i=0; i < e.target.files.length; i++){
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

        console.log(e.target.result);
        // 조립하기
        // ImgDeleteDiv.append("&times;");
        contentImgDiv.append(ImgDeleteDiv, fileImg);
        boardViewContentImgArea.append(contentImgDiv);

      }

    }
  }
});