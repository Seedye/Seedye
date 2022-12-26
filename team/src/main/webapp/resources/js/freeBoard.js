const freeBoardOne = document.getElementsByClassName("freeBoard-listOne");

console.log(boardNo);

for (let freeBoardOneItems of freeBoardOne) {
    freeBoardOneItems.addEventListener("click", () => {

        const freeBoardDetailView = document.getElementById("freeBoard-detail-view");
        if(freeBoardDetailView != null){
        
            freeBoardDetailView.innerHTML ="";}
            
        $.ajax({
            url : "/freeBoardDetail",
            type : "POST",
            data : {"boardNo" : freeBoardOneItems.lastElementChild.id},
            dataType : "json",
            success : (freeBoardDetail) => {


                const bigTitle = document.createElement("p");
                bigTitle.innerText = freeBoardDetail[0].boardTitle;

                const freeBoardDetailTitle = document.createElement("div");
                freeBoardDetailTitle.setAttribute("id", "freeBoard-detail-title");

                const simpleContent = document.createElement("p");
                simpleContent.innerText ="내용";

                const smallTitleA = document.createElement("p");
                smallTitleA.innerText = freeBoardDetail[0].memberId + " / " + freeBoardDetail[0].createDate;

                // const smallTitleB = document.createElement("p");
                // smallTitleB.innerText = freeBoardDetail[0].createDate;

                freeBoardDetailTitle.append(simpleContent);
                freeBoardDetailTitle.append(smallTitleA);
                // freeBoardDetailTitle.append(smallTitleB);

                const freeBoardDetailContent = document.createElement("p");
                freeBoardDetailContent.setAttribute("id", "freeBoard-detail-content")
                freeBoardDetailContent.innerText = freeBoardDetail[0].boardContent;

                const imgContainer = document.createElement("div");
                const img = document.createElement("img");
                img.setAttribute("src",freeBoardDetail[0].imgPath);
                
                imgContainer.append(img);

                const freeBoardDetailAnwser = document.createElement("div");
                freeBoardDetailAnwser.setAttribute("id", "freeBoard-detail-anwser");

                const smallTitleC = document.createElement("p");
                const smallTitleD = document.createElement("p");

                smallTitleC.innerText = "답변";
                smallTitleD.innerText = freeBoardDetail[0].createDate;

                freeBoardDetailAnwser.append(smallTitleC);
                freeBoardDetailAnwser.append(smallTitleD);

                const freeBoardDetailAnwserContent = document.createElement("p");
                freeBoardDetailAnwserContent.setAttribute("id", "freeBoard-detail-anwser-content");

                freeBoardDetailAnwserContent.innerText = "답변 내용 샘플 데이터 넣어야함";

                const freeBoardDetailBtn = document.createElement("div");
                freeBoardDetailBtn.setAttribute("id", "freeBoard-detail-btn");

                const btnA = document.createElement("button");
                const btnB = document.createElement("button");

                btnA.setAttribute("id", "update");
                btnB.setAttribute("id", "delete");

                btnA.innerText = "수정";
                btnB.innerText = "삭제";

                freeBoardDetailBtn.append(btnA);
                freeBoardDetailBtn.append(btnB);

                freeBoardDetailView.append(bigTitle);
                freeBoardDetailView.append(freeBoardDetailTitle);
                freeBoardDetailView.append(freeBoardDetailContent);
                freeBoardDetailView.append(imgContainer);
                freeBoardDetailView.append(freeBoardDetailAnwser);
                freeBoardDetailView.append(freeBoardDetailAnwserContent);
                freeBoardDetailView.append(freeBoardDetailBtn);
                
            },
            
            error : () => {
                console.log("실패");
            }
        });
    
    });
}