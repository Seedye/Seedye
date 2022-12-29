const boardViewModal = document.getElementById("boardViewModal"); // 상세보기 모달
const boardViewX = document.getElementById("boardViewX"); // 상세보기 X

const boardListView = document.getElementsByClassName("board-list-view");
// 제목 부분
const boardViewTitleDetailAnswer = document.getElementById("boardViewTitleDetailAnswer");
// 내용 아이디/날짜
const boardViewContentContent = document.getElementById("boardViewContentContent");
// 내용 상세출력
const boardViewContentText = document.getElementById("boardViewContentText");
// 답변 날짜
const boardViewContentTextComment = document.getElementById("boardViewContentTextComment");
// 답변 내용 상세 출력
const boardViewContentContentComment = document.getElementById("boardViewContentContentComment");

// 이미지 생성 담아줄거
const ContentImgArea = document.getElementById("ContentImgArea");

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
        if(QABoardDetail[0].commentContent != null){
          QAIDAndDateCommentP.innerText = QABoardDetail[0].commentCreateDate;
          QAContentCommentP.innerText=QABoardDetail[0].commentContent;
        }else{
          QAIDAndDateCommentP.innerText="";
          QAContentCommentP.innerText="**** 답변 준비중입니다 (　-̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥᷄ _ -̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥᷅ ) ****";
        }
        
        boardViewTitleDetailAnswer.append(QATitleP);
        boardViewContentContent.append(QATextP, QAIDAndDateP);
        boardViewContentText.append(QAContentP);

        boardViewContentContentComment.append(QATextCommentP,QAIDAndDateCommentP)
        boardViewContentTextComment.append(QAContentCommentP);

        console.log("이미지 리스트 길이 출력 : " +QABoardDetail[0].imageList.length);
        //! 이미지 만드는 create작성해야함.
        if(QABoardDetail[0].imageList.length != 0){

          ContentImgArea.style.display="flex";
          // <div class="board-view-content-img">
          //   <img src="../../resources/images/게시판테스트img1.jpg" alt="">
          // </div>
          console.log(QABoardDetail[0].imgNo);
          console.log(QABoardDetail[0].imageList.length);

          for(let i= 0; i<QABoardDetail[0].imageList.length; i++){
            //TODO 아마도 수정 필요
            if(i<4){

              const contentImgDiv = document.createElement("div");
              const contentImgImg = document.createElement("img");
    
              contentImgDiv.classList.add("board-view-content-img");
              contentImgImg.setAttribute("src", QABoardDetail[0].imageList[i].imgPath+"/"+QABoardDetail[0].imageList[i].imgRename);
    
              contentImgDiv.append(contentImgImg);
              ContentImgArea.append(contentImgDiv);
            }


          }
         
        }else{
          ContentImgArea.style.display="none";
        }

        // 자기가 작성한 게시물 수정/삭제버튼 보이게
        const boardUpDel = document.querySelector(".board-view-content-delete-update");

        if (boardUpDel.id == QABoardDetail[0].memberId){
          boardUpDel.innerHTML = "";
          
          const boardDelete = document.createElement("div");
          boardDelete.classList.add("board-view-btn");
          boardDelete.setAttribute("id", "boardDelete");
          boardDelete.innerText = "삭제";

          boardDelete.addEventListener("click", ()=>{
            $.ajax({
              url : "/QABoardDelete",
              type : "POST",
              data : {"boardNo" :boardListViewItems.lastElementChild.id},
              dataType : "json",
              success : (result=0)=>{
                console.log("게시물 취소가 완료되었습니다.");
                boardViewModal.display="none";
              },
              error: ()=>{
                console.log("게시물 작성중 오류발생");
              }

            });
          });
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
  boardViewContentContentComment.innerHTML=null;
  boardViewContentTextComment.innerHTML=null;
  ContentImgArea.style.display="none";
  ContentImgArea.innerHTML=null;
});
boardViewX.addEventListener("click", ()=>{
  boardViewModal.style.display = "none";
  document.body.style.overflow = "unset";
});