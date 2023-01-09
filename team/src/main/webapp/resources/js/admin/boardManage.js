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
const boardTest = document.getElementById("boardTest");
const swiperMain = document.getElementById("swiperMain");
const keyword = document.getElementById("keyword");
const search = document.getElementById("search");
const pageBtn = document.getElementsByClassName("pageBtn");
const searchBtn = document.getElementById("searchBtn");


let cp =1;
boardTest.style.display = "none";




// 공지사항 클릭
  boardNotice.addEventListener("click", ()=>{
    swiperMain.style.display = "none";
    boardTest.style.display = "block";
    
    selectBoardNotice(cp);
    
  });
  

  update.addEventListener("click", ()=>{
    swiperMain.style.display = "none"
    boardTest.style.display = "block";
    selectUpdateNotice(cp);

  });

  freeBoard.addEventListener("click", ()=>{
    swiperMain.style.display = "none";
    boardTest.style.display = "block";
    selectFreeboard(cp);
  });

  question.addEventListener("click", ()=>{
    swiperMain.style.display = "none";
    boardTest.style.display = "block";
    selectQuestion(cp);
  });

  

// 공지사항
function selectBoardNotice(cp){
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";
  
  
  if(keyword == ''){
    $.ajax({
      url:"/admin/selectBoardList",
      data:{"boardCode" : '1' , "cp" : cp},
      dataType : "JSON",
      success : (map) =>{

        console.log(boardCode);
        
        const boardList = map.boardList;
        const pagination = map.pagination;
            
        
        const totalCount = pagination.listCount;

        var pageSize = pagination.pageSize;
        var totalPages = 0;
        var curPage = cp;

        for(let board of boardList){

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
          td6.innerHTML = "<button class='board-list-view' type='button'>관리</button>"

          tr.append(td1, td2, td3, td4, td5, td6);

          tbody.append(tr);


          searchBtn.addEventListener("click", ()=>{
            selectBoardNotice(cp);
          })

          const paginationMenu = document.getElementsByClassName("pagination")[0];
          // 페이지네이션
          if (totalCount != 0) {
              totalPages = Math.ceil(totalCount / pageSize);

          
              paginationMenu.innerHTML = "";

              paginationMenu.innerHTML = pageLink(curPage, totalPages);
          }    
          // cp 얻어오기

          $(".pageBtn").click(function(){

            $(this).toggleClass("checked");

          })
          $(".pageBtn").click(function(){



              var id_check = $(this).attr("id");
              
              cp = id_check;
              
              console.log(cp);

              
              if(id_check != null) selectBoardNotice(cp);

              

          })
                  

          $(".pageFirst").click(function(){
                  
              cp = 1;

              selectBoardNotice(cp);
              swiperMain.style.display = "none";

          })
          $(".pagePrev").click(function(){
              
              cp = pagination.prevPage;

              selectBoardNotice(cp);
          })
          $(".pageNext").click(function(){
              
              cp = pagination.nextPage;

              selectBoardNotice(cp);
          })
          $(".pageLast").click(function(){
              
              cp = pagination.maxPage;

              selectBoardNotice(cp);
          })

          searchBtn.addEventListener("click", ()=>{
            cp=curPage;
            selectBoardNotice(cp);
          })
         
          const boardManageBtn = document.getElementsByClassName("board-list-view");

          for(i=0; i<boardManageBtn.length; i++){

            boardManageBtn[i].addEventListener("click", ()=>{
            
              boardViewModal.style.display = "flex";

            ;
          })

        }
        }
      },
      error:()=>{
        console.log("실패")
      }

      
    }) 
  } else {
    $.ajax({
      url:"/admin/selectBoardList",
      data:{"boardCode" : '1' , "cp" : cp, "search" : search.value, "keyword":keyword.value},
      dataType : "JSON",
      success : (map) =>{

        tbody.innerHTML = "";
        
        const boardList = map.boardList;
        const pagination = map.pagination;
            
        
        const totalCount = pagination.listCount;

        var pageSize = pagination.pageSize;
        var totalPages = 0;
        var curPage = cp;

        for(let board of boardList){

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
          td6.innerHTML = "<button class='board-list-view' type='button'>관리</button>"

          tr.append(td1, td2, td3, td4, td5, td6);

          tbody.append(tr);

          const paginationMenu = document.getElementsByClassName("pagination")[0];
          // 페이지네이션
          if (totalCount != 0) {
              totalPages = Math.ceil(totalCount / pageSize);

          
              paginationMenu.innerHTML = "";

              paginationMenu.innerHTML = pageLink(curPage, totalPages);
          }    
          // cp 얻어오기

          $(".pageBtn").click(function(){

              var id_check = $(this).attr("id");
              
              cp = id_check;
              
              console.log(cp);
              
              if(id_check != null) selectBoardNotice(cp); 
              

          })
                  

          $(".pageFirst").click(function(){
                  
              cp = 1;

              selectBoardNotice(cp);
          })
          $(".pagePrev").click(function(){
              
              cp = pagination.prevPage;

              selectBoardNotice(cp);
          })
          $(".pageNext").click(function(){
              
              cp = pagination.nextPage;

              selectBoardNotice(cp);
          })
          $(".pageLast").click(function(){
              
              cp = pagination.maxPage;

              selectBoardNotice(cp);
          })
          searchBtn.addEventListener("click", ()=>{
            cp=curPage;
            selectBoardNotice(cp);
          })

          
const boardManageBtn = document.getElementsByClassName("board-list-view");

for(i=0; i<boardManageBtn.length; i++){

  boardManageBtn[i].addEventListener("click", ()=>{

    boardViewModal.style.display = "flex";

  })
}



        }
      
      },
      error:()=>{
        console.log("실패")
      }

      
    }) 
  }  
}





  
// 업데이트
function selectUpdateNotice(cp){
  const tbody = document.getElementById("tbody");
  
  if(keyword.value == ''){
    $.ajax({
      url:"/admin/selectBoardList",
      data:{"boardCode" : '2', "cp":cp},
      dataType : "JSON",
    success : (map) =>{
      tbody.innerHTML = "";

      const boardList = map.boardList;
      const pagination = map.pagination;
          
      
      const totalCount = pagination.listCount;

      var pageSize = pagination.pageSize;
      var totalPages = 0;
      var curPage = cp;


      for(let board of boardList){

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
        td6.innerHTML = "<button class='board-list-view' type='button'>관리</button>"

        tr.append(td1, td2, td3, td4, td5, td6);

        tbody.append(tr);

        const paginationMenu = document.getElementsByClassName("pagination")[0];
        // 페이지네이션
        if (totalCount != 0) {
            totalPages = Math.ceil(totalCount / pageSize);

        
            paginationMenu.innerHTML = "";

            paginationMenu.innerHTML = pageLink(curPage, totalPages);
        }
        $(".pageBtn").click(function(){

          var id_check = $(this).attr("id");
          
          cp = id_check;
          
          console.log(cp);

          
          if(id_check != null) selectUpdateNotice(cp); 
          

      })
               

      $(".pageFirst").click(function(){
              
          cp = 1;

          selectUpdateNotice(cp);
      })
      $(".pagePrev").click(function(){
          
          cp = pagination.prevPage;

          selectUpdateNotice(cp);
      })
      $(".pageNext").click(function(){
          
          cp = pagination.nextPage;

          selectUpdateNotice(cp);
      })
      $(".pageLast").click(function(){
          
          cp = pagination.maxPage;

          selectUpdateNotice(cp);
      })

          searchBtn.addEventListener("click", ()=>{
            selectUpdateNotice(cp);
          })

          
const boardManageBtn = document.getElementsByClassName("board-list-view");

for(i=0; i<boardManageBtn.length; i++){

  boardManageBtn[i].addEventListener("click", ()=>{

    boardViewModal.style.display = "flex";
  })
}



    }
    },
    error:()=>{
      console.log("실패")
    }

    
    })
  } else{
    $.ajax({
      url:"/admin/selectBoardList",
      data:{"boardCode" : '2', "cp":cp, "search":search.value, "keyword":keyword.value},
      dataType : "JSON",
      success : (map) =>{
        tbody.innerHTML = "";


        const boardList = map.boardList;
        const pagination = map.pagination;
            
        
        const totalCount = pagination.listCount;

        var pageSize = pagination.pageSize;
        var totalPages = 0;
        var curPage = cp;
  
        for(let board of boardList){
  
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
          td6.innerHTML = "<button class='board-list-view'>관리</button>"
  
          tr.append(td1, td2, td3, td4, td5, td6);
  
          tbody.append(tr);
  
          const paginationMenu = document.getElementsByClassName("pagination")[0];
          // 페이지네이션
          if (totalCount != 0) {
              totalPages = Math.ceil(totalCount / pageSize);
  
          
              paginationMenu.innerHTML = "";
  
              paginationMenu.innerHTML = pageLink(curPage, totalPages);
          }
          $(".pageBtn").click(function(){
  
            var id_check = $(this).attr("id");
            
            cp = id_check;
            
            console.log(cp);
  
            
            if(id_check != null) selectUpdateNotice(cp); 
            
  
        })
                 
  
        $(".pageFirst").click(function(){
                
            cp = 1;
  
            selectUpdateNotice(cp);
        })
        $(".pagePrev").click(function(){
            
            cp = pagination.prevPage;
  
            selectUpdateNotice(cp);
        })
        $(".pageNext").click(function(){
            
            cp = pagination.nextPage;
  
            selectUpdateNotice(cp);
        })
        $(".pageLast").click(function(){
            
            cp = pagination.maxPage;
  
            selectUpdateNotice(cp);
        })

        searchBtn.addEventListener("click", ()=>{
          selectUpdateNotice(cp);
        })

        
const boardManageBtn = document.getElementsByClassName("board-list-view");

for(i=0; i<boardManageBtn.length; i++){

  boardManageBtn[i].addEventListener("click", ()=>{

    boardViewModal.style.display = "flex";
  })
}

  
      
        }
      },
      error:()=>{
        console.log("실패")
      }
  
      
      })
  }  
}

