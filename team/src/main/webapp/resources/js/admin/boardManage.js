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
    boardTest.style.display = "block";
  });

  update.addEventListener("click", ()=>{
    swiperMain.style.display = "none";
  });

  freeBoard.addEventListener("click", ()=>{
    swiperMain.style.display = "none";
  });

  question.addEventListener("click", ()=>{
    swiperMain.style.display = "none";
  });

const boardTest = document.getElementById("boardTest");
boardTest.style.display = "none";


