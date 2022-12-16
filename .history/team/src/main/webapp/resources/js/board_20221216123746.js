const inputFile = document.getElementById("inputFile"); // 글쓰기 파일 선택
const boardViewContentImgSelect = document.getElementById("boardViewContentImgSelect"); // 업로드할 사진을 선택해주세요 문구 나오는 곳

// 파일 선택
inputFile.addEventListener("change", (e)=>{
  if(e.target.files[0] != undefined){
    boardViewContentImgSelect.style.display="none";
    
  }else{

  }
});