// 자유게시판
function selectFreeboard(cp){
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";
  if(keyword.value == ''){
    $.ajax({
      url:"/admin/selectBoardList",
      data:{"boardCode" : '3', "cp" :cp},
      dataType : "JSON",
      success : (map) =>{
        tbody.innerHTML = "";


        const boardList = map.boardList;
        const pagination = map.pagination;
            
        
        const totalCount = pagination.listCount;

        var pageSize = pagination.pageSize;
        var totalPages = 0;
        var curPage = cp;


        for(let board of boardList){

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
          td6.innerHTML = "<button class='board-list-view'>관리</button>"

          tr.append(td1, td2, td3, td4, td5, td6);

          tbody.append(tr);

          const paginationMenu = document.getElementsByClassName("pagination")[0];
          // 페이지네이션
          if (totalCount != 0) {
              totalPages = Math.ceil(totalCount / pageSize);

          
              paginationMenu.innerHTML = "";

              paginationMenu.innerHTML = pageLink(curPage, totalPages);

          }
          $(".pageBtn").click(function(){

            var id_check = $(this).attr("id");
            
            cp = id_check;
            
            console.log(cp);

            
            if(id_check != null) selectFreeboard(cp); 
            

        })
                

        $(".pageFirst").click(function(){
                
            cp = 1;

            selectFreeboard(cp);
        })
        $(".pagePrev").click(function(){
            
            cp = pagination.prevPage;

            selectFreeboard(cp);
        })
        $(".pageNext").click(function(){
            
            cp = pagination.nextPage;

            selectFreeboard(cp);
        })
        $(".pageLast").click(function(){
            
            cp = pagination.maxPage;

            selectFreeboard(cp);
        })

        searchBtn.addEventListener("click", ()=>{
          selectFreeboard(cp);
        })

        
const boardManageBtn = document.getElementsByClassName("board-list-view");

for(i=0; i<boardManageBtn.length; i++){

  boardManageBtn[i].addEventListener("click", ()=>{

    boardViewModal.style.display = "flex";
  })
}


        }
     
      },
      error:()=>{
        console.log("실패")
      }

      
    })
  } else {
    $.ajax({
      url:"/admin/selectBoardList",
      data:{"boardCode" : '3', "cp" :cp, "search":search.value, "keyword":keyword.value},
      dataType : "JSON",
      success : (map) =>{

        tbody.innerHTML = "";

        const boardList = map.boardList;
        const pagination = map.pagination;
            
        
        const totalCount = pagination.listCount;

        var pageSize = pagination.pageSize;
        var totalPages = 0;
        var curPage = cp;

        for(let board of boardList){

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
          td6.innerHTML = "<button class='board-list-view'>관리</button>"

          tr.append(td1, td2, td3, td4, td5, td6);

          tbody.append(tr);

          const paginationMenu = document.getElementsByClassName("pagination")[0];
          // 페이지네이션
          if (totalCount != 0) {
              totalPages = Math.ceil(totalCount / pageSize);

          
              paginationMenu.innerHTML = "";

              paginationMenu.innerHTML = pageLink(curPage, totalPages);

          }
          $(".pageBtn").click(function(){

            var id_check = $(this).attr("id");
            
            cp = id_check;
            
            console.log(cp);

            
            if(id_check != null) selectFreeboard(cp); 
            

        })
                

        $(".pageFirst").click(function(){
                
            cp = 1;

            selectFreeboard(cp);
        })
        $(".pagePrev").click(function(){
            
            cp = pagination.prevPage;

            selectFreeboard(cp);
        })
        $(".pageNext").click(function(){
            
            cp = pagination.nextPage;

            selectFreeboard(cp);
        })
        $(".pageLast").click(function(){
            
            cp = pagination.maxPage;

            selectFreeboard(cp);
        })

        searchBtn.addEventListener("click", ()=>{
          selectFreeboard(cp);
        })

        
const boardManageBtn = document.getElementsByClassName("board-list-view");

for(i=0; i<boardManageBtn.length; i++){

  boardManageBtn[i].addEventListener("click", ()=>{

    boardViewModal.style.display = "flex";
  })
}


        }
     
      },
      error:()=>{
        console.log("실패")
      }

      
    })
  }  
}

