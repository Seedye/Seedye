var mySwiper = new Swiper('.swiper-container', {
    navigation: {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next',
      
    },
  
    slidePerview : 1,
    spaceBetween : 50,
    centeredSlides: true,
    // slideOffsetBefore: 20,
    // slideOffsetAfter: 20
    
  });
  

  const boardNotice = document.getElementById("boardNotice");
  const update = document.getElementById("update");
  const freeBoard = document.getElementById("freeBoard");
  const question = document.getElementById("question");
const boardTest = document.getElementById("boardTest");
const swiperMain = document.getElementById("swiperMain");
const keyword = document.getElementById("keyword");
const search = document.getElementById("search");
const pageBtn = document.getElementsByClassName("pageBtn");
const searchBtn = document.getElementById("searchBtn");


let cp =1;
boardTest.style.display = "none";




// 공지사항 클릭
  boardNotice.addEventListener("click", ()=>{
    swiperMain.style.display = "none";
    boardTest.style.display = "block";
    
    selectBoardNotice(cp);
    
  });
  

  update.addEventListener("click", ()=>{
    swiperMain.style.display = "none"
    boardTest.style.display = "block";
    selectUpdateNotice(cp);

  });

  freeBoard.addEventListener("click", ()=>{
    swiperMain.style.display = "none";
    boardTest.style.display = "block";
    selectFreeboard(cp);
  });

  question.addEventListener("click", ()=>{
    swiperMain.style.display = "none";
    boardTest.style.display = "block";
    selectQuestion(cp);
  });

  

