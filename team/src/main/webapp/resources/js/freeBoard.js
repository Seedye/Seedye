
const freeBoardOne = document.getElementsByClassName("freeBoard-listOne");

for (let freeBoardOneItems of freeBoardOne) {
    freeBoardOneItems.addEventListener("click", () => {

        const freeBoardDetailView = document.getElementById("freeBoard-detail-view");
        if(freeBoardDetailView != null){
        
            freeBoardDetailView.innerHTML ="";
        }
        
        // 상세보기 조회
        $.ajax({
            url : "/freeBoardDetail",
            type : "POST",
            data : {"boardNo" : freeBoardOneItems.lastElementChild.id},
            dataType : "json",
            success : (freeBoardDetail) => {

                // if(comment.commentContent){

                //     var saveCommentContent = comment.commentContent.replaceAll("<br>", "\n");
                //   }
                  if(freeBoardDetail[0].boardContent){
                    var saveContent = freeBoardDetail[0].boardContent.replaceAll(/(<br>|<br\/>|<br \/>)/g, '\r\n');
                     // XSS 방지 처리 해제
                    saveContent =  saveContent.replaceAll("&amp;", "&");
                    saveContent =  saveContent.replaceAll("&lt;", "<");
                    saveContent =  saveContent.replaceAll("&gt;", ">");
                    saveContent =  saveContent.replaceAll("&quot;", "\"");
          
                  }

                  if(freeBoardDetail[0].boardTitle){
                    var saveBoardTitle =  freeBoardDetail[0].boardTitle.replaceAll((/(<br>|<br\/>|<br \/>)/g, '\r\n'));
                    // XSS 방지 처리 해제
                    saveBoardTitle =  saveBoardTitle.replaceAll("&amp;", "&");
                    saveBoardTitle =  saveBoardTitle.replaceAll("&lt;", "<");
                    saveBoardTitle =  saveBoardTitle.replaceAll("&gt;", ">");
                    saveBoardTitle =  saveBoardTitle.replaceAll("&quot;", "\"");
                  }

                const bigTitle = document.createElement("p");
                bigTitle.innerText = saveBoardTitle;

                const freeBoardDetailTitle = document.createElement("div");
                freeBoardDetailTitle.setAttribute("id", "freeBoard-detail-title");

                const simpleContent = document.createElement("p");
                simpleContent.innerText ="내용";

                const smallTitleA = document.createElement("p");
                smallTitleA.innerText = freeBoardDetail[0].memberId + " / " + freeBoardDetail[0].createDate;

                freeBoardDetailTitle.append(simpleContent);
                freeBoardDetailTitle.append(smallTitleA);

                
                const freeBoardDetailContent = document.createElement("p");
                freeBoardDetailContent.setAttribute("id", "freeBoard-detail-content")
               
                // var content = freeBoardDetail[0].boardContent;
                // freeBoardDetailContent.innerText = content.replace(/(<br>|<br\/>|<br \/>)/g, '\r\n');
                freeBoardDetailContent.innerText = saveContent;

                freeBoardDetailView.append(bigTitle);
                freeBoardDetailView.append(freeBoardDetailTitle);
                freeBoardDetailView.append(freeBoardDetailContent);

                const imgContainer = document.createElement("div");
                imgContainer.classList.add("imgContainer");

                if(freeBoardDetail[0].imageList.length != 0){

                    for(let i = 0; i < freeBoardDetail[0].imageList.length ; i++) {
                        if(i < 4){

                            const img = document.createElement("img");
                            
                            img.setAttribute("src",freeBoardDetail[0].imageList[i].imgPath+"/"+freeBoardDetail[0].imageList[i].imgRename);
                            
                            // if(freeBoardDetail[0].imageList[i] == null){
                            //     img.setAttribute("src","../../resources/images/기본 이미지.png");

                            // } else {
                                //     img.setAttribute("src",freeBoardDetail[0].imageList[i].imgPath+"/"+freeBoardDetail[0].imageList[i].imgRename);
                                
                            // }
                
                            imgContainer.append(img);
                            freeBoardDetailView.append(imgContainer);
                        }
                    }

                }else {
                    freeBoardDetailView.append(imgContainer);
                }
                
                const freeBoardDetailAnwser = document.createElement("div");
                freeBoardDetailAnwser.setAttribute("id", "freeBoard-detail-anwser")
                
                const anwser = document.createElement("p");
                anwser.innerText = "답변";
                
                const input = document.createElement("input");
                input.setAttribute("type", "text");
                input.setAttribute("id", "commentContent");
                
                
                const anwserBtn = document.createElement("button");
                anwserBtn.setAttribute("id","comment-btn");
                anwserBtn.innerText = "답변 작성";
                
                freeBoardDetailAnwser.append(anwser);
                freeBoardDetailAnwser.append(input);
                freeBoardDetailAnwser.append(anwserBtn);
                freeBoardDetailView.append(freeBoardDetailAnwser);
                
                const freeBoardDetailAnwserContent = document.createElement("div");
                freeBoardDetailAnwserContent.setAttribute("id", "freeBoard-detail-anwser-content");
                freeBoardDetailView.append(freeBoardDetailAnwser);
                freeBoardDetailView.append(freeBoardDetailAnwserContent);

                const commentListFun = function(){

                    // 답변 조회 ajax
                    $.ajax({
                        url : "/comment/list",
                        data : {"boardNo" : freeBoardOneItems.lastElementChild.id},
                        type : "GET",
                        dataType : "json",
                        success : (rList) => {
                            console.log(rList);

                            for (let comment of rList) {
                                if(comment.commentContent){
                                    
                                    var saveCommentContent = comment.commentContent.replaceAll(/(<br>|<br\/>|<br \/>)/g, '\r\n');

                                     // XSS 방지 처리 해제
                                    saveCommentContent =  saveCommentContent.replaceAll("&amp;", "&");
                                    saveCommentContent =  saveCommentContent.replaceAll("&lt;", "<");
                                    saveCommentContent =  saveCommentContent.replaceAll("&gt;", ">");
                                    saveCommentContent =  saveCommentContent.replaceAll("&quot;", "\"");

                                  }
                                
                                // 답변 생성
                                const contentD = document.createElement("div");
                                contentD.classList.add("contentD")
                                
                                const asd = document.createElement("div");
                                asd.classList.add("asd")
                                const iconContainer = document.createElement("div");
                                const anwserP = document.createElement("p");

                                asd.append(iconContainer)
                                asd.append(anwserP)
                                if(comment.parentNo == 0) {

                                    anwserP.innerText = comment.memberId + " : " + saveCommentContent;
                                }else{
                                    // contentD.style.marginLeft = "10px"
                                    contentD.style.width = "495px"
                                    // iconContainer.setAttribute("class", "fa-regular fa-message");
                                    iconContainer.innerText = '┖'
                                    iconContainer.style.marginRight = "5px";
                                    anwserP.innerHTML =  comment.memberId + " : " + saveCommentContent;
                                }
                                
                                contentD.append(asd);
                                // contentD.append(anwserP);

                                const pen = document.createElement("div");
                                pen.classList.add("pen");

                                const updateBtn = document.createElement("button");
                                updateBtn.classList.add("updateBtn")
                                updateBtn.setAttribute("class", "fa-solid fa-pen");

                                const deleteBtn = document.createElement("button");
                                deleteBtn.classList.add("deleteBtn")
                                deleteBtn.innerText ="x";

                                // 답변 수정, 삭제 버튼이 조건이 같을 때 생성
                                if (memberNo == comment.memberNo) {
                                    pen.append(updateBtn)
                                    pen.append(deleteBtn)

                                }

                                contentD.append(pen);

                                // 답변 수정 생성
                                const updateContainer = document.createElement("div");
                                updateContainer.classList.add("updateContainer");

                                const updateInput = document.createElement("textarea");
                                updateInput.classList.add("updateInput");
                                updateInput.setAttribute("id", "updateInput");

                                const updateBtnContainer = document.createElement("updateBtnContainer");
                                updateBtnContainer.classList.add("updateBtnContainer");

                                const ok = document.createElement("button");
                                ok.classList.add("ok");
                                ok.innerText ="o";

                                const cancel = document.createElement("button");
                                cancel.classList.add("cancel");
                                cancel.innerText ="x";

                                updateBtnContainer.append(ok);
                                updateBtnContainer.append(cancel);

                                updateContainer.append(updateInput);
                                updateContainer.append(updateBtnContainer);


                                freeBoardDetailAnwserContent.append(updateContainer);
                                freeBoardDetailAnwserContent.append(contentD);

                                // 대댓글 생성
                                // const rContentD = document.createElement("div");
                                // rContentD.classList.add("rContentD")
                                
                                // const rAnwserP = document.createElement("p");
                                // rAnwserP.classList.add("rAnwserP")
                                // rAnwserP.innerText = comment.memberId + " : " + comment.rCommentTextarea;
                                // rContentD.append(rAnwserP);

                                
                                // const rPen = document.createElement("div");
                                // rPen.classList.add("rPen");

                                // const updateRBtn = document.createElement("button");
                                // updateRBtn.classList.add("updateRBtn")
                                // updateRBtn.setAttribute("class", "fa-solid fa-pen");

                                // const deleteRBtn = document.createElement("button");
                                // deleteRBtn.classList.add("deleteRBtn")
                                // deleteRBtn.innerText ="x";

                                // 대댓글 등록 생성
                                const rCommentContainer = document.createElement("div");
                                rCommentContainer.classList.add("rCommentContainer");

                                const rCommentTextarea = document.createElement("textarea");
                                rCommentTextarea.classList.add("rCommentTextarea");
                                rCommentTextarea.setAttribute("id", "rCommentTextarea");
                                $(rCommentTextarea).keyup(function(){
                                    var rows = $(rCommentTextarea).val().split('\n').length;
                                    var maxRows = 1;
                                    if( rows > maxRows){
                                        // alert('3줄 까지만 가능합니다');
                                        modifiedText = $(rCommentTextarea).val().split("\n").slice(0, maxRows);
                                        $(rCommentTextarea).val(modifiedText.join("\n"));
                                    }
                                  });

                                const rCommentBtnContainer = document.createElement("div");
                                rCommentBtnContainer.classList.add("rCommentBtnContainer");

                                const rCommentOk = document.createElement("button");
                                rCommentOk.classList.add("rCommentOk");
                                rCommentOk.setAttribute("class", "fa-solid fa-check");

                                const rCommentCancel = document.createElement("button");
                                rCommentCancel.classList.add("rCommentCancel");
                                rCommentCancel.innerText ="x";

                                rCommentBtnContainer.append(rCommentOk);
                                rCommentBtnContainer.append(rCommentCancel);

                                rCommentContainer.append(rCommentTextarea);
                                rCommentContainer.append(rCommentBtnContainer);

                                freeBoardDetailAnwserContent.append(rCommentContainer);
                                // freeBoardDetailAnwserContent.append(rContentD);
                                
                                // 댓글 삭제 ajax
                                deleteBtn.addEventListener("click", () => {

                                    if( confirm("정말로 삭제 하시겠습니까?")){
                                
                                        $.ajax({
                                            url : "/comment/delete",
                                            data : {"commentNo" : comment.commentNo},
                                            type : "GET",
                                            success : function(result){
                                                console.log(comment.commentNo);
                                                if(result > 0){
                                
                                                    alert("삭제되었습니다.");
                                                    freeBoardDetailAnwserContent.innerHTML = "";
                                                    commentListFun();
                                                    
                                                } else {
                                                    alert("삭제 실패");
                                                    
                                                }
                                            },
                                            
                                            error : function(req, status, error){
                                                console.log("댓글 삭제 실패");
                                                console.log(req.responseText);
                                            }
                                        });
                                    }
                                });

                                    // 댓글 수정 ajax
                                    updateBtn.addEventListener("click", function(){
                                        
                                        updateContainer.style.display = "flex";

                                        updateInput.innerText = saveCommentContent;
                                        ok.addEventListener("click", function(){

                                            $.ajax({
                                                url:"/comment/update",
                                                data : {"commentNo" : comment.commentNo,
                                                        "commentContent" : updateInput.value},
                                                type : "post",
                                                success : function(result) {

                                                    if(result > 0) {
                                                        alert("댓글 수정 완료");

                                                        freeBoardDetailAnwserContent.innerHTML = "";
                                                        
                                                        commentListFun();

                                                    }else {
                                                        alert("수정 실패")
                                                    }
                                                },
                                                error : function(req, status, error){

                                                    console.log("댓글 삭제 실패");
                                                }
                                        
                                            });
                                        });
                                        
                                    });
                                
                                    cancel.addEventListener("click", function(){

                                        updateContainer.style.display = "none";
                                    });

                                    
                                    // 댓글 등록
                                    anwserP.addEventListener("click", function(){
                                            if(memberNo == ""){
                                                rCommentContainer.style.display = "none";
                                            }else{
                                                rCommentContainer.style.display = "flex";

                                            
                                        rCommentOk.addEventListener("click", function(){

                                            $.ajax({
                                                url : "/comment/insert",
                                                data : {"memberNo" : memberNo,
                                                        "boardNo": freeBoardOneItems.lastElementChild.id,
                                                        "parentNo": comment.commentNo,
                                                        commentContent : rCommentTextarea.value},
                                                type : "POST",
                                                success : function(result) {
                                                    if(result > 0){

                                                        freeBoardDetailAnwserContent.innerHTML = "";
                                                        alert("댓글 등록 완료");
                                                        commentListFun();

                                                    }else{
                                                        alert("댓글 등록 실패");
                                                    }
                                                },
                                                error : function(){
                                                    console.log("답글 오류 발생");
                                                }                                                    
                                            })
                                        });
                                    }
                                    });

                                    rCommentCancel.addEventListener("click", function(){
                                        
                                        rCommentContainer.style.display = "none";
                                    });
                        
                            }
                        },
                        
                        error : () => {
                            console.log("댓글 조회 실패");
                        }
                    });

                    
                }
                // 작성자와 로그인 한 회원의 이름이 같을 때 출력
                if(memberId == freeBoardDetail[0].memberId){
                    const freeBoardDetailBtn = document.createElement("div");
                    freeBoardDetailBtn.setAttribute("id", "freeBoard-detail-btn");
                    
                    const boardUpdate = document.createElement("button");
                    boardUpdate.setAttribute("id", "boardUpdate-btn");
                    boardUpdate.innerText = "수정";

                    const boardDeleteBtn = document.createElement("button");
                    boardDeleteBtn.setAttribute("id", "boardDelete-btn");
                    boardDeleteBtn.innerText = "삭제";

                    // 게시글 수정
                     boardUpdate.addEventListener("click", () => {

                        document.body.style.overflow = "hidden";
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
            
                        // 수정될 제목 / 내용
                        boardTitle.innerHTML = saveBoardTitle;
                        boardContent.innerHTML = saveContent;
            
                        //TODO : 이미지 불러오기 / 저장된 이미지
            
                        //! 이미지 만드는 create작성해야함.
                            if (freeBoardDetail[0].imageList.length != 0) {
                                boardViewContentImgArea.innerHTML = "";
                    
                                for (let i = 0; i < freeBoardDetail[0].imageList.length; i++) {
                                //TODO 아마도 수정 필요
                                if (i < 4) {
                                    
                                    const contentImgDiv = document.createElement("div");
                                    const contentImgImg = document.createElement("img");
                    
                                    contentImgDiv.classList.add("board-view-content-img");
                                    contentImgImg.setAttribute("src", freeBoardDetail[0].imageList[i].imgPath + "/" + freeBoardDetail[0].imageList[i].imgRename);
                    
                                    contentImgDiv.append(contentImgImg);
                                    boardViewContentImgArea.append(contentImgDiv);
                                }
                                }
                            } else {
                                // ContentImgArea.style.display = "none";
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

                            $.ajax({
                            url: "/QABoardUpdate",
                            type: "GET",
                            data: {
                                "boardNo": freeBoardOneItems.lastElementChild.id,
                                "boardContent": boardContent.value,
                                "boardTitle": boardTitle.value,
                            },
                            dataType: "json",
                            success: (result) => {
                                if (result > 0) {

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

                    freeBoardDetailBtn.append(boardUpdate);
                    freeBoardDetailBtn.append(boardDeleteBtn);
                    
                    freeBoardDetailView.append(freeBoardDetailBtn);

                    // 게시글 삭제
                    boardDeleteBtn.addEventListener("click", () => {
                        $.ajax({
                        url: "/freeBoardDelete",
                        type: "GET",
                        data: { boardNo: freeBoardOneItems.lastElementChild.id },
                        dataType: "json",
                        success: (result) => {
                            if (result > 0) {

                                alert("정말 게시글을 삭제 하시겠습니까?")
                                alert("게시글 삭제 성공")
                                location.reload();

                            } else {
                            alert("삭제 XXX");
                            }
                        },
                        error: () => {
                            console.log("게시물 작성중 오류발생");
                        },
                        });
                    });
                }

                commentListFun();

                // 댓글 등록 ajax
                anwserBtn.addEventListener("click", () => {
                    if(memberNo == ""){

                    } else {

                    
                    $.ajax({
                        url : "/comment/insert",
                        data : {"commentContent" : input.value,
                                "memberNo" : memberNo,
                                "boardNo" : freeBoardOneItems.lastElementChild.id},
                        type : "post",
                        success : function(result) {
                            if (result > 0){
                                alert("답변 등록 완료")

                                // 입력한 댓글 초기화
                                input.value = "";

                                // 댓글 리스트를 초기화
                                freeBoardDetailAnwserContent.innerHTML = "";

                                // 댓글 리스트를 조회하는 ajax 함수 실행
                                commentListFun();

                            } else{
                                alert("실패");
                            }

                        },

                        error : () => {
                            console.log("답변 등록 실패");
                        }
                    });
                }
                });

            },
            
            error : () => {
                console.log("실패");
            }
        });
    
    });
}
