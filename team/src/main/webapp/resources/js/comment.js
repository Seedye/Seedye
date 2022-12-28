
// for (let freeBoardOneItems of freeBoardOne) {

//     freeBoardOneItems.addEventListener("click", () => {

//     const freeBoardDetailView = document.getElementById("freeBoard-detail-view");
//     $.ajax({
       
//             url : "/comment/list",
//             data : {"boardNo" : boardNo},
//             type : "GET",
//             dataType : "json",
//             success : (rList) => {
//                 console.log(rList);

//                 const freeBoardDetailAnwser = document.createElement("div");
//                 freeBoardDetailAnwser.setAttribute("id", "freeBoard-detail-anwser")

//                 const anwser = document.createElement("p");
//                 anwser.innerText = "답변";

//                 const input = document.createElement("input");
//                 input.setAttribute("type", "text");

//                 const anwserBtn = document.createElement("button");
//                 anwserBtn.innerText = "답글 작성";

//                 freeBoardDetailAnwser.append(anwser);
//                 freeBoardDetailAnwser.append(input);
//                 freeBoardDetailAnwser.append(anwserBtn);

//                 const freeBoardDetailAnwserContent = document.createElement("div");
//                 freeBoardDetailAnwserContent.setAttribute("id", "freeBoard-detail-anwser-content");

//                 const anwserP = document.createElement("p");
//                 anwserP.innerText = "작성자" // comment.memberId + " : " + comment.commentContent;

//                 freeBoardDetailAnwserContent.append(anwserP);


//                 freeBoardDetailView.append(freeBoardDetailAnwser);
//                 freeBoardDetailView.append(freeBoardDetailAnwserContent);


//             },

//             error : () => {
//                 console.log("댓글 조회 실패");
//             }
//         });
//     }) 
// }

const commentBtn = document.getElementById("comment-btn");
commentBtn.addEventListener("click", () => {
    
    $.ajax({
        url : "/comment/insert",
        data : {"commentContent" : commentContent.value,
                "memberNo" : memberNo,
                "boardNo" : boardNo},
        type : "post",
        success : function(result) {
            if (result>0){
                alert("댓글 등록 완료")

                commentContent.value = "";
            
                function selectCommentList(){           
                    
                    $.ajax({
                        url : "/comment/list",
                        data : {"boardNo" : boardNo},
                        type : "GET",
                        dataType : "json",
                        success : (rList) => {
                            console.log(rList);
            
                            const freeBoardDetailAnwser = document.createElement("div");
                            freeBoardDetailAnwser.setAttribute("id", "freeBoard-detail-anwser")
                            
                            const anwser = document.createElement("p");
                            anwser.innerText = "답글";
                            
                            const input = document.createElement("input");
                            input.setAttribute("type", "text");
                            
                            const anwserBtn = document.createElement("button");
                            anwserBtn.setAttribute("id","comment-btn");
                            anwserBtn.innerText = "답글 작성";
                            
                            freeBoardDetailAnwser.append(anwser);
                            freeBoardDetailAnwser.append(input);
                            freeBoardDetailAnwser.append(anwserBtn);
                            
                                
                            const freeBoardDetailAnwserContent = document.createElement("div");
                            freeBoardDetailAnwserContent.setAttribute("id", "freeBoard-detail-anwser-content");
                            
                            for (let comment of rList) {
        
                            const anwserP = document.createElement("p");
                            anwserP.innerText = comment.memberId + " : " + comment.commentContent;
            
                            freeBoardDetailAnwserContent.append(anwserP);
            
            
                            freeBoardDetailView.append(freeBoardDetailAnwser);
                            freeBoardDetailView.append(freeBoardDetailAnwserContent);
            
                            }
                        },
            
                        error : () => {
                            console.log("댓글 조회 실패");
                        }
                    });
                }

            } else{
                alert("실패");
            }
        },

        error : () => {
            console.log("댓글 등록 실패");
        }
    })
});