// 문의게시판
function selectQuestion(cp){
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";
  if(keyword.value==''){
    $.ajax({
      url:"/admin/selectBoardList",
      data:{"boardCode" : '4', "cp":cp},
      dataType : "JSON",
      success : (map) =>{

        tbody.innerHTML = "";


        const boardList = map.boardList;
        const pagination = map.pagination;
            
        
        const totalCount = pagination.listCount;

        var pageSize = pagination.pageSize;
        var totalPages = 0;
        var curPage = cp;

        for(let board of boardList){

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
          td6.innerHTML = "<button class='board-list-view'>관리</button>"

          tr.append(td1, td2, td3, td4, td5, td6);

          tbody.append(tr);


          const paginationMenu = document.getElementsByClassName("pagination")[0];
          // 페이지네이션
          if (totalCount != 0) {
              totalPages = Math.ceil(totalCount / pageSize);

          
              paginationMenu.innerHTML = "";

              paginationMenu.innerHTML = pageLink(curPage, totalPages);

          }

          $(".pageBtn").click(function(){

            var id_check = $(this).attr("id");
            
            cp = id_check;
            
            console.log(cp);
            $(this).toggleClass("checked");

            
            if(id_check != null) selectQuestion(cp); 
            

        })
                

        $(".pageFirst").click(function(){
                
            cp = 1;

            selectQuestion(cp);
        })
        $(".pagePrev").click(function(){
            
            cp = pagination.prevPage;

            selectQuestion(cp);
        })
        $(".pageNext").click(function(){
            
            cp = pagination.nextPage;

            selectQuestion(cp);
        })
        $(".pageLast").click(function(){
            
            cp = pagination.maxPage;

            selectQuestion(cp);
        })

        searchBtn.addEventListener("click", ()=>{
          selectQuestion(cp);
        })

        
const boardManageBtn = document.getElementsByClassName("board-list-view");

for(i=0; i<boardManageBtn.length; i++){

  boardManageBtn[i].addEventListener("click", ()=>{

    boardViewModal.style.display = "flex";

  })
}

    
        
        }
      },
      error:()=>{
        console.log("실패")
      }

      
    })
  } else {
    $.ajax({
      url:"/admin/selectBoardList",
      data:{"boardCode" : '4', "cp":cp, "search":search.value, "keyword":keyword.value},
      dataType : "JSON",
      success : (map) =>{

        tbody.innerHTML = "";

        const boardList = map.boardList;
        const pagination = map.pagination;
            
        
        const totalCount = pagination.listCount;

        var pageSize = pagination.pageSize;
        var totalPages = 0;
        var curPage = cp;

        for(let board of boardList){

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
          td6.innerHTML = "<button class='board-list-view'>관리</button>"

          tr.append(td1, td2, td3, td4, td5, td6);

          tbody.append(tr);


          const paginationMenu = document.getElementsByClassName("pagination")[0];
          // 페이지네이션
          if (totalCount != 0) {
              totalPages = Math.ceil(totalCount / pageSize);

          
              paginationMenu.innerHTML = "";

              paginationMenu.innerHTML = pageLink(curPage, totalPages);

          }

          $(".pageBtn").click(function(){
            $(this).toggleClass("checked");
            
            var id_check = $(this).attr("id");
            
            cp = id_check;
            
            console.log(cp);

            

            
            if(id_check != null) selectQuestion(cp); 
            

        })
                

        $(".pageFirst").click(function(){
                
            cp = 1;

            selectQuestion(cp);
        })
        $(".pagePrev").click(function(){
            
            cp = pagination.prevPage;

            selectQuestion(cp);
        })
        $(".pageNext").click(function(){
            
            cp = pagination.nextPage;

            selectQuestion(cp);
        })
        $(".pageLast").click(function(){
            
            cp = pagination.maxPage;

            selectQuestion(cp);
        })

        searchBtn.addEventListener("click", ()=>{
          selectQuestion(cp);
        })
        
const boardManageBtn = document.getElementsByClassName("board-list-view");

for(i=0; i<boardManageBtn.length; i++){

  boardManageBtn[i].addEventListener("click", ()=>{

    boardViewModal.style.display = "flex";
  })
}


    
        }
      },
      error:()=>{
        console.log("실패")
      }

      
    })
  }  
}

