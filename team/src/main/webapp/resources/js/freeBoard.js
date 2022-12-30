
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

                console.log(freeBoardDetail);

                const bigTitle = document.createElement("p");
                bigTitle.innerText = freeBoardDetail[0].boardTitle;

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
                freeBoardDetailContent.innerText = freeBoardDetail[0].boardContent;

                const imgContainer = document.createElement("div");
                const img = document.createElement("img");
                //img.setAttribute("src",freeBoardDetail[0].imageList[0].imgPath+"/"+freeBoardDetail[0].imageList[0].imgRename);
                imgContainer.append(img);

                freeBoardDetailView.append(bigTitle);
                freeBoardDetailView.append(freeBoardDetailTitle);
                freeBoardDetailView.append(freeBoardDetailContent);
                freeBoardDetailView.append(imgContainer);
                
                const freeBoardDetailAnwser = document.createElement("div");
                freeBoardDetailAnwser.setAttribute("id", "freeBoard-detail-anwser")
                
                const anwser = document.createElement("p");
                anwser.innerText = "답글";
                
                const input = document.createElement("input");
                input.setAttribute("type", "text");
                input.setAttribute("id", "commentContent");
                
                
                const anwserBtn = document.createElement("button");
                anwserBtn.setAttribute("id","comment-btn");
                anwserBtn.innerText = "답글 작성";
                
                freeBoardDetailAnwser.append(anwser);
                freeBoardDetailAnwser.append(input);
                freeBoardDetailAnwser.append(anwserBtn);
                freeBoardDetailView.append(freeBoardDetailAnwser);
                
                const freeBoardDetailAnwserContent = document.createElement("div");
                freeBoardDetailAnwserContent.setAttribute("id", "freeBoard-detail-anwser-content");
                freeBoardDetailView.append(freeBoardDetailAnwser);
                freeBoardDetailView.append(freeBoardDetailAnwserContent);

                const commentListFun = function(){
                    // 댓글 조회 ajax
                    $.ajax({
                        url : "/comment/list",
                        data : {"boardNo" : freeBoardOneItems.lastElementChild.id},
                        type : "GET",
                        dataType : "json",
                        success : (rList) => {
                            console.log(rList);

                            for (let comment of rList) {
                            console.log(comment.memberNo);
                                
                                const contentD = document.createElement("div");
                                contentD.classList.add("contentD")
                                
                                const anwserP = document.createElement("p");
                                anwserP.innerText = comment.memberId + " : " + comment.commentContent;
                                contentD.append(anwserP);

                                // if (memberNo == comment.memberNo) {

                                    const pen = document.createElement("div");
                                    pen.classList.add("pen");

                                    const updateBtn = document.createElement("button");
                                    updateBtn.classList.add("updateBtn")
                                    updateBtn.setAttribute("class", "fa-solid fa-pen");

                                    const deleteBtn = document.createElement("button");
                                    deleteBtn.classList.add("deleteBtn")
                                    deleteBtn.innerText ="x";

                                    pen.append(updateBtn)
                                    pen.append(deleteBtn)

                                    contentD.append(pen);

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

                                // }

                                freeBoardDetailAnwserContent.append(updateContainer);
                                freeBoardDetailAnwserContent.append(contentD);
                                
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

                                    updateInput.innerText = comment.commentContent;
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
                                                console.log(req.responseText);
                                            }
                                    
                                        });
                                    });
                                    
                                });
                                
                                cancel.addEventListener("click", function(){

                                    updateContainer.style.display = "none";
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
                
                const boardUpdateBtn = document.createElement("button");
                boardUpdateBtn.setAttribute("id", "boardUpdate-btn");
                boardUpdateBtn.innerText = "수정";

                const boardDeleteBtn = document.createElement("button");
                boardDeleteBtn.setAttribute("id", "boardDelete-btn");
                boardDeleteBtn.innerText = "삭제";

                freeBoardDetailBtn.append(boardUpdateBtn);
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

                    $.ajax({
                        url : "/comment/insert",
                        data : {"commentContent" : commentContent.value,
                                "memberNo" : memberNo,
                                "boardNo" : freeBoardOneItems.lastElementChild.id},
                        type : "post",
                        success : function(result) {
                            if (result > 0){
                                alert("댓글 등록 완료")

                                // 입력한 댓글 초기화
                                commentContent.value = "";
                                // 댓글 리스트를 초기화
                                freeBoardDetailAnwserContent.innerHTML = "";
                                // 댓글 리스트를 조회하는 ajax 함수 실행
                                commentListFun();

                            } else{
                                alert("실패");
                            }

                        },

                        error : () => {
                            console.log("댓글 등록 실패");
                        }
                    });
                });

                // if(memberId == freeBoardDetail[0].memberId){
                //     const freeBoardDetailBtn = document.createElement("div");
                //     freeBoardDetailBtn.setAttribute("id", "freeBoard-detail-btn");
                    
                //     const boardUpdateBtn = document.createElement("button");
                //     boardUpdateBtn.setAttribute("id", "boardUpdate-btn");
                //     boardUpdateBtn.innerText = "수정";

                //     const boardDeleteBtn = document.createElement("button");
                //     boardDeleteBtn.setAttribute("id", "boardDelete-btn");
                //     boardDeleteBtn.innerText = "삭제";

                //     freeBoardDetailBtn.append(boardUpdateBtn);
                //     freeBoardDetailBtn.append(boardDeleteBtn);
                    
                //     freeBoardDetailView.append(freeBoardDetailBtn);
                // }
            },
            
            error : () => {
                console.log("실패");
            }
        });
    
    });
}
