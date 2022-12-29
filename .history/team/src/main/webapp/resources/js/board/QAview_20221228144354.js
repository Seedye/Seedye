const boardViewModal = document.getElementById("boardViewModal"); // 상세보기 모달
const boardViewX = document.getElementById("boardViewX"); // 상세보기 X

// 상세보기 눌렀을 때
boardView[0].addEventListener("click", ()=>{
  boardViewModal.style.display="flex";
  document.body.style.overflow = "hidden";
});

// 상세보기 X
boardViewX.addEventListener("click", ()=>{
  boardViewModal.style.display = "none";
  document.body.style.overflow = "unset";
});
boardViewX.addEventListener("click", ()=>{
  boardViewModal.style.display = "none";
  document.body.style.overflow = "unset";
});