
const freeBoardOne = document.getElementsByClassName("freeBoard-listOne");

console.log(boardNo);

for (let freeBoardOneItems of freeBoardOne) {
    freeBoardOneItems.addEventListener("click", () => {

        const freeBoardDetailView = document.getElementById("freeBoard-detail-view");
        if(freeBoardDetailView != null){
        
            freeBoardDetailView.innerHTML ="";
        }
            
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
                console.log(freeBoardDetail[0].imgPath);
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

                const commentListFun = function(){
                    $.ajax({
            
                        url : "/comment/list",
                        data : {"boardNo" : freeBoardOneItems.lastElementChild.id},
                        type : "GET",
                        dataType : "json",
                        success : (rList) => {
                            console.log(rList);

                        
                            for (let comment of rList) {
                            
                            const contentD = document.createElement("div");
                            contentD.setAttribute("id", "contentD")

                            const anwserP = document.createElement("p");
                            anwserP.innerText = comment.memberId + " : " + comment.commentContent;

                            const deleteBtn = document.createElement("button");
                            deleteBtn.setAttribute("id", "deleteBtn")

                            deleteBtn.innerText ="x";

                            contentD.append(anwserP);
                            contentD.append(deleteBtn);

                            freeBoardDetailAnwserContent.append(contentD);
                            freeBoardDetailView.append(freeBoardDetailAnwser);
                            freeBoardDetailView.append(freeBoardDetailAnwserContent);

                            }

                        },
                        
                        error : () => {
                            console.log("댓글 조회 실패");
                        }
                    });
                }
                commentListFun();
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
        
        // const freeBoardDetailAnwserContent = document.createElement("div");
        // freeBoardDetailAnwserContent.setAttribute("id", "freeBoard-detail-anwser-content");

        // for (let comment of rList) {

        // const anwserP = document.createElement("p");
        // anwserP.innerText = comment.memberId + " : " + comment.commentContent;

        // freeBoardDetailAnwserContent.append(anwserP);
        // freeBoardDetailView.append(freeBoardDetailAnwser);
        // freeBoardDetailView.append(freeBoardDetailAnwserContent);

        // }
            
            },
            
            error : () => {
                console.log("실패");
            }
        });
    
    });
}