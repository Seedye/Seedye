var mySwiper = new Swiper('.swiper-container', {
    navigation: {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next',
    },
  });


  const boardNotice = document.getElementById("boardNotice");
  const update = document.getElementById("update");
  const freeBoard = document.getElementById("freeBoard");
  const question = document.getElementById("question");

  const swiperMain = document.getElementById("swiperMain");
  
  boardNotice.addEventListener("click", ()=>{
    swiperMain.style.display = "none";
    // ajax로 공지사항 불러오기  
  });

  update.addEventListener("click", ()=>{
    swiperMain.style.display = "none";
    // 업데이트 불러오기
  });

  freeBoard.addEventListener("click", ()=>{
    swiperMain.style.display = "none";
    // 자유게시판 불러오기
  });

  question.addEventListener("click", ()=>{
    swiperMain.style.display = "none";
    // 문의게시판 불러오기
  });


