const boardViewModal = document.getElementById("boardViewModal"); // 상세보기 모달
const boardViewX = document.getElementById("boardViewX"); // 상세보기 X

const boardListView = document.getElementsByClassName("board-list-view");
// 제목 부분
const boardViewTitleDetailAnswer = document.getElementById(
  "boardViewTitleDetailAnswer"
);
// 내용 아이디/날짜
const boardViewContentContent = document.getElementById(
  "boardViewContentContent"
);
// 내용 상세출력
const boardViewContentText = document.getElementById("boardViewContentText");
// 답변 날짜
const boardViewContentTextComment = document.getElementById(
  "boardViewContentTextComment"
);
// 답변 내용 상세 출력
const boardViewContentContentComment = document.getElementById(
  "boardViewContentContentComment"
);

// 이미지 생성 담아줄거
const ContentImgArea = document.getElementById("ContentImgArea");

// 상세보기 눌렀을 때
for (let boardListViewItems of boardListView) {
  boardListViewItems.addEventListener("click", () => {
    boardViewModal.style.display = "flex";
    document.body.style.overflow = "hidden";

    $.ajax({
      url: "/QABoardDetail",
      type: "POST",
      data: { boardNo: boardListViewItems.lastElementChild.id },
      dataType: "json",
      success: (QABoardDetail) => {
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

        console.log("관리자 인가요 : ?"+loginMemberAutority);
        // 답변 내용 생성 P
        if(loginMemberAutority == 2){

          const QAContentCommentP = document.createElement("p");
          const QAContentCommentInput = document.createElement("input");
          QAContentCommentP.append(QAContentCommentInput);
        }else{

          const QAContentCommentP = document.createElement("p");
        }

        QATitleP.innerText = QABoardDetail[0].boardTitle;
        QATextP.innerText = "문의 내용";
        QAIDAndDateP.innerText =
          QABoardDetail[0].memberId + " / " + QABoardDetail[0].createDate;
        QAContentP.innerText = QABoardDetail[0].boardContent;

        QATextCommentP.innerText = "답변";
        // 관리자면
      

          if (QABoardDetail[0].commentContent != null) {
            QAIDAndDateCommentP.innerText = QABoardDetail[0].commentCreateDate;
            QAContentCommentP.innerText = QABoardDetail[0].commentContent;
          } else {
            inputFile()
            QAIDAndDateCommentP.innerText = "";
            QAContentCommentP.innerText =
              "**** 답변 준비중입니다 (　-̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥᷄ _ -̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥᷅ ) ****";
          }
        

        boardViewTitleDetailAnswer.append(QATitleP);
        boardViewContentContent.append(QATextP, QAIDAndDateP);
        boardViewContentText.append(QAContentP);

        // 답변 and 등록 날짜
        boardViewContentContentComment.append(
          QATextCommentP,
          QAIDAndDateCommentP
        );
        boardViewContentTextComment.append(QAContentCommentP);

        console.log(
          "이미지 리스트 길이 출력 : " + QABoardDetail[0].imageList.length
        );
        //! 이미지 만드는 create작성해야함.
        if (QABoardDetail[0].imageList.length != 0) {
          ContentImgArea.style.display = "flex";
          // <div class="board-view-content-img">
          //   <img src="../../resources/images/게시판테스트img1.jpg" alt="">
          // </div>
          console.log(QABoardDetail[0].imgNo);
          console.log(QABoardDetail[0].imageList.length);

          for (let i = 0; i < QABoardDetail[0].imageList.length; i++) {
            //TODO 아마도 수정 필요
            if (i < 4) {
              const contentImgDiv = document.createElement("div");
              const contentImgImg = document.createElement("img");

              contentImgDiv.classList.add("board-view-content-img");
              contentImgImg.setAttribute(
                "src",
                QABoardDetail[0].imageList[i].imgPath +
                  "/" +
                  QABoardDetail[0].imageList[i].imgRename
              );

              contentImgDiv.append(contentImgImg);
              ContentImgArea.append(contentImgDiv);
            }
          }
        } else {
          ContentImgArea.style.display = "none";
        }

        // 자기가 작성한 게시물 수정/삭제버튼 보이게
        const boardUpDel = document.querySelector(
          ".board-view-content-delete-update"
        );

        if (boardUpDel.id == QABoardDetail[0].memberId) {
          boardUpDel.innerHTML = "";

          const boardDelete = document.createElement("div");
          boardDelete.classList.add("board-view-btn");
          boardDelete.setAttribute("id", "boardDelete");
          boardDelete.innerText = "삭제";

          // ?게시물 삭제
          boardDelete.addEventListener("click", () => {
            $.ajax({
              url: "/QABoardDelete",
              type: "GET",
              data: { boardNo: boardListViewItems.lastElementChild.id },
              dataType: "json",
              success: (result) => {
                if (result > 0) {
                  boardViewModal.style.display = "none";
                  location.reload();

                } else {
                  alert("삭제 XXX");
                }
              },
              error: () => {
                console.log("게시물 작성중 오류발생");
                boardViewModal.style.display = "none";
              },
            });
          });
          const boardUpdate = document.createElement("div");
          boardUpdate.classList.add("board-view-btn");
          boardUpdate.innerText = "수정";

          const boardWriteTitle = document.getElementById("boardWriteTitle");
          // !게시물 수정
          boardUpdate.addEventListener("click", () => {
            boardViewModal.style.display = "none";
            document.body.style.overflow = "unset";
            boardViewTitleDetailAnswer.innerHTML = null;
            boardViewContentContent.innerHTML = null;
            boardViewContentText.innerHTML = null;
            boardViewContentContentComment.innerHTML = null;
            boardViewContentTextComment.innerHTML = null;
            ContentImgArea.style.display = "none";
            ContentImgArea.innerHTML = null;
            //? 상세보기 보기 display=none

            boardWriteModal.style.display = "flex";

            boardWriteTitle.innerHTML = "";
            // 작성 -> 수정
            // <p class="board-view-x-hidden">&times;</p>
            // <p>작성</p>
            // <p class="board-view-x" id="boardWriteX">&times;</p>
            const writeXHiddenP = document.createElement("P");
            const writeTittleP = document.createElement("P");
            const writeXP = document.createElement("P");

            writeXHiddenP.classList.add("board-view-x-hidden");
            writeXHiddenP.innerHTML = "&times;";
            writeTittleP.innerText = "문의 수정";
            writeXP.classList.add("board-view-x");
            writeXP.setAttribute("id", "boardWriteUpdateX");
            writeXP.innerHTML = "&times;";

            // 합치기
            boardWriteTitle.append(writeXHiddenP, writeTittleP, writeXP);

            // 수정중 X 누를때
            writeXP.addEventListener("click", () => {
              boardWriteModal.style.display = "none";
              location.reload();
            });

            // 수정될 제목
            boardTitle.innerHTML = QABoardDetail[0].boardTitle;
            boardContent.innerText = QABoardDetail[0].boardContent;

           //TODO : 이미지 불러오기 / 저장된 이미지

             //! 이미지 만드는 create작성해야함.
        if (QABoardDetail[0].imageList.length != 0) {
          boardViewContentImgArea.innerHTML ="";
          ContentImgArea.style.display = "flex";
          // <div class="board-view-content-img">
          //   <img src="../../resources/images/게시판테스트img1.jpg" alt="">
          // </div>
          console.log("이미지번호 : "+ QABoardDetail[0].imgNo);
          console.log("이미지길이 : "+QABoardDetail[0].imageList.length);


          for (let i = 0; i < QABoardDetail[0].imageList.length; i++) {
            //TODO 아마도 수정 필요
            if (i < 4) {
              
              const contentImgDiv = document.createElement("div");
              const contentImgImg = document.createElement("img");

              contentImgDiv.classList.add("board-view-content-img");
              contentImgImg.setAttribute("src", QABoardDetail[0].imageList[i].imgPath + "/" + QABoardDetail[0].imageList[i].imgRename);

              contentImgDiv.append(contentImgImg);
              boardViewContentImgArea.append(contentImgDiv);
            }
          }
        } else {
          ContentImgArea.style.display = "none";
        }

            //글 수정 완료 버튼
            const wirteUpdateBtn = document.getElementById("wirteUpdateBtn");

            wirteUpdateBtn.innerHTML = "";
            const QAupdateBtn = document.createElement("div");
            QAupdateBtn.setAttribute("class", "board-view-btn");
            QAupdateBtn.setAttribute("id", "boardUpdateInput");
            QAupdateBtn.innerText = "수정";

            wirteUpdateBtn.append(QAupdateBtn);
            const boardUpdateInput =
              document.getElementById("boardUpdateInput");
            // 수정 버튼 클릭 했을때
            boardUpdateInput.addEventListener("click", () => {
              console.log("수정버튼 눌림");
              $.ajax({
                url: "/QABoardUpdate",
                type: "GET",
                data: {
                  boardNo: boardListViewItems.lastElementChild.id,
                  boardContent: boardContent.value,
                  boardTitle: boardTitle.value,
                },
                dataType: "json",
                success: (result) => {
                  if (result > 0) {
                    // boardViewModal.style.display = "none";
                    alert("게시물 업데이트 완료");
                    location.reload();
                  } else {
                    alert("게시물 업데이트 실패");
                    location.reload();
                  }
                },
                error: () => {
                  alert("게시물 업데이트 중 오류");
                },
              });
            });
          });
          boardUpDel.append(boardUpdate, boardDelete);
        } else {
          boardUpDel.innerHTML = "";
        }
      },
      error: () => {
        console.log("실패");
      },
    });
  });
}

// 상세보기 X
boardViewX.addEventListener("click", () => {
  boardViewModal.style.display = "none";
  document.body.style.overflow = "unset";
  boardViewTitleDetailAnswer.innerHTML = null;
  boardViewContentContent.innerHTML = null;
  boardViewContentText.innerHTML = null;
  boardViewContentContentComment.innerHTML = null;
  boardViewContentTextComment.innerHTML = null;
  ContentImgArea.style.display = "none";
  ContentImgArea.innerHTML = null;
});
boardViewX.addEventListener("click", () => {
  boardViewModal.style.display = "none";
  document.body.style.overflow = "unset";
});
