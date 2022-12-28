const boardViewModal = document.getElementById("boardViewModal"); // 상세보기 모달
const boardViewX = document.getElementById("boardViewX"); // 상세보기 X

const boardListView = document.getElementsByClassName("board-list-view");
// 제목 부분
const boardViewTitleDetailAnswer = document.getElementById("boardViewTitleDetailAnswer");
const boardViewContentContent = document.getElementById("boardViewContentContent");
const boardViewContentText = document.getElementById("boardViewContentText");

// 상세보기 눌렀을 때
for(let boardListViewItems of boardListView){
  boardListViewItems.addEventListener("click", ()=>{
    boardViewModal.style.display="flex";
    document.body.style.overflow = "hidden";
  
    console.log(loginMember);
    $.ajax({
      url : "/QABoardDetail",
      type : "POST",
      data : {"boardNo" :boardListViewItems.lastElementChild.id},
      dataType : "json",
      success : (QABoardDetail)=>{
        console.log(QABoardDetail);

        const QATitleP = document.createElement("p");
        const QAIDAndDateP = document.createElement("p");
        const QAContentP = document.createElement("p");

        QATitleP.innerText=QABoardDetail[0].boardTitle;
        QAIDAndDateP.innerText = QABoardDetail[0].memberId + " / " + QABoardDetail[0].createDate;
        QAContentP.innerText=QABoardDetail[0].boardContent;

        boardViewTitleDetailAnswer.append(QATitleP);
        boardViewContentContent.append(QAIDAndDateP);
        boardViewContentText.append(QAContentP);

      },
      error : ()=>{
        console.log("실패");
      }
    });
  });
}


// 상세보기 X
boardViewX.addEventListener("click", ()=>{
  boardViewModal.style.display = "none";
  document.body.style.overflow = "unset";
  boardViewTitleDetailAnswer.innerHTML=null;
  boardViewContentContent.innerHTML=null;
  boardViewContentText.innerHTML=null;
});
boardViewX.addEventListener("click", ()=>{
  boardViewModal.style.display = "none";
  document.body.style.overflow = "unset";
});