// 공지사항
function selectBoardNotice(cp){
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";
  
  
  if(keyword == ''){
    $.ajax({
      url:"/admin/selectBoardList",
      data:{"boardCode" : '1' , "cp" : cp},
      dataType : "JSON",
      success : (map) =>{

        console.log(boardCode);
        
        const boardList = map.boardList;
        const pagination = map.pagination;
            
        
        const totalCount = pagination.listCount;

        var pageSize = pagination.pageSize;
        var totalPages = 0;
        var curPage = cp;

        for(let board of boardList){

          const tr = document.createElement("tr");

          // 게시글 번호
          const td1 = document.createElement("td");
          td1.innerText = board.boardNo;

          // 제목
          const td2 = document.createElement("td");
          td2.innerText = board.boardTitle;
          
          // 작성자
          const td3 = document.createElement("td");
          td3.innerText = board.memberId;
          
          // 조회수
          const td4 = document.createElement("td");
          td4.innerText = board.readCount
          
          // 등록일
          const td5 = document.createElement("td");
          td5.innerText = board.createDate
          
          // 관리
          const td6 = document.createElement("td");
          td6.innerHTML = "<button class='board-list-view' type='button'>관리</button>"

          tr.append(td1, td2, td3, td4, td5, td6);

          tbody.append(tr);


          searchBtn.addEventListener("click", ()=>{
            selectBoardNotice(cp);
          })

          const paginationMenu = document.getElementsByClassName("pagination")[0];
          // 페이지네이션
          if (totalCount != 0) {
              totalPages = Math.ceil(totalCount / pageSize);

          
              paginationMenu.innerHTML = "";

              paginationMenu.innerHTML = pageLink(curPage, totalPages);
          }    
          // cp 얻어오기


          $(".pageBtn").click(function(){



              var id_check = $(this).attr("id");
              
              cp = id_check;
              
              if(id_check != null) {
                selectBoardNotice(cp);
                $(this)[0].classList.add("fontColor");
            } else{
                $(this)[0].classList.remove("fontColor");

            }

              

          })
                  

          $(".pageFirst").click(function(){
                  
              cp = 1;

              selectBoardNotice(cp);
              swiperMain.style.display = "none";

          })
          $(".pagePrev").click(function(){
              
              cp = pagination.prevPage;

              selectBoardNotice(cp);
          })
          $(".pageNext").click(function(){
              
              cp = pagination.nextPage;

              selectBoardNotice(cp);
          })
          $(".pageLast").click(function(){
              
              cp = pagination.maxPage;

              selectBoardNotice(cp);
          })

          searchBtn.addEventListener("click", ()=>{
            cp=curPage;
            selectBoardNotice(cp);
          })
         
         
          const boardManageBtn = document.getElementsByClassName("board-list-view");

          for(let boardItems of document.querySelectorAll("#tbody")){

            boardItems.lastElementChild.lastElementChild.addEventListener("click", (e)=>{

              let dv = e.currentTarget;


              // 선택한 관리버튼의 회원번호
              tempNo = dv.parentElement.firstElementChild.innerText;

              
              boardViewModal.style.display = "flex";

              $.ajax({
                url: "/QABoardDetail",
                type: "POST",
                data: { boardNo:  tempNo },
                dataType: "json",
                success: (QABoardDetail) => {
                  // console.log(QABoardDetail);
                  // console.log(QABoardDetail[0].commentCreateDate);
          
                  if(QABoardDetail[0].commentContent){
          
                    var saveCommentContent = QABoardDetail[0].commentContent.replaceAll("<br>", "\n");
                  }
                  if(QABoardDetail[0].boardContent){
                    var saveContent = QABoardDetail[0].boardContent.replaceAll("<br>", "\n");
          
                  }
                  // saveCommentContent = saveCommentContent.replaceAll("<br>", "\n");
                  
                  // saveContent = saveContent.replaceAll("<br>", "\n");
                  
                  // console.log("여기서도 당연히 나오겠지?:"+saveCommentContent);
          
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
          
                  // console.log("관리자 인가요? : "+loginMemberAuthority);
                  // 답변 내용 생성 P
                  const QAContentCommentP = document.createElement("p");
          
                  QATitleP.innerText = QABoardDetail[0].boardTitle;
                  QATextP.innerText = "문의 내용";
                  QAIDAndDateP.innerText =
                  QABoardDetail[0].memberId + " / " + QABoardDetail[0].createDate;
          
                  
                  QAContentP.innerText = saveContent;
          
                  QATextCommentP.innerText = "답변";
          
                  // 답변이 들어가 있을때
                  // console.log("답변이 들어가 있을 뗀테"+saveCommentContent);
                  if (saveCommentContent != null) {
          
                    // 관리자가 로그인 했을 때
                    if(loginMemberAuthority== 2){
                      QAIDAndDateCommentP.innerText = "";
                      const commentTextarea= document.createElement("textarea");
                      commentTextarea.setAttribute("id", "commentContent");
                      
                      commentTextarea.innerText = saveCommentContent;
                      boardViewContentTextComment.append(commentTextarea);
          
                    }else{ // 일반인 로그인 일때
                      QAIDAndDateCommentP.innerText = QABoardDetail[0].commentCreateDate;
                      QAContentCommentP.innerText = saveCommentContent;
                      boardViewContentTextComment.append(QAContentCommentP);
                    }
          
                  } else { // 답변없을 때
          
                    if(loginMemberAuthority== 2){ // 관리자일때
                      QAIDAndDateCommentP.innerText = "";
                      const commentTextarea= document.createElement("textarea");
                      commentTextarea.setAttribute("id", "commentContent");
                      // commentTextarea.classList.add("")
                      boardViewContentTextComment.append(commentTextarea);
          
                     
                    }else{ // 일반일일때
                      QAContentCommentP.innerText =
                      "**** 답변 준비중입니다 (　-̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥᷄ _ -̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥᷅ ) ****";
                      boardViewContentTextComment.append(QAContentCommentP);
                    }
                  }
          
                  boardViewTitleDetailAnswer.append(QATitleP);
                  boardViewContentContent.append(QATextP, QAIDAndDateP);
                  boardViewContentText.append(QAContentP);
          
                  boardViewContentContentComment.append(
                    QATextCommentP,
                    QAIDAndDateCommentP
                  );
          
                  // console.log(
                  //   "이미지 리스트 길이 출력 : " + QABoardDetail[0].imageList.length
                  // );
                  //! 이미지 만드는 create작성해야함.
                  if (QABoardDetail[0].imageList.length != 0) {
                    ContentImgArea.style.display = "flex";
                    // <div class="board-view-content-img">
                    //   <img src="../../resources/images/게시판테스트img1.jpg" alt="">
                    // </div>
                    // console.log(QABoardDetail[0].imgNo);
                    // console.log(QABoardDetail[0].imageList.length);
          
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
          
                  if (boardUpDel.id == QABoardDetail[0].memberId || loginMemberAuthority== 2) {
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
                          // console.log("게시물 작성중 오류발생");
                          boardViewModal.style.display = "none";
                        },
                      });
                    });
          
                    const boardUpdate = document.createElement("div");
                    boardUpdate.classList.add("board-view-btn");
                    if(loginMemberAuthority ==2) {
          
                      boardUpdate.innerText = "답변 저장";
          
                      boardUpdate.addEventListener("click",()=>{
          
                        // console.log("코멘트?:"+saveCommentContent);
          
          
                        if(saveCommentContent != null){
                          // console.log("값이 들어가 있음");
                          // console.log("작성된 코멘트값 : "+commentContent.value);                
                            $.ajax({
                              url:"/comment/update",
                              data : {"commentNo" :QABoardDetail[0].commentNo,
                                      "commentContent" : commentContent.value},
                              type : "post",
                              success : function(result) {
          
                                  if(result > 0) {
                                      alert("답변 수정 완료");
          
                                      // freeBoardDetailAnwserContent.innerHTML = "";
                                      
                                      // commentListFun();
                                      location.reload();
          
                                  }else {
                                      alert("답변 수정 실패")
                                  }
                              },
                              error : function(req, status, error){
          
                                  // console.log("답변 수정 중 오류");
                                  // console.log(req.responseText);
                              }
                      
                          });
                        }else{
                          // console.log(comment.commentNo);
                          $.ajax({
                            url : "/comment/insert",
                              data : {"commentContent" :commentContent.value,
                                      "memberNo" : '1',
                                      "boardNo" : tempNo},
                              type : "post",
                              success : function(result) {
                                  if (result > 0){
                                      alert("답변 등록 완료")
                                      location.reload();
          
                                  } else{
                                      alert("답변 실패");
                                  }
          
                              },
          
                              error : () => {
                                  // console.log("답변 등록 중 오류");
                                  alert("답변 등록 중 오류발생");
                              }
                        });
                      }
                    });
                    boardUpDel.append(boardUpdate, boardDelete);
                    }else{
                      
                      boardUpdate.innerText = "수정";
          
          
                      const boardWriteTitle = document.getElementById("boardWriteTitle");
                      // !게시물 수정
                      boardUpdate.addEventListener("click", () => {
                        boardViewModal.style.display = "none";
                        // document.body.style.overflow = "unset";
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
                        boardContent.innerHTML = saveContent;
            
                       //TODO : 이미지 불러오기 / 저장된 이미지
            
                         //! 이미지 만드는 create작성해야함.
                    if (QABoardDetail[0].imageList.length != 0) {
                      boardViewContentImgArea.innerHTML ="";
                      ContentImgArea.style.display = "flex";
                      // <div class="board-view-content-img">
                      //   <img src="../../resources/images/게시판테스트img1.jpg" alt="">
                      // </div>
                      // console.log("이미지번호 : "+ QABoardDetail[0].imgNo);
                      // console.log("이미지길이 : "+QABoardDetail[0].imageList.length);
            
            
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
                          // console.log("수정버튼 눌림");
                          $.ajax({
                            url: "/QABoardUpdate",
                            type: "GET",
                            data: {
                              boardNo: tempNo,
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
                    }
          
                  } else {
                    boardUpDel.innerHTML = "";
                  }
                },
                error: () => {
                  // console.log("실패");
                  alert("게시물 업데이트 중 오류 발생");
                },
              });
          })

        }
        }
      },
      error:()=>{
        console.log("실패")
      }

      
    }) 
  } else {
    $.ajax({
      url:"/admin/selectBoardList",
      data:{"boardCode" : '1' , "cp" : cp, "search" : search.value, "keyword":keyword.value},
      dataType : "JSON",
      success : (map) =>{

        tbody.innerHTML = "";
        
        const boardList = map.boardList;
        const pagination = map.pagination;
            
        
        const totalCount = pagination.listCount;

        var pageSize = pagination.pageSize;
        var totalPages = 0;
        var curPage = cp;

        for(let board of boardList){

          const tr = document.createElement("tr");

          // 게시글 번호
          const td1 = document.createElement("td");
          td1.innerText = board.boardNo;

          // 제목
          const td2 = document.createElement("td");
          td2.innerText = board.boardTitle;
          
          // 작성자
          const td3 = document.createElement("td");
          td3.innerText = board.memberId;
          
          // 조회수
          const td4 = document.createElement("td");
          td4.innerText = board.readCount
          
          // 등록일
          const td5 = document.createElement("td");
          td5.innerText = board.createDate
          
          // 관리
          const td6 = document.createElement("td");
          td6.innerHTML = "<button class='board-list-view' type='button'>관리</button>"

          tr.append(td1, td2, td3, td4, td5, td6);

          tbody.append(tr);

          const paginationMenu = document.getElementsByClassName("pagination")[0];
          // 페이지네이션
          if (totalCount != 0) {
              totalPages = Math.ceil(totalCount / pageSize);

          
              paginationMenu.innerHTML = "";

              paginationMenu.innerHTML = pageLink(curPage, totalPages);
          }    
          // cp 얻어오기

          $(".pageBtn").click(function(){

              var id_check = $(this).attr("id");
              
              cp = id_check;
              
              if(id_check != null) {
                selectBoardNotice(cp);
                $(this)[0].classList.add("fontColor");
            } else{
                $(this)[0].classList.remove("fontColor");

            }


          })
                  

          $(".pageFirst").click(function(){
                  
              cp = 1;

              selectBoardNotice(cp);
          })
          $(".pagePrev").click(function(){
              
              cp = pagination.prevPage;

              selectBoardNotice(cp);
          })
          $(".pageNext").click(function(){
              
              cp = pagination.nextPage;

              selectBoardNotice(cp);
          })
          $(".pageLast").click(function(){
              
              cp = pagination.maxPage;

              selectBoardNotice(cp);
          })
          searchBtn.addEventListener("click", ()=>{
            cp=curPage;
            selectBoardNotice(cp);
          })

          
          const boardManageBtn = document.getElementsByClassName("board-list-view");

          for(let boardItems of document.querySelectorAll("#tbody")){

            boardItems.lastElementChild.lastElementChild.addEventListener("click", (e)=>{

              let dv = e.currentTarget;


              // 선택한 관리버튼의 회원번호
              tempNo = dv.parentElement.firstElementChild.innerText;

              boardViewModal.style.display = "flex";

              $.ajax({
                url: "/QABoardDetail",
                type: "POST",
                data: { boardNo: tempNo },
                dataType: "json",
                success: (QABoardDetail) => {
                  // console.log(QABoardDetail);
                  // console.log(QABoardDetail[0].commentCreateDate);

                  if(QABoardDetail[0].commentContent){

                    var saveCommentContent = QABoardDetail[0].commentContent.replaceAll("<br>", "\n");
                  }
                  if(QABoardDetail[0].boardContent){
                    var saveContent = QABoardDetail[0].boardContent.replaceAll("<br>", "\n");

                  }
                  // saveCommentContent = saveCommentContent.replaceAll("<br>", "\n");
                  
                  // saveContent = saveContent.replaceAll("<br>", "\n");
                  
                  // console.log("여기서도 당연히 나오겠지?:"+saveCommentContent);

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

                  // console.log("관리자 인가요? : "+loginMemberAuthority);
                  // 답변 내용 생성 P
                  const QAContentCommentP = document.createElement("p");

                  QATitleP.innerText = QABoardDetail[0].boardTitle;
                  QATextP.innerText = "문의 내용";
                  QAIDAndDateP.innerText =
                  QABoardDetail[0].memberId + " / " + QABoardDetail[0].createDate;

                  
                  QAContentP.innerText = saveContent;

                  QATextCommentP.innerText = "답변";

                  // 답변이 들어가 있을때
                  // console.log("답변이 들어가 있을 뗀테"+saveCommentContent);
                  if (saveCommentContent != null) {

                    // 관리자가 로그인 했을 때
                    if(loginMemberAuthority== 2){
                      QAIDAndDateCommentP.innerText = "";
                      const commentTextarea= document.createElement("textarea");
                      commentTextarea.setAttribute("id", "commentContent");
                      
                      commentTextarea.innerText = saveCommentContent;
                      boardViewContentTextComment.append(commentTextarea);

                    }else{ // 일반인 로그인 일때
                      QAIDAndDateCommentP.innerText = QABoardDetail[0].commentCreateDate;
                      QAContentCommentP.innerText = saveCommentContent;
                      boardViewContentTextComment.append(QAContentCommentP);
                    }

                  } else { // 답변없을 때

                    if(loginMemberAuthority== 2){ // 관리자일때
                      QAIDAndDateCommentP.innerText = "";
                      const commentTextarea= document.createElement("textarea");
                      commentTextarea.setAttribute("id", "commentContent");
                      // commentTextarea.classList.add("")
                      boardViewContentTextComment.append(commentTextarea);

                    
                    }else{ // 일반일일때
                      QAContentCommentP.innerText =
                      "**** 답변 준비중입니다 (　-̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥᷄ _ -̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥᷅ ) ****";
                      boardViewContentTextComment.append(QAContentCommentP);
                    }
                  }

                  boardViewTitleDetailAnswer.append(QATitleP);
                  boardViewContentContent.append(QATextP, QAIDAndDateP);
                  boardViewContentText.append(QAContentP);

                  boardViewContentContentComment.append(
                    QATextCommentP,
                    QAIDAndDateCommentP
                  );

                  // console.log(
                  //   "이미지 리스트 길이 출력 : " + QABoardDetail[0].imageList.length
                  // );
                  //! 이미지 만드는 create작성해야함.
                  if (QABoardDetail[0].imageList.length != 0) {
                    ContentImgArea.style.display = "flex";
                    // <div class="board-view-content-img">
                    //   <img src="../../resources/images/게시판테스트img1.jpg" alt="">
                    // </div>
                    // console.log(QABoardDetail[0].imgNo);
                    // console.log(QABoardDetail[0].imageList.length);

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

                  if (boardUpDel.id == QABoardDetail[0].memberId || loginMemberAuthority== 2) {
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
                          // console.log("게시물 작성중 오류발생");
                          boardViewModal.style.display = "none";
                        },
                      });
                    });

                    const boardUpdate = document.createElement("div");
                    boardUpdate.classList.add("board-view-btn");
                    if(loginMemberAuthority ==2) {

                      boardUpdate.innerText = "답변 저장";

                      boardUpdate.addEventListener("click",()=>{

                        // console.log("코멘트?:"+saveCommentContent);


                        if(saveCommentContent != null){
                          // console.log("값이 들어가 있음");
                          // console.log("작성된 코멘트값 : "+commentContent.value);                
                            $.ajax({
                              url:"/comment/update",
                              data : {"commentNo" :QABoardDetail[0].commentNo,
                                      "commentContent" : commentContent.value},
                              type : "post",
                              success : function(result) {

                                  if(result > 0) {
                                      alert("답변 수정 완료");

                                      // freeBoardDetailAnwserContent.innerHTML = "";
                                      
                                      // commentListFun();
                                      location.reload();

                                  }else {
                                      alert("답변 수정 실패")
                                  }
                              },
                              error : function(req, status, error){

                                  // console.log("답변 수정 중 오류");
                                  // console.log(req.responseText);
                              }
                      
                          });
                        }else{
                          // console.log(comment.commentNo);
                          $.ajax({
                            url : "/comment/insert",
                              data : {"commentContent" :commentContent.value,
                                      "memberNo" : '1',
                                      "boardNo" : tempNo},
                              type : "post",
                              success : function(result) {
                                  if (result > 0){
                                      alert("답변 등록 완료")
                                      location.reload();

                                  } else{
                                      alert("답변 실패");
                                  }

                              },

                              error : () => {
                                  // console.log("답변 등록 중 오류");
                                  alert("답변 등록 중 오류발생");
                              }
                        });
                      }
                    });
                    boardUpDel.append(boardUpdate, boardDelete);
                    }else{
                      
                      boardUpdate.innerText = "수정";


                      const boardWriteTitle = document.getElementById("boardWriteTitle");
                      // !게시물 수정
                      boardUpdate.addEventListener("click", () => {
                        boardViewModal.style.display = "none";
                        // document.body.style.overflow = "unset";
                        boardViewTitleDetailAnswer.innerHTML = null;
                        boardViewContentContent.innerHTML = null;
                        boardViewContentText.innerHTML = null;
                        boardViewContentContentComment.innerHTML = null;
                        boardViewContentTextComment.innerHTML = null;
                        ContentImgArea.style.display = "none";
                        ContentImgArea.innerHTML = null;
                        //? 상세보기 보기 display=none

                        TempContent = boardContent.innerHTML;
                        
            
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
                        boardContent.innerText  = TempContent.replaceAll("<br>", "\n");
            
                      //TODO : 이미지 불러오기 / 저장된 이미지
            
                        //! 이미지 만드는 create작성해야함.
                    if (QABoardDetail[0].imageList.length != 0) {
                      boardViewContentImgArea.innerHTML ="";
                      ContentImgArea.style.display = "flex";
                      // <div class="board-view-content-img">
                      //   <img src="../../resources/images/게시판테스트img1.jpg" alt="">
                      // </div>
                      // console.log("이미지번호 : "+ QABoardDetail[0].imgNo);
                      // console.log("이미지길이 : "+QABoardDetail[0].imageList.length);
            
            
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
                          // console.log("수정버튼 눌림");
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
                    }

                  } else {
                    boardUpDel.innerHTML = "";
                  }
                },
                error: () => {
                  // console.log("실패");
                  alert("게시물 업데이트 중 오류 발생");
                },
              });
            })
          }



        }
      
        },
      error:()=>{
        console.log("실패")
      }

      
    }) 
  }  
}





  
// 업데이트
function selectUpdateNotice(cp){
  const tbody = document.getElementById("tbody");
  
  if(keyword.value == ''){
    $.ajax({
      url:"/admin/selectBoardList",
      data:{"boardCode" : '2', "cp":cp},
      dataType : "JSON",
    success : (map) =>{
      tbody.innerHTML = "";

      const boardList = map.boardList;
      const pagination = map.pagination;
          
      
      const totalCount = pagination.listCount;

      var pageSize = pagination.pageSize;
      var totalPages = 0;
      var curPage = cp;


      for(let board of boardList){

        const tr = document.createElement("tr");

        // 게시글 번호
        const td1 = document.createElement("td");
        td1.innerText = board.boardNo;

        // 제목
        const td2 = document.createElement("td");
        td2.innerText = board.boardTitle;
        
        // 작성자
        const td3 = document.createElement("td");
        td3.innerText = board.memberId;
        
        // 조회수
        const td4 = document.createElement("td");
        td4.innerText = board.readCount
        
        // 등록일
        const td5 = document.createElement("td");
        td5.innerText = board.createDate
        
        // 관리
        const td6 = document.createElement("td");
        td6.innerHTML = "<button class='board-list-view' type='button'>관리</button>"

        tr.append(td1, td2, td3, td4, td5, td6);

        tbody.append(tr);

        const paginationMenu = document.getElementsByClassName("pagination")[0];
        // 페이지네이션
        if (totalCount != 0) {
            totalPages = Math.ceil(totalCount / pageSize);

        
            paginationMenu.innerHTML = "";

            paginationMenu.innerHTML = pageLink(curPage, totalPages);
        }
        $(".pageBtn").click(function(){

          var id_check = $(this).attr("id");
          
          cp = id_check;
          
          if(id_check != null) {
            selectUpdateNotice(cp);
            $(this)[0].classList.add("fontColor");
        } else{
            $(this)[0].classList.remove("fontColor");

        }


      })
               

      $(".pageFirst").click(function(){
              
          cp = 1;

          selectUpdateNotice(cp);
      })
      $(".pagePrev").click(function(){
          
          cp = pagination.prevPage;

          selectUpdateNotice(cp);
      })
      $(".pageNext").click(function(){
          
          cp = pagination.nextPage;

          selectUpdateNotice(cp);
      })
      $(".pageLast").click(function(){
          
          cp = pagination.maxPage;

          selectUpdateNotice(cp);
      })

          searchBtn.addEventListener("click", ()=>{
            selectUpdateNotice(cp);
          })

          
const boardManageBtn = document.getElementsByClassName("board-list-view");

for(let boardItems of document.querySelectorAll("#tbody")){

  boardItems.lastElementChild.lastElementChild.addEventListener("click", (e)=>{

    let dv = e.currentTarget;


    // 선택한 관리버튼의 회원번호
    tempNo = dv.parentElement.firstElementChild.innerText;

    boardViewModal.style.display = "flex";
  
  $.ajax({
    url: "/QABoardDetail",
    type: "POST",
    data: { boardNo: tempNo },
    dataType: "json",
    success: (QABoardDetail) => {
      // console.log(QABoardDetail);
      // console.log(QABoardDetail[0].commentCreateDate);

      if(QABoardDetail[0].commentContent){

        var saveCommentContent = QABoardDetail[0].commentContent.replaceAll("<br>", "\n");
      }
      if(QABoardDetail[0].boardContent){
        var saveContent = QABoardDetail[0].boardContent.replaceAll("<br>", "\n");

      }
      // saveCommentContent = saveCommentContent.replaceAll("<br>", "\n");
      
      // saveContent = saveContent.replaceAll("<br>", "\n");
      
      // console.log("여기서도 당연히 나오겠지?:"+saveCommentContent);

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

      // console.log("관리자 인가요? : "+loginMemberAuthority);
      // 답변 내용 생성 P
      const QAContentCommentP = document.createElement("p");

      QATitleP.innerText = QABoardDetail[0].boardTitle;
      QATextP.innerText = "문의 내용";
      QAIDAndDateP.innerText =
      QABoardDetail[0].memberId + " / " + QABoardDetail[0].createDate;

      
      QAContentP.innerText = saveContent;

      QATextCommentP.innerText = "답변";

      // 답변이 들어가 있을때
      // console.log("답변이 들어가 있을 뗀테"+saveCommentContent);
      if (saveCommentContent != null) {

        // 관리자가 로그인 했을 때
        if(loginMemberAuthority== 2){
          QAIDAndDateCommentP.innerText = "";
          const commentTextarea= document.createElement("textarea");
          commentTextarea.setAttribute("id", "commentContent");
          
          commentTextarea.innerText = saveCommentContent;
          boardViewContentTextComment.append(commentTextarea);

        }else{ // 일반인 로그인 일때
          QAIDAndDateCommentP.innerText = QABoardDetail[0].commentCreateDate;
          QAContentCommentP.innerText = saveCommentContent;
          boardViewContentTextComment.append(QAContentCommentP);
        }

      } else { // 답변없을 때

        if(loginMemberAuthority== 2){ // 관리자일때
          QAIDAndDateCommentP.innerText = "";
          const commentTextarea= document.createElement("textarea");
          commentTextarea.setAttribute("id", "commentContent");
          // commentTextarea.classList.add("")
          boardViewContentTextComment.append(commentTextarea);

         
        }else{ // 일반일일때
          QAContentCommentP.innerText =
          "**** 답변 준비중입니다 (　-̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥᷄ _ -̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥᷅ ) ****";
          boardViewContentTextComment.append(QAContentCommentP);
        }
      }

      boardViewTitleDetailAnswer.append(QATitleP);
      boardViewContentContent.append(QATextP, QAIDAndDateP);
      boardViewContentText.append(QAContentP);

      boardViewContentContentComment.append(
        QATextCommentP,
        QAIDAndDateCommentP
      );

      // console.log(
      //   "이미지 리스트 길이 출력 : " + QABoardDetail[0].imageList.length
      // );
      //! 이미지 만드는 create작성해야함.
      if (QABoardDetail[0].imageList.length != 0) {
        ContentImgArea.style.display = "flex";
        // <div class="board-view-content-img">
        //   <img src="../../resources/images/게시판테스트img1.jpg" alt="">
        // </div>
        // console.log(QABoardDetail[0].imgNo);
        // console.log(QABoardDetail[0].imageList.length);

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

      if (boardUpDel.id == QABoardDetail[0].memberId || loginMemberAuthority== 2) {
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
              // console.log("게시물 작성중 오류발생");
              boardViewModal.style.display = "none";
            },
          });
        });

        const boardUpdate = document.createElement("div");
        boardUpdate.classList.add("board-view-btn");
        if(loginMemberAuthority ==2) {

          boardUpdate.innerText = "답변 저장";

          boardUpdate.addEventListener("click",()=>{

            // console.log("코멘트?:"+saveCommentContent);


            if(saveCommentContent != null){
              // console.log("값이 들어가 있음");
              // console.log("작성된 코멘트값 : "+commentContent.value);                
                $.ajax({
                  url:"/comment/update",
                  data : {"commentNo" :QABoardDetail[0].commentNo,
                          "commentContent" : commentContent.value},
                  type : "post",
                  success : function(result) {

                      if(result > 0) {
                          alert("답변 수정 완료");

                          // freeBoardDetailAnwserContent.innerHTML = "";
                          
                          // commentListFun();
                          location.reload();

                      }else {
                          alert("답변 수정 실패")
                      }
                  },
                  error : function(req, status, error){

                      // console.log("답변 수정 중 오류");
                      // console.log(req.responseText);
                  }
          
              });
            }else{
              // console.log(comment.commentNo);
              $.ajax({
                url : "/comment/insert",
                  data : {"commentContent" :commentContent.value,
                          "memberNo" : '1',
                          "boardNo" : tempNo},
                  type : "post",
                  success : function(result) {
                      if (result > 0){
                          alert("답변 등록 완료")
                          location.reload();

                      } else{
                          alert("답변 실패");
                      }

                  },

                  error : () => {
                      // console.log("답변 등록 중 오류");
                      alert("답변 등록 중 오류발생");
                  }
            });
          }
        });
        boardUpDel.append(boardUpdate, boardDelete);
        }else{
          
          boardUpdate.innerText = "수정";


          const boardWriteTitle = document.getElementById("boardWriteTitle");
          // !게시물 수정
          boardUpdate.addEventListener("click", () => {
            boardViewModal.style.display = "none";
            // document.body.style.overflow = "unset";
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
            boardContent.innerText = saveContent;

           //TODO : 이미지 불러오기 / 저장된 이미지

             //! 이미지 만드는 create작성해야함.
        if (QABoardDetail[0].imageList.length != 0) {
          boardViewContentImgArea.innerHTML ="";
          ContentImgArea.style.display = "flex";
          // <div class="board-view-content-img">
          //   <img src="../../resources/images/게시판테스트img1.jpg" alt="">
          // </div>
          // console.log("이미지번호 : "+ QABoardDetail[0].imgNo);
          // console.log("이미지길이 : "+QABoardDetail[0].imageList.length);


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
              // console.log("수정버튼 눌림");
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
        }

      } else {
        boardUpDel.innerHTML = "";
      }
    },
    error: () => {
      // console.log("실패");
      alert("게시물 업데이트 중 오류 발생");
    },
  });
})
    
}



    }
    },
    error:()=>{
      console.log("실패")
    }

    
    })
  } else{
    $.ajax({
      url:"/admin/selectBoardList",
      data:{"boardCode" : '2', "cp":cp, "search":search.value, "keyword":keyword.value},
      dataType : "JSON",
      success : (map) =>{
        tbody.innerHTML = "";


        const boardList = map.boardList;
        const pagination = map.pagination;
            
        
        const totalCount = pagination.listCount;

        var pageSize = pagination.pageSize;
        var totalPages = 0;
        var curPage = cp;
  
        for(let board of boardList){
  
          const tr = document.createElement("tr");
  
          // 게시글 번호
          const td1 = document.createElement("td");
          td1.innerText = board.boardNo;
  
          // 제목
          const td2 = document.createElement("td");
          td2.innerText = board.boardTitle;
          
          // 작성자
          const td3 = document.createElement("td");
          td3.innerText = board.memberId;
          
          // 조회수
          const td4 = document.createElement("td");
          td4.innerText = board.readCount
          
          // 등록일
          const td5 = document.createElement("td");
          td5.innerText = board.createDate
          
          // 관리
          const td6 = document.createElement("td");
          td6.innerHTML = "<button class='board-list-view'>관리</button>"
  
          tr.append(td1, td2, td3, td4, td5, td6);
  
          tbody.append(tr);
  
          const paginationMenu = document.getElementsByClassName("pagination")[0];
          // 페이지네이션
          if (totalCount != 0) {
              totalPages = Math.ceil(totalCount / pageSize);
  
          
              paginationMenu.innerHTML = "";
  
              paginationMenu.innerHTML = pageLink(curPage, totalPages);
          }
          $(".pageBtn").click(function(){
  
            var id_check = $(this).attr("id");
            
            cp = id_check;
            
            if(id_check != null) {
              selectUpdateNotice(cp);
              $(this)[0].classList.add("fontColor");
          } else{
              $(this)[0].classList.remove("fontColor");

          }

  
        })
                 
  
        $(".pageFirst").click(function(){
                
            cp = 1;
  
            selectUpdateNotice(cp);
        })
        $(".pagePrev").click(function(){
            
            cp = pagination.prevPage;
  
            selectUpdateNotice(cp);
        })
        $(".pageNext").click(function(){
            
            cp = pagination.nextPage;
  
            selectUpdateNotice(cp);
        })
        $(".pageLast").click(function(){
            
            cp = pagination.maxPage;
  
            selectUpdateNotice(cp);
        })

        searchBtn.addEventListener("click", ()=>{
          selectUpdateNotice(cp);
        })

        
const boardManageBtn = document.getElementsByClassName("board-list-view");

for(let boardItems of document.querySelectorAll("#tbody")){

  boardItems.lastElementChild.lastElementChild.addEventListener("click", (e)=>{

    let dv = e.currentTarget;


    // 선택한 관리버튼의 회원번호
    tempNo = dv.parentElement.firstElementChild.innerText;

    boardViewModal.style.display = "flex";

    $.ajax({
      url: "/QABoardDetail",
      type: "POST",
      data: { boardNo: tempNo},
      dataType: "json",
      success: (QABoardDetail) => {
        // console.log(QABoardDetail);
        // console.log(QABoardDetail[0].commentCreateDate);

        if(QABoardDetail[0].commentContent){

          var saveCommentContent = QABoardDetail[0].commentContent.replaceAll("<br>", "\n");
        }
        if(QABoardDetail[0].boardContent){
          var saveContent = QABoardDetail[0].boardContent.replaceAll("<br>", "\n");

        }
        // saveCommentContent = saveCommentContent.replaceAll("<br>", "\n");
        
        // saveContent = saveContent.replaceAll("<br>", "\n");
        
        // console.log("여기서도 당연히 나오겠지?:"+saveCommentContent);

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

        // console.log("관리자 인가요? : "+loginMemberAuthority);
        // 답변 내용 생성 P
        const QAContentCommentP = document.createElement("p");

        QATitleP.innerText = QABoardDetail[0].boardTitle;
        QATextP.innerText = "문의 내용";
        QAIDAndDateP.innerText =
        QABoardDetail[0].memberId + " / " + QABoardDetail[0].createDate;

        
        QAContentP.innerText = saveContent;

        QATextCommentP.innerText = "답변";

        // 답변이 들어가 있을때
        // console.log("답변이 들어가 있을 뗀테"+saveCommentContent);
        if (saveCommentContent != null) {

          // 관리자가 로그인 했을 때
          if(loginMemberAuthority== 2){
            QAIDAndDateCommentP.innerText = "";
            const commentTextarea= document.createElement("textarea");
            commentTextarea.setAttribute("id", "commentContent");
            
            commentTextarea.innerText = saveCommentContent;
            boardViewContentTextComment.append(commentTextarea);

          }else{ // 일반인 로그인 일때
            QAIDAndDateCommentP.innerText = QABoardDetail[0].commentCreateDate;
            QAContentCommentP.innerText = saveCommentContent;
            boardViewContentTextComment.append(QAContentCommentP);
          }

        } else { // 답변없을 때

          if(loginMemberAuthority== 2){ // 관리자일때
            QAIDAndDateCommentP.innerText = "";
            const commentTextarea= document.createElement("textarea");
            commentTextarea.setAttribute("id", "commentContent");
            // commentTextarea.classList.add("")
            boardViewContentTextComment.append(commentTextarea);

           
          }else{ // 일반일일때
            QAContentCommentP.innerText =
            "**** 답변 준비중입니다 (　-̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥᷄ _ -̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥᷅ ) ****";
            boardViewContentTextComment.append(QAContentCommentP);
          }
        }

        boardViewTitleDetailAnswer.append(QATitleP);
        boardViewContentContent.append(QATextP, QAIDAndDateP);
        boardViewContentText.append(QAContentP);

        boardViewContentContentComment.append(
          QATextCommentP,
          QAIDAndDateCommentP
        );

        // console.log(
        //   "이미지 리스트 길이 출력 : " + QABoardDetail[0].imageList.length
        // );
        //! 이미지 만드는 create작성해야함.
        if (QABoardDetail[0].imageList.length != 0) {
          ContentImgArea.style.display = "flex";
          // <div class="board-view-content-img">
          //   <img src="../../resources/images/게시판테스트img1.jpg" alt="">
          // </div>
          // console.log(QABoardDetail[0].imgNo);
          // console.log(QABoardDetail[0].imageList.length);

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

        if (boardUpDel.id == QABoardDetail[0].memberId || loginMemberAuthority== 2) {
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
                // console.log("게시물 작성중 오류발생");
                boardViewModal.style.display = "none";
              },
            });
          });

          const boardUpdate = document.createElement("div");
          boardUpdate.classList.add("board-view-btn");
          if(loginMemberAuthority ==2) {

            boardUpdate.innerText = "답변 저장";

            boardUpdate.addEventListener("click",()=>{

              // console.log("코멘트?:"+saveCommentContent);


              if(saveCommentContent != null){
                // console.log("값이 들어가 있음");
                // console.log("작성된 코멘트값 : "+commentContent.value);                
                  $.ajax({
                    url:"/comment/update",
                    data : {"commentNo" :QABoardDetail[0].commentNo,
                            "commentContent" : commentContent.value},
                    type : "post",
                    success : function(result) {

                        if(result > 0) {
                            alert("답변 수정 완료");

                            // freeBoardDetailAnwserContent.innerHTML = "";
                            
                            // commentListFun();
                            location.reload();

                        }else {
                            alert("답변 수정 실패")
                        }
                    },
                    error : function(req, status, error){

                        // console.log("답변 수정 중 오류");
                        // console.log(req.responseText);
                    }
            
                });
              }else{
                // console.log(comment.commentNo);
                $.ajax({
                  url : "/comment/insert",
                    data : {"commentContent" :commentContent.value,
                            "memberNo" : '1',
                            "boardNo" : tempNo},
                    type : "post",
                    success : function(result) {
                        if (result > 0){
                            alert("답변 등록 완료")
                            location.reload();

                        } else{
                            alert("답변 실패");
                        }

                    },

                    error : () => {
                        // console.log("답변 등록 중 오류");
                        alert("답변 등록 중 오류발생");
                    }
              });
            }
          });
          boardUpDel.append(boardUpdate, boardDelete);
          }else{
            
            boardUpdate.innerText = "수정";


            const boardWriteTitle = document.getElementById("boardWriteTitle");
            // !게시물 수정
            boardUpdate.addEventListener("click", () => {
              boardViewModal.style.display = "none";
              // document.body.style.overflow = "unset";
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
              boardContent.innerText = saveContent;
  
             //TODO : 이미지 불러오기 / 저장된 이미지
  
               //! 이미지 만드는 create작성해야함.
          if (QABoardDetail[0].imageList.length != 0) {
            boardViewContentImgArea.innerHTML ="";
            ContentImgArea.style.display = "flex";
            // <div class="board-view-content-img">
            //   <img src="../../resources/images/게시판테스트img1.jpg" alt="">
            // </div>
            // console.log("이미지번호 : "+ QABoardDetail[0].imgNo);
            // console.log("이미지길이 : "+QABoardDetail[0].imageList.length);
  
  
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
                // console.log("수정버튼 눌림");
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
          }

        } else {
          boardUpDel.innerHTML = "";
        }
      },
      error: () => {
        // console.log("실패");
        alert("게시물 업데이트 중 오류 발생");
      },
    });
  })
}

      
        }
      },
      error:()=>{
        console.log("실패")
      }
  
      
      })
  }  
}

