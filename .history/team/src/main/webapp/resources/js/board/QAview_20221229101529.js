const boardViewModal = document.getElementById("boardViewModal"); // 상세보기 모달
const boardViewX = document.getElementById("boardViewX"); // 상세보기 X

const boardListView = document.getElementsByClassName("board-list-view");
// 제목 부분
const boardViewTitleDetailAnswer = document.getElementById("boardViewTitleDetailAnswer");
const boardViewContentContent = document.getElementById("boardViewContentContent");
const boardViewContentText = document.getElementById("boardViewContentText");
const boardViewContentTextComment = document.getElementById("boardViewContentTextComment");
const boardViewContentContentComment = document.getElementById("boardViewContentContentComment");


// 상세보기 눌렀을 때
for(let boardListViewItems of boardListView){
  boardListViewItems.addEventListener("click", ()=>{
    boardViewModal.style.display="flex";
    document.body.style.overflow = "hidden";
  
    $.ajax({
      url : "/QABoardDetail",
      type : "POST",
      data : {"boardNo" :boardListViewItems.lastElementChild.id},
      dataType : "json",
      success : (QABoardDetail)=>{
        console.log(QABoardDetail);
        console.log(QABoardDetail[0].commentCreateDate);

        // 제목 생성 P
        const QATitleP = document.createElement("p");
        //"문의 내용"텍스트 나올 P
        const QATextP = document.createElement("p");
        // id/날짜 생성 P
        const QAIDAndDateP = document.createElement("p");
        // 작성글 생성 P
        const QAContentP = document.createElement("p");
        //"답변"텍스트 나올 P
        const QATextCommentP = document.createElement("p");
        // 답변 id/날짜 생성 P
        const QAIDAndDateCommentP = document.createElement("p");
        // 답변 내용 생성 P
        const QAContentCommentP = document.createElement("p");

        QATitleP.innerText=QABoardDetail[0].boardTitle;
        QATextP.innerText="문의 내용";
        QAIDAndDateP.innerText = QABoardDetail[0].memberId + " / " + QABoardDetail[0].createDate;
        QAContentP.innerText=QABoardDetail[0].boardContent;
        
        QATextCommentP.innerText="답변";
        QAIDAndDateCommentP.innerText = QABoardDetail[0].commentCreateDate;
        QAContentCommentP.innerText=QABoardDetail[0].commentContent;

        boardViewTitleDetailAnswer.append(QATitleP);
        boardViewContentContent.append(QATextP, QAIDAndDateP);
        boardViewContentText.append(QAContentP);
        boardViewContentContent.append(QATextP, QAIDAndDateP);

        // boardViewContentContentComment.append(QATextCommentP,QAIDAndDateCommentP)
        boardViewContentTextComment.append(QAContentCommentP);
        const boardUpDel = document.querySelector(".board-view-content-delete-update");

        // 자기가 작성한 게시물 수정/삭제버튼 보이게
        if (boardUpDel.id == QABoardDetail[0].memberId){
          boardUpDel.innerHTML = "";
          
          const boardDelete = document.createElement("div");
          boardDelete.classList.add("board-view-btn");
          boardDelete.innerText = "삭제";

          const boardUpdate = document.createElement("div");
          boardUpdate.classList.add("board-view-btn");
          boardUpdate.innerText = "수정";

          boardUpDel.append(boardDelete, boardUpdate);
          
        } else{
          boardUpDel.innerHTML = "";
        }
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