function pageLink(curPage, totalPages) {
	var pageUrl = "";
	
	var pageLimit = 10;
	var startPage = parseInt((curPage - 1) / pageLimit) * pageLimit + 1;
	var endPage = startPage + pageLimit - 1;
	
    
    
	if (totalPages < endPage) {
	    endPage = totalPages;
	}
	
	var nextPage = endPage + 1;
	
    // console.log(curPage,"curPage,",startPage,"startPage,",endPage,"endPage,",nextPage,"nextPage", totalPages, "totalPages")
	
	//맨 첫 페이지
	if (curPage > 1 && pageLimit < curPage) {
	    pageUrl += "<button class='pageFirst''pageBtn' href='javascript:void(0);'"+  "(1);'>&lt;&lt;</button>";
	}

	//이전 페이지
	if (curPage > pageLimit) {
	    pageUrl += "<button class='pagePrev''pageBtn' href='javascript:void(0);'"  + "(" + (startPage == 1 ? 1 : startPage - 1) + ");'>&lt;</button>";
	}

	//~pageLimit 맞게 페이지 수 보여줌
	for (var i = startPage; i <= endPage; i++) {
	    //현재페이지면 진하게 표시
	    if (i == curPage) {
	        pageUrl += "<button class='pageBtn' href='javascript:void(0);' onclick='window.checked(event)'>" + i + "</button>"
	    } else {
	        pageUrl += "<button class='pageBtn' href='javascript:void(0);'  + id="+i+">" + i + " </button>";
	    }
	}
	//다음 페이지
	if (nextPage <= totalPages) {
	    pageUrl += "<button class='pageNext' 'pageBtn' href='javascript:void(0);'" + "(" + (nextPage < totalPages ? nextPage : totalPages) + ");'>&gt;</button>";
	}
	//맨 마지막 페이지
	if (curPage < totalPages && nextPage < totalPages) {
	    pageUrl += "<button class='pageLast''pageBtn' href='javascript:void(0);'"  + "(" + totalPages + ");>&gt;&gt;</button>";
	}
	// console.log(pageUrl);
    
	return pageUrl;
    
  
}

// 상세 보기 모달 연결 / 
// js = QAview
// jsp = boardView





 checked = function(event){

  var check = event.target;
  check.classList.toggle('checked');

  
}