// 자유게시판
function selectFreeboard(cp){
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";
  if(keyword.value == ''){
    $.ajax({
      url:"/admin/selectBoardList",
      data:{"boardCode" : '3', "cp" :cp},
      dataType : "JSON",
      success : (map) =>{
        tbody.innerHTML = "";


        const boardList = map.boardList;
        const pagination = map.pagination;
            
        
        const totalCount = pagination.listCount;

        var pageSize = pagination.pageSize;
        var totalPages = 0;
        var curPage = cp;


        for(let board of boardList){

          const tr = document.createElement("tr");

          // 게시글 번호
          const td1 = document.createElement("td");
          td1.innerText = board.boardNo;

          // 제목
          const td2 = document.createElement("td");
          td2.innerText = board.boardTitle;
          
          // 작성자
          const td3 = document.createElement("td");
          td3.innerText = board.memberId;
          
          // 조회수
          const td4 = document.createElement("td");
          td4.innerText = board.readCount
          
          // 등록일
          const td5 = document.createElement("td");
          td5.innerText = board.createDate
          
          // 관리
          const td6 = document.createElement("td");
          td6.innerHTML = "<button class='board-list-view'>관리</button>"

          tr.append(td1, td2, td3, td4, td5, td6);

          tbody.append(tr);

          const paginationMenu = document.getElementsByClassName("pagination")[0];
          // 페이지네이션
          if (totalCount != 0) {
              totalPages = Math.ceil(totalCount / pageSize);

          
              paginationMenu.innerHTML = "";

              paginationMenu.innerHTML = pageLink(curPage, totalPages);

          }
          $(".pageBtn").click(function(){

            var id_check = $(this).attr("id");
            
            cp = id_check;
            
            if(id_check != null) {
              selectFreeboard(cp);
              $(this)[0].classList.add("fontColor");
          } else{
              $(this)[0].classList.remove("fontColor");

          }


        })
                

        $(".pageFirst").click(function(){
                
            cp = 1;

            selectFreeboard(cp);
        })
        $(".pagePrev").click(function(){
            
            cp = pagination.prevPage;

            selectFreeboard(cp);
        })
        $(".pageNext").click(function(){
            
            cp = pagination.nextPage;

            selectFreeboard(cp);
        })
        $(".pageLast").click(function(){
            
            cp = pagination.maxPage;

            selectFreeboard(cp);
        })

        searchBtn.addEventListener("click", ()=>{
          selectFreeboard(cp);
        })

        
        for(let boardItems of document.querySelectorAll("#tbody")){

          boardItems.lastElementChild.lastElementChild.addEventListener("click", (e)=>{

            let dv = e.currentTarget;


            // 선택한 관리버튼의 회원번호
            tempNo = dv.parentElement.firstElementChild.innerText;

            boardViewModal.style.display = "flex";

            $.ajax({
              url: "/QABoardDetail",
              type: "POST",
              data: { boardNo:tempNo },
              dataType: "json",
              success: (QABoardDetail) => {
                // console.log(QABoardDetail);
                // console.log(QABoardDetail[0].commentCreateDate);

                if(QABoardDetail[0].commentContent){

                  var saveCommentContent = QABoardDetail[0].commentContent.replaceAll("<br>", "\n");
                }
                if(QABoardDetail[0].boardContent){
                  var saveContent = QABoardDetail[0].boardContent.replaceAll("<br>", "\n");

                }
                // saveCommentContent = saveCommentContent.replaceAll("<br>", "\n");
                
                // saveContent = saveContent.replaceAll("<br>", "\n");
                
                // console.log("여기서도 당연히 나오겠지?:"+saveCommentContent);

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

                // console.log("관리자 인가요? : "+loginMemberAuthority);
                // 답변 내용 생성 P
                const QAContentCommentP = document.createElement("p");

                QATitleP.innerText = QABoardDetail[0].boardTitle;
                QATextP.innerText = "문의 내용";
                QAIDAndDateP.innerText =
                QABoardDetail[0].memberId + " / " + QABoardDetail[0].createDate;

                
                QAContentP.innerText = saveContent;

                QATextCommentP.innerText = "답변";

                // 답변이 들어가 있을때
                // console.log("답변이 들어가 있을 뗀테"+saveCommentContent);
                if (saveCommentContent != null) {

                  // 관리자가 로그인 했을 때
                  if(loginMemberAuthority== 2){
                    QAIDAndDateCommentP.innerText = "";
                    const commentTextarea= document.createElement("textarea");
                    commentTextarea.setAttribute("id", "commentContent");
                    
                    commentTextarea.innerText = saveCommentContent;
                    boardViewContentTextComment.append(commentTextarea);

                  }else{ // 일반인 로그인 일때
                    QAIDAndDateCommentP.innerText = QABoardDetail[0].commentCreateDate;
                    QAContentCommentP.innerText = saveCommentContent;
                    boardViewContentTextComment.append(QAContentCommentP);
                  }

                } else { // 답변없을 때

                  if(loginMemberAuthority== 2){ // 관리자일때
                    QAIDAndDateCommentP.innerText = "";
                    const commentTextarea= document.createElement("textarea");
                    commentTextarea.setAttribute("id", "commentContent");
                    // commentTextarea.classList.add("")
                    boardViewContentTextComment.append(commentTextarea);

                  
                  }else{ // 일반일일때
                    QAContentCommentP.innerText =
                    "**** 답변 준비중입니다 (　-̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥᷄ _ -̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥᷅ ) ****";
                    boardViewContentTextComment.append(QAContentCommentP);
                  }
                }

                boardViewTitleDetailAnswer.append(QATitleP);
                boardViewContentContent.append(QATextP, QAIDAndDateP);
                boardViewContentText.append(QAContentP);

                boardViewContentContentComment.append(
                  QATextCommentP,
                  QAIDAndDateCommentP
                );

                // console.log(
                //   "이미지 리스트 길이 출력 : " + QABoardDetail[0].imageList.length
                // );
                //! 이미지 만드는 create작성해야함.
                if (QABoardDetail[0].imageList.length != 0) {
                  ContentImgArea.style.display = "flex";
                  // <div class="board-view-content-img">
                  //   <img src="../../resources/images/게시판테스트img1.jpg" alt="">
                  // </div>
                  // console.log(QABoardDetail[0].imgNo);
                  // console.log(QABoardDetail[0].imageList.length);

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

                if (boardUpDel.id == QABoardDetail[0].memberId || loginMemberAuthority== 2) {
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
                      data: { boardNo: tempNo },
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
                        // console.log("게시물 작성중 오류발생");
                        boardViewModal.style.display = "none";
                      },
                    });
                  });

                  const boardUpdate = document.createElement("div");
                  boardUpdate.classList.add("board-view-btn");
                  if(loginMemberAuthority ==2) {

                    boardUpdate.innerText = "답변 저장";

                    boardUpdate.addEventListener("click",()=>{

                      // console.log("코멘트?:"+saveCommentContent);


                      if(saveCommentContent != null){
                        // console.log("값이 들어가 있음");
                        // console.log("작성된 코멘트값 : "+commentContent.value);                
                          $.ajax({
                            url:"/comment/update",
                            data : {"commentNo" :QABoardDetail[0].commentNo,
                                    "commentContent" : commentContent.value},
                            type : "post",
                            success : function(result) {

                                if(result > 0) {
                                    alert("답변 수정 완료");

                                    // freeBoardDetailAnwserContent.innerHTML = "";
                                    
                                    // commentListFun();
                                    location.reload();

                                }else {
                                    alert("답변 수정 실패")
                                }
                            },
                            error : function(req, status, error){

                                // console.log("답변 수정 중 오류");
                                // console.log(req.responseText);
                            }
                    
                        });
                      }else{
                        // console.log(comment.commentNo);
                        $.ajax({
                          url : "/comment/insert",
                            data : {"commentContent" :commentContent.value,
                                    "memberNo" : '1',
                                    "boardNo" : tempNo},
                            type : "post",
                            success : function(result) {
                                if (result > 0){
                                    alert("답변 등록 완료")
                                    location.reload();

                                } else{
                                    alert("답변 실패");
                                }

                            },

                            error : () => {
                                // console.log("답변 등록 중 오류");
                                alert("답변 등록 중 오류발생");
                            }
                      });
                    }
                  });
                  boardUpDel.append(boardUpdate, boardDelete);
                  }else{
                    
                    boardUpdate.innerText = "수정";


                    const boardWriteTitle = document.getElementById("boardWriteTitle");
                    // !게시물 수정
                    boardUpdate.addEventListener("click", () => {
                      boardViewModal.style.display = "none";
                      // document.body.style.overflow = "unset";
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
                      boardContent.innerText = saveContent;
          
                    //TODO : 이미지 불러오기 / 저장된 이미지
          
                      //! 이미지 만드는 create작성해야함.
                  if (QABoardDetail[0].imageList.length != 0) {
                    boardViewContentImgArea.innerHTML ="";
                    ContentImgArea.style.display = "flex";
                    // <div class="board-view-content-img">
                    //   <img src="../../resources/images/게시판테스트img1.jpg" alt="">
                    // </div>
                    // console.log("이미지번호 : "+ QABoardDetail[0].imgNo);
                    // console.log("이미지길이 : "+QABoardDetail[0].imageList.length);
          
          
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
                        // console.log("수정버튼 눌림");
                        $.ajax({
                          url: "/QABoardUpdate",
                          type: "GET",
                          data: {
                            boardNo: tempNo,
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
                  }

                } else {
                  boardUpDel.innerHTML = "";
                }
              },
              error: () => {
                // console.log("실패");
                alert("게시물 업데이트 중 오류 발생");
              },
            });
          })
        }


        }
     
      },
      error:()=>{
        console.log("실패")
      }

      
    })
  } else {
    $.ajax({
      url:"/admin/selectBoardList",
      data:{"boardCode" : '3', "cp" :cp, "search":search.value, "keyword":keyword.value},
      dataType : "JSON",
      success : (map) =>{

        tbody.innerHTML = "";

        const boardList = map.boardList;
        const pagination = map.pagination;
            
        
        const totalCount = pagination.listCount;

        var pageSize = pagination.pageSize;
        var totalPages = 0;
        var curPage = cp;

        for(let board of boardList){

          const tr = document.createElement("tr");

          // 게시글 번호
          const td1 = document.createElement("td");
          td1.innerText = board.boardNo;

          // 제목
          const td2 = document.createElement("td");
          td2.innerText = board.boardTitle;
          
          // 작성자
          const td3 = document.createElement("td");
          td3.innerText = board.memberId;
          
          // 조회수
          const td4 = document.createElement("td");
          td4.innerText = board.readCount
          
          // 등록일
          const td5 = document.createElement("td");
          td5.innerText = board.createDate
          
          // 관리
          const td6 = document.createElement("td");
          td6.innerHTML = "<button class='board-list-view'>관리</button>"

          tr.append(td1, td2, td3, td4, td5, td6);

          tbody.append(tr);

          const paginationMenu = document.getElementsByClassName("pagination")[0];
          // 페이지네이션
          if (totalCount != 0) {
              totalPages = Math.ceil(totalCount / pageSize);

          
              paginationMenu.innerHTML = "";

              paginationMenu.innerHTML = pageLink(curPage, totalPages);

          }
          $(".pageBtn").click(function(){

            var id_check = $(this).attr("id");
            
            cp = id_check;
            
            if(id_check != null) {
              selectFreeboard(cp);
              $(this)[0].classList.add("fontColor");
          } else{
              $(this)[0].classList.remove("fontColor");

          }


        })
                

        $(".pageFirst").click(function(){
                
            cp = 1;

            selectFreeboard(cp);
        })
        $(".pagePrev").click(function(){
            
            cp = pagination.prevPage;

            selectFreeboard(cp);
        })
        $(".pageNext").click(function(){
            
            cp = pagination.nextPage;

            selectFreeboard(cp);
        })
        $(".pageLast").click(function(){
            
            cp = pagination.maxPage;

            selectFreeboard(cp);
        })

        searchBtn.addEventListener("click", ()=>{
          selectFreeboard(cp);
        })

        
        for(let boardItems of document.querySelectorAll("#tbody")){

          boardItems.lastElementChild.lastElementChild.addEventListener("click", (e)=>{

            let dv = e.currentTarget;


            // 선택한 관리버튼의 회원번호
            tempNo = dv.parentElement.firstElementChild.innerText;

            boardViewModal.style.display = "flex";

            $.ajax({
              url: "/QABoardDetail",
              type: "POST",
              data: { boardNo:tempNo },
              dataType: "json",
              success: (QABoardDetail) => {
                // console.log(QABoardDetail);
                // console.log(QABoardDetail[0].commentCreateDate);

                if(QABoardDetail[0].commentContent){

                  var saveCommentContent = QABoardDetail[0].commentContent.replaceAll("<br>", "\n");
                }
                if(QABoardDetail[0].boardContent){
                  var saveContent = QABoardDetail[0].boardContent.replaceAll("<br>", "\n");

                }
                // saveCommentContent = saveCommentContent.replaceAll("<br>", "\n");
                
                // saveContent = saveContent.replaceAll("<br>", "\n");
                
                // console.log("여기서도 당연히 나오겠지?:"+saveCommentContent);

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

                // console.log("관리자 인가요? : "+loginMemberAuthority);
                // 답변 내용 생성 P
                const QAContentCommentP = document.createElement("p");

                QATitleP.innerText = QABoardDetail[0].boardTitle;
                QATextP.innerText = "문의 내용";
                QAIDAndDateP.innerText =
                QABoardDetail[0].memberId + " / " + QABoardDetail[0].createDate;

                
                QAContentP.innerText = saveContent;

                QATextCommentP.innerText = "답변";

                // 답변이 들어가 있을때
                // console.log("답변이 들어가 있을 뗀테"+saveCommentContent);
                if (saveCommentContent != null) {

                  // 관리자가 로그인 했을 때
                  if(loginMemberAuthority== 2){
                    QAIDAndDateCommentP.innerText = "";
                    const commentTextarea= document.createElement("textarea");
                    commentTextarea.setAttribute("id", "commentContent");
                    
                    commentTextarea.innerText = saveCommentContent;
                    boardViewContentTextComment.append(commentTextarea);

                  }else{ // 일반인 로그인 일때
                    QAIDAndDateCommentP.innerText = QABoardDetail[0].commentCreateDate;
                    QAContentCommentP.innerText = saveCommentContent;
                    boardViewContentTextComment.append(QAContentCommentP);
                  }

                } else { // 답변없을 때

                  if(loginMemberAuthority== 2){ // 관리자일때
                    QAIDAndDateCommentP.innerText = "";
                    const commentTextarea= document.createElement("textarea");
                    commentTextarea.setAttribute("id", "commentContent");
                    // commentTextarea.classList.add("")
                    boardViewContentTextComment.append(commentTextarea);

                  
                  }else{ // 일반일일때
                    QAContentCommentP.innerText =
                    "**** 답변 준비중입니다 (　-̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥᷄ _ -̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥᷅ ) ****";
                    boardViewContentTextComment.append(QAContentCommentP);
                  }
                }

                boardViewTitleDetailAnswer.append(QATitleP);
                boardViewContentContent.append(QATextP, QAIDAndDateP);
                boardViewContentText.append(QAContentP);

                boardViewContentContentComment.append(
                  QATextCommentP,
                  QAIDAndDateCommentP
                );

                // console.log(
                //   "이미지 리스트 길이 출력 : " + QABoardDetail[0].imageList.length
                // );
                //! 이미지 만드는 create작성해야함.
                if (QABoardDetail[0].imageList.length != 0) {
                  ContentImgArea.style.display = "flex";
                  // <div class="board-view-content-img">
                  //   <img src="../../resources/images/게시판테스트img1.jpg" alt="">
                  // </div>
                  // console.log(QABoardDetail[0].imgNo);
                  // console.log(QABoardDetail[0].imageList.length);

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

                if (boardUpDel.id == QABoardDetail[0].memberId || loginMemberAuthority== 2) {
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
                      data: { boardNo: tempNo },
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
                        // console.log("게시물 작성중 오류발생");
                        boardViewModal.style.display = "none";
                      },
                    });
                  });

                  const boardUpdate = document.createElement("div");
                  boardUpdate.classList.add("board-view-btn");
                  if(loginMemberAuthority ==2) {

                    boardUpdate.innerText = "답변 저장";

                    boardUpdate.addEventListener("click",()=>{

                      // console.log("코멘트?:"+saveCommentContent);


                      if(saveCommentContent != null){
                        // console.log("값이 들어가 있음");
                        // console.log("작성된 코멘트값 : "+commentContent.value);                
                          $.ajax({
                            url:"/comment/update",
                            data : {"commentNo" :QABoardDetail[0].commentNo,
                                    "commentContent" : commentContent.value},
                            type : "post",
                            success : function(result) {

                                if(result > 0) {
                                    alert("답변 수정 완료");

                                    // freeBoardDetailAnwserContent.innerHTML = "";
                                    
                                    // commentListFun();
                                    location.reload();

                                }else {
                                    alert("답변 수정 실패")
                                }
                            },
                            error : function(req, status, error){

                                // console.log("답변 수정 중 오류");
                                // console.log(req.responseText);
                            }
                    
                        });
                      }else{
                        // console.log(comment.commentNo);
                        $.ajax({
                          url : "/comment/insert",
                            data : {"commentContent" :commentContent.value,
                                    "memberNo" : '1',
                                    "boardNo" : tempNo},
                            type : "post",
                            success : function(result) {
                                if (result > 0){
                                    alert("답변 등록 완료")
                                    location.reload();

                                } else{
                                    alert("답변 실패");
                                }

                            },

                            error : () => {
                                // console.log("답변 등록 중 오류");
                                alert("답변 등록 중 오류발생");
                            }
                      });
                    }
                  });
                  boardUpDel.append(boardUpdate, boardDelete);
                  }else{
                    
                    boardUpdate.innerText = "수정";


                    const boardWriteTitle = document.getElementById("boardWriteTitle");
                    // !게시물 수정
                    boardUpdate.addEventListener("click", () => {
                      boardViewModal.style.display = "none";
                      // document.body.style.overflow = "unset";
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
                      boardContent.innerText = saveContent;
          
                    //TODO : 이미지 불러오기 / 저장된 이미지
          
                      //! 이미지 만드는 create작성해야함.
                  if (QABoardDetail[0].imageList.length != 0) {
                    boardViewContentImgArea.innerHTML ="";
                    ContentImgArea.style.display = "flex";
                    // <div class="board-view-content-img">
                    //   <img src="../../resources/images/게시판테스트img1.jpg" alt="">
                    // </div>
                    // console.log("이미지번호 : "+ QABoardDetail[0].imgNo);
                    // console.log("이미지길이 : "+QABoardDetail[0].imageList.length);
          
          
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
                        // console.log("수정버튼 눌림");
                        $.ajax({
                          url: "/QABoardUpdate",
                          type: "GET",
                          data: {
                            boardNo: tempNo,
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
                  }

                } else {
                  boardUpDel.innerHTML = "";
                }
              },
              error: () => {
                // console.log("실패");
                alert("게시물 업데이트 중 오류 발생");
              },
            });
          })
        }


        }
     
      },
      error:()=>{
        console.log("실패")
      }

      
    })
  }  
}

// 문의게시판
function selectQuestion(cp){
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";
  if(keyword.value==''){
    $.ajax({
      url:"/admin/selectBoardList",
      data:{"boardCode" : '4', "cp":cp},
      dataType : "JSON",
      success : (map) =>{

        tbody.innerHTML = "";


        const boardList = map.boardList;
        const pagination = map.pagination;
            
        
        const totalCount = pagination.listCount;

        var pageSize = pagination.pageSize;
        var totalPages = 0;
        var curPage = cp;

        for(let board of boardList){

          const tr = document.createElement("tr");

          // 게시글 번호
          const td1 = document.createElement("td");
          td1.innerText = board.boardNo;

          // 제목
          const td2 = document.createElement("td");
          td2.innerText = board.boardTitle;
          
          // 작성자
          const td3 = document.createElement("td");
          td3.innerText = board.memberId;
          
          // 조회수
          const td4 = document.createElement("td");
          td4.innerText = board.readCount
          
          // 등록일
          const td5 = document.createElement("td");
          td5.innerText = board.createDate
          
          // 관리
          const td6 = document.createElement("td");
          td6.innerHTML = "<button class='board-list-view'>관리</button>"

          tr.append(td1, td2, td3, td4, td5, td6);

          tbody.append(tr);


          const paginationMenu = document.getElementsByClassName("pagination")[0];
          // 페이지네이션
          if (totalCount != 0) {
              totalPages = Math.ceil(totalCount / pageSize);

          
              paginationMenu.innerHTML = "";

              paginationMenu.innerHTML = pageLink(curPage, totalPages);

          }

          $(".pageBtn").click(function(){

            var id_check = $(this).attr("id");
            
            cp = id_check;
            
            if(id_check != null) {
              selectQuestion(cp);
              $(this)[0].classList.add("fontColor");
          } else{
              $(this)[0].classList.remove("fontColor");

          }

            
            if(id_check != null) selectQuestion(cp); 
            

        })
                

        $(".pageFirst").click(function(){
                
            cp = 1;

            selectQuestion(cp);
        })
        $(".pagePrev").click(function(){
            
            cp = pagination.prevPage;

            selectQuestion(cp);
        })
        $(".pageNext").click(function(){
            
            cp = pagination.nextPage;

            selectQuestion(cp);
        })
        $(".pageLast").click(function(){
            
            cp = pagination.maxPage;

            selectQuestion(cp);
        })

        searchBtn.addEventListener("click", ()=>{
          selectQuestion(cp);
        })

        
        for(let boardItems of document.querySelectorAll("#tbody")){

          boardItems.lastElementChild.lastElementChild.addEventListener("click", (e)=>{

            let dv = e.currentTarget;


            // 선택한 관리버튼의 회원번호
            tempNo = dv.parentElement.firstElementChild.innerText;

            boardViewModal.style.display = "flex";

            $.ajax({
              url: "/QABoardDetail",
              type: "POST",
              data: { boardNo:tempNo },
              dataType: "json",
              success: (QABoardDetail) => {
                // console.log(QABoardDetail);
                // console.log(QABoardDetail[0].commentCreateDate);

                if(QABoardDetail[0].commentContent){

                  var saveCommentContent = QABoardDetail[0].commentContent.replaceAll("<br>", "\n");
                }
                if(QABoardDetail[0].boardContent){
                  var saveContent = QABoardDetail[0].boardContent.replaceAll("<br>", "\n");

                }
                // saveCommentContent = saveCommentContent.replaceAll("<br>", "\n");
                
                // saveContent = saveContent.replaceAll("<br>", "\n");
                
                // console.log("여기서도 당연히 나오겠지?:"+saveCommentContent);

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

                // console.log("관리자 인가요? : "+loginMemberAuthority);
                // 답변 내용 생성 P
                const QAContentCommentP = document.createElement("p");

                QATitleP.innerText = QABoardDetail[0].boardTitle;
                QATextP.innerText = "문의 내용";
                QAIDAndDateP.innerText =
                QABoardDetail[0].memberId + " / " + QABoardDetail[0].createDate;

                
                QAContentP.innerText = saveContent;

                QATextCommentP.innerText = "답변";

                // 답변이 들어가 있을때
                // console.log("답변이 들어가 있을 뗀테"+saveCommentContent);
                if (saveCommentContent != null) {

                  // 관리자가 로그인 했을 때
                  if(loginMemberAuthority== 2){
                    QAIDAndDateCommentP.innerText = "";
                    const commentTextarea= document.createElement("textarea");
                    commentTextarea.setAttribute("id", "commentContent");
                    
                    commentTextarea.innerText = saveCommentContent;
                    boardViewContentTextComment.append(commentTextarea);

                  }else{ // 일반인 로그인 일때
                    QAIDAndDateCommentP.innerText = QABoardDetail[0].commentCreateDate;
                    QAContentCommentP.innerText = saveCommentContent;
                    boardViewContentTextComment.append(QAContentCommentP);
                  }

                } else { // 답변없을 때

                  if(loginMemberAuthority== 2){ // 관리자일때
                    QAIDAndDateCommentP.innerText = "";
                    const commentTextarea= document.createElement("textarea");
                    commentTextarea.setAttribute("id", "commentContent");
                    // commentTextarea.classList.add("")
                    boardViewContentTextComment.append(commentTextarea);

                  
                  }else{ // 일반일일때
                    QAContentCommentP.innerText =
                    "**** 답변 준비중입니다 (　-̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥᷄ _ -̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥᷅ ) ****";
                    boardViewContentTextComment.append(QAContentCommentP);
                  }
                }

                boardViewTitleDetailAnswer.append(QATitleP);
                boardViewContentContent.append(QATextP, QAIDAndDateP);
                boardViewContentText.append(QAContentP);

                boardViewContentContentComment.append(
                  QATextCommentP,
                  QAIDAndDateCommentP
                );

                // console.log(
                //   "이미지 리스트 길이 출력 : " + QABoardDetail[0].imageList.length
                // );
                //! 이미지 만드는 create작성해야함.
                if (QABoardDetail[0].imageList.length != 0) {
                  ContentImgArea.style.display = "flex";
                  // <div class="board-view-content-img">
                  //   <img src="../../resources/images/게시판테스트img1.jpg" alt="">
                  // </div>
                  // console.log(QABoardDetail[0].imgNo);
                  // console.log(QABoardDetail[0].imageList.length);

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

                if (boardUpDel.id == QABoardDetail[0].memberId || loginMemberAuthority== 2) {
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
                      data: { boardNo: tempNo },
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
                        // console.log("게시물 작성중 오류발생");
                        boardViewModal.style.display = "none";
                      },
                    });
                  });

                  const boardUpdate = document.createElement("div");
                  boardUpdate.classList.add("board-view-btn");
                  if(loginMemberAuthority ==2) {

                    boardUpdate.innerText = "답변 저장";

                    boardUpdate.addEventListener("click",()=>{

                      // console.log("코멘트?:"+saveCommentContent);


                      if(saveCommentContent != null){
                        // console.log("값이 들어가 있음");
                        // console.log("작성된 코멘트값 : "+commentContent.value);                
                          $.ajax({
                            url:"/comment/update",
                            data : {"commentNo" :QABoardDetail[0].commentNo,
                                    "commentContent" : commentContent.value},
                            type : "post",
                            success : function(result) {

                                if(result > 0) {
                                    alert("답변 수정 완료");

                                    // freeBoardDetailAnwserContent.innerHTML = "";
                                    
                                    // commentListFun();
                                    location.reload();

                                }else {
                                    alert("답변 수정 실패")
                                }
                            },
                            error : function(req, status, error){

                                // console.log("답변 수정 중 오류");
                                // console.log(req.responseText);
                            }
                    
                        });
                      }else{
                        // console.log(comment.commentNo);
                        $.ajax({
                          url : "/comment/insert",
                            data : {"commentContent" :commentContent.value,
                                    "memberNo" : '1',
                                    "boardNo" : tempNo},
                            type : "post",
                            success : function(result) {
                                if (result > 0){
                                    alert("답변 등록 완료")
                                    location.reload();

                                } else{
                                    alert("답변 실패");
                                }

                            },

                            error : () => {
                                // console.log("답변 등록 중 오류");
                                alert("답변 등록 중 오류발생");
                            }
                      });
                    }
                  });
                  boardUpDel.append(boardUpdate, boardDelete);
                  }else{
                    
                    boardUpdate.innerText = "수정";


                    const boardWriteTitle = document.getElementById("boardWriteTitle");
                    // !게시물 수정
                    boardUpdate.addEventListener("click", () => {
                      boardViewModal.style.display = "none";
                      // document.body.style.overflow = "unset";
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
                      boardContent.innerText = saveContent;
          
                    //TODO : 이미지 불러오기 / 저장된 이미지
          
                      //! 이미지 만드는 create작성해야함.
                  if (QABoardDetail[0].imageList.length != 0) {
                    boardViewContentImgArea.innerHTML ="";
                    ContentImgArea.style.display = "flex";
                    // <div class="board-view-content-img">
                    //   <img src="../../resources/images/게시판테스트img1.jpg" alt="">
                    // </div>
                    // console.log("이미지번호 : "+ QABoardDetail[0].imgNo);
                    // console.log("이미지길이 : "+QABoardDetail[0].imageList.length);
          
          
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
                        // console.log("수정버튼 눌림");
                        $.ajax({
                          url: "/QABoardUpdate",
                          type: "GET",
                          data: {
                            boardNo: tempNo,
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
                  }

                } else {
                  boardUpDel.innerHTML = "";
                }
              },
              error: () => {
                // console.log("실패");
                alert("게시물 업데이트 중 오류 발생");
              },
            });
          })
        }



    
        
        }
      },
      error:()=>{
        console.log("실패")
      }

      
    })
  } else {
    $.ajax({
      url:"/admin/selectBoardList",
      data:{"boardCode" : '4', "cp":cp, "search":search.value, "keyword":keyword.value},
      dataType : "JSON",
      success : (map) =>{

        tbody.innerHTML = "";

        const boardList = map.boardList;
        const pagination = map.pagination;
            
        
        const totalCount = pagination.listCount;

        var pageSize = pagination.pageSize;
        var totalPages = 0;
        var curPage = cp;

        for(let board of boardList){

          const tr = document.createElement("tr");

          // 게시글 번호
          const td1 = document.createElement("td");
          td1.innerText = board.boardNo;

          // 제목
          const td2 = document.createElement("td");
          td2.innerText = board.boardTitle;
          
          // 작성자
          const td3 = document.createElement("td");
          td3.innerText = board.memberId;
          
          // 조회수
          const td4 = document.createElement("td");
          td4.innerText = board.readCount
          
          // 등록일
          const td5 = document.createElement("td");
          td5.innerText = board.createDate
          
          // 관리
          const td6 = document.createElement("td");
          td6.innerHTML = "<button class='board-list-view'>관리</button>"

          tr.append(td1, td2, td3, td4, td5, td6);

          tbody.append(tr);


          const paginationMenu = document.getElementsByClassName("pagination")[0];
          // 페이지네이션
          if (totalCount != 0) {
              totalPages = Math.ceil(totalCount / pageSize);

          
              paginationMenu.innerHTML = "";

              paginationMenu.innerHTML = pageLink(curPage, totalPages);

          }

          $(".pageBtn").click(function(){
            $(this).toggleClass("checked");
            
            var id_check = $(this).attr("id");
            
            cp = id_check;
            
            if(id_check != null) {
              selectQuestion(cp);
              $(this)[0].classList.add("fontColor");
          } else{
              $(this)[0].classList.remove("fontColor");

          }


        })
                

        $(".pageFirst").click(function(){
                
            cp = 1;

            selectQuestion(cp);
        })
        $(".pagePrev").click(function(){
            
            cp = pagination.prevPage;

            selectQuestion(cp);
        })
        $(".pageNext").click(function(){
            
            cp = pagination.nextPage;

            selectQuestion(cp);
        })
        $(".pageLast").click(function(){
            
            cp = pagination.maxPage;

            selectQuestion(cp);
        })

        searchBtn.addEventListener("click", ()=>{
          selectQuestion(cp);
        })
        

        for(let boardItems of document.querySelectorAll("#tbody")){

          boardItems.lastElementChild.lastElementChild.addEventListener("click", (e)=>{

            let dv = e.currentTarget;


            // 선택한 관리버튼의 회원번호
            tempNo = dv.parentElement.firstElementChild.innerText;

            boardViewModal.style.display = "flex";

            $.ajax({
              url: "/QABoardDetail",
              type: "POST",
              data: { boardNo:tempNo },
              dataType: "json",
              success: (QABoardDetail) => {
                // console.log(QABoardDetail);
                // console.log(QABoardDetail[0].commentCreateDate);

                if(QABoardDetail[0].commentContent){

                  var saveCommentContent = QABoardDetail[0].commentContent.replaceAll("<br>", "\n");
                }
                if(QABoardDetail[0].boardContent){
                  var saveContent = QABoardDetail[0].boardContent.replaceAll("<br>", "\n");

                }
                // saveCommentContent = saveCommentContent.replaceAll("<br>", "\n");
                
                // saveContent = saveContent.replaceAll("<br>", "\n");
                
                // console.log("여기서도 당연히 나오겠지?:"+saveCommentContent);

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

                // console.log("관리자 인가요? : "+loginMemberAuthority);
                // 답변 내용 생성 P
                const QAContentCommentP = document.createElement("p");

                QATitleP.innerText = QABoardDetail[0].boardTitle;
                QATextP.innerText = "문의 내용";
                QAIDAndDateP.innerText =
                QABoardDetail[0].memberId + " / " + QABoardDetail[0].createDate;

                
                QAContentP.innerText = saveContent;

                QATextCommentP.innerText = "답변";

                // 답변이 들어가 있을때
                // console.log("답변이 들어가 있을 뗀테"+saveCommentContent);
                if (saveCommentContent != null) {

                  // 관리자가 로그인 했을 때
                  if(loginMemberAuthority== 2){
                    QAIDAndDateCommentP.innerText = "";
                    const commentTextarea= document.createElement("textarea");
                    commentTextarea.setAttribute("id", "commentContent");
                    
                    commentTextarea.innerText = saveCommentContent;
                    boardViewContentTextComment.append(commentTextarea);

                  }else{ // 일반인 로그인 일때
                    QAIDAndDateCommentP.innerText = QABoardDetail[0].commentCreateDate;
                    QAContentCommentP.innerText = saveCommentContent;
                    boardViewContentTextComment.append(QAContentCommentP);
                  }

                } else { // 답변없을 때

                  if(loginMemberAuthority== 2){ // 관리자일때
                    QAIDAndDateCommentP.innerText = "";
                    const commentTextarea= document.createElement("textarea");
                    commentTextarea.setAttribute("id", "commentContent");
                    // commentTextarea.classList.add("")
                    boardViewContentTextComment.append(commentTextarea);

                  
                  }else{ // 일반일일때
                    QAContentCommentP.innerText =
                    "**** 답변 준비중입니다 (　-̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥᷄ _ -̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥᷅ ) ****";
                    boardViewContentTextComment.append(QAContentCommentP);
                  }
                }

                boardViewTitleDetailAnswer.append(QATitleP);
                boardViewContentContent.append(QATextP, QAIDAndDateP);
                boardViewContentText.append(QAContentP);

                boardViewContentContentComment.append(
                  QATextCommentP,
                  QAIDAndDateCommentP
                );

                // console.log(
                //   "이미지 리스트 길이 출력 : " + QABoardDetail[0].imageList.length
                // );
                //! 이미지 만드는 create작성해야함.
                if (QABoardDetail[0].imageList.length != 0) {
                  ContentImgArea.style.display = "flex";
                  // <div class="board-view-content-img">
                  //   <img src="../../resources/images/게시판테스트img1.jpg" alt="">
                  // </div>
                  // console.log(QABoardDetail[0].imgNo);
                  // console.log(QABoardDetail[0].imageList.length);

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

                if (boardUpDel.id == QABoardDetail[0].memberId || loginMemberAuthority== 2) {
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
                      data: { boardNo: tempNo },
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
                        // console.log("게시물 작성중 오류발생");
                        boardViewModal.style.display = "none";
                      },
                    });
                  });

                  const boardUpdate = document.createElement("div");
                  boardUpdate.classList.add("board-view-btn");
                  if(loginMemberAuthority ==2) {

                    boardUpdate.innerText = "답변 저장";

                    boardUpdate.addEventListener("click",()=>{

                      // console.log("코멘트?:"+saveCommentContent);


                      if(saveCommentContent != null){
                        // console.log("값이 들어가 있음");
                        // console.log("작성된 코멘트값 : "+commentContent.value);                
                          $.ajax({
                            url:"/comment/update",
                            data : {"commentNo" :QABoardDetail[0].commentNo,
                                    "commentContent" : commentContent.value},
                            type : "post",
                            success : function(result) {

                                if(result > 0) {
                                    alert("답변 수정 완료");

                                    // freeBoardDetailAnwserContent.innerHTML = "";
                                    
                                    // commentListFun();
                                    location.reload();

                                }else {
                                    alert("답변 수정 실패")
                                }
                            },
                            error : function(req, status, error){

                                // console.log("답변 수정 중 오류");
                                // console.log(req.responseText);
                            }
                    
                        });
                      }else{
                        // console.log(comment.commentNo);
                        $.ajax({
                          url : "/comment/insert",
                            data : {"commentContent" :commentContent.value,
                                    "memberNo" : '1',
                                    "boardNo" : tempNo},
                            type : "post",
                            success : function(result) {
                                if (result > 0){
                                    alert("답변 등록 완료")
                                    location.reload();

                                } else{
                                    alert("답변 실패");
                                }

                            },

                            error : () => {
                                // console.log("답변 등록 중 오류");
                                alert("답변 등록 중 오류발생");
                            }
                      });
                    }
                  });
                  boardUpDel.append(boardUpdate, boardDelete);
                  }else{
                    
                    boardUpdate.innerText = "수정";


                    const boardWriteTitle = document.getElementById("boardWriteTitle");
                    // !게시물 수정
                    boardUpdate.addEventListener("click", () => {
                      boardViewModal.style.display = "none";
                      // document.body.style.overflow = "unset";
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
                      boardContent.innerText = saveContent;
          
                    //TODO : 이미지 불러오기 / 저장된 이미지
          
                      //! 이미지 만드는 create작성해야함.
                  if (QABoardDetail[0].imageList.length != 0) {
                    boardViewContentImgArea.innerHTML ="";
                    ContentImgArea.style.display = "flex";
                    // <div class="board-view-content-img">
                    //   <img src="../../resources/images/게시판테스트img1.jpg" alt="">
                    // </div>
                    // console.log("이미지번호 : "+ QABoardDetail[0].imgNo);
                    // console.log("이미지길이 : "+QABoardDetail[0].imageList.length);
          
          
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
                        // console.log("수정버튼 눌림");
                        $.ajax({
                          url: "/QABoardUpdate",
                          type: "GET",
                          data: {
                            boardNo: tempNo,
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
                  }

                } else {
                  boardUpDel.innerHTML = "";
                }
              },
              error: () => {
                // console.log("실패");
                alert("게시물 업데이트 중 오류 발생");
              },
            });
          })
        }

    
        }
      },
      error:()=>{
        console.log("실패")
      }

      
    })
  }  
}

function pageLink(curPage, totalPages) {
	var pageUrl = "";
	
	var pageLimit = 10;
	var startPage = parseInt((curPage - 1) / pageLimit) * pageLimit + 1;
	var endPage = startPage + pageLimit - 1;
	
    
    
	if (totalPages < endPage) {
	    endPage = totalPages;
	}
	
	var nextPage = endPage + 1;
	
    // console.log(curPage,"curPage,",startPage,"startPage,",endPage,"endPage,",nextPage,"nextPage", totalPages, "totalPages")
	
	//맨 첫 페이지
	if (curPage > 1 && pageLimit < curPage) {
	    pageUrl += "<button class='pageFirst''pageBtn' href='javascript:void(0);'"+  "(1);'>&lt;&lt;</button>";
	}

	//이전 페이지
	if (curPage > pageLimit) {
	    pageUrl += "<button class='pagePrev''pageBtn' href='javascript:void(0);'"  + "(" + (startPage == 1 ? 1 : startPage - 1) + ");'>&lt;</button>";
	}

	//~pageLimit 맞게 페이지 수 보여줌
	for (var i = startPage; i <= endPage; i++) {
	    //현재페이지면 진하게 표시
	    if (i == curPage) {
	        pageUrl += "<button class='pageBtn fontColor' href='javascript:void(0) ;'>" + i + "</button>"
	    } else {
	        pageUrl += "<button class='pageBtn' href='javascript:void(0);'  + id="+i+">" + i + " </button>";
	    }
	}
	//다음 페이지
	if (nextPage <= totalPages) {
	    pageUrl += "<button class='pageNext' 'pageBtn' href='javascript:void(0);'" + "(" + (nextPage < totalPages ? nextPage : totalPages) + ");'>&gt;</button>";
	}
	//맨 마지막 페이지
	if (curPage < totalPages && nextPage < totalPages) {
	    pageUrl += "<button class='pageLast''pageBtn' href='javascript:void(0);'"  + "(" + totalPages + ");>&gt;&gt;</button>";
	}
	// console.log(pageUrl);
    
	return pageUrl;
    
  
}

// 상세 보기 모달 연결 / 
// js = QAview
// jsp = boardView




