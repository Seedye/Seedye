const boardViewModal = document.getElementById("boardViewModal"); // 상세보기 모달
const boardViewX = document.getElementById("boardViewX"); // 상세보기 X

const boardListView = document.getElementsByClassName("board-list-view");
// 상세보기 눌렀을 때
for(let boardListViewItems of boardListView){

  boardListViewItems.addEventListener("click", ()=>{
    boardViewModal.style.display="flex";
    document.body.style.overflow = "hidden";
  
    $.ajax({
      url : "QABoardDetail",
      type : "POST",
      data : {"boardNo" : boardNo},
      dataType : "json",
      success : ()=>{
        console.log(QABoardDetail);


      }
      // error : ()=>{
  
      // }
    });
  });
}


// 상세보기 X
boardViewX.addEventListener("click", ()=>{
  boardViewModal.style.display = "none";
  document.body.style.overflow = "unset";
});
boardViewX.addEventListener("click", ()=>{
  boardViewModal.style.display = "none";
  document.body.style.overflow = "unset";
});