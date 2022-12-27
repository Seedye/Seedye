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

  const swiperMain = document.getElementById("swiperMain");
  
  // 공지사항 클릭
  boardNotice.addEventListener("click", ()=>{
    swiperMain.style.display = "none";
    boardTest.style.display = "block";

    selectBoardNotice();
   
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



// 공지사항
function selectBoardNotice(){
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

  $.ajax({
    url:"/admin/selectBoardNotice",
    data:{"boardCode" : '1'},
    dataType : "JSON",
    success : boardNoticeList =>{

      for(let board of boardNoticeList){

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
        td6.innerHTML = "<button class='store-manage'>관리</button>"

        tr.append(td1, td2, td3, td4, td5, td6);

        tbody.append(tr);

      }
    
    },
    error:()=>{
      console.log("실패")
    }

    
  })
}




