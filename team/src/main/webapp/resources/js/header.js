 // 페이지가 로드된 후 스크롤 이벤트를 감지
 let flag = true;
 window.addEventListener("scroll", function() {
 
    // 현재 스크롤 위치를 조회
    var scrollTop = window.pageYOffset;
 
    var headerSection = document.getElementById("header-section");
    var logoContaniner = document.getElementById("logo-container");
    var logo = document.getElementById("logo");
    var logoContent = document.getElementById("logo-content");
    var headerContainer = document.getElementById("header-container");
    var ulContainer = document.getElementById("ul-container");
    var nacVar = document.getElementById("nav-bar");
    var login = document.getElementById("login");
    var login2 = document.getElementById("login2");
    var header = document.querySelector("header");

    // 스크롤 위치가 일정 값 이상이면 scrolled 클래스 추가, 이 값 미만이면 제거
    if (scrollTop > 100 && flag) {

        this.document.querySelector("header").style.position = "sticky";

        headerSection.classList.add("scrolled");
        logoContaniner.classList.add("scrolled");
        logo.classList.add("scrolled");
        logoContent.classList.add("scrolled");
        headerContainer.classList.add("scrolled");
        ulContainer.classList.add("scrolled");
        nacVar.classList.add("scrolled");
        login.classList.add("scrolled");
        login2.classList.add("scrolled");
        header.classList.add("scrolled");

        flag = false;
        return;
    } 
    
    if (scrollTop <= 0 && !flag) {

        // this.document.querySelector("header").style.position = "initial";
        
        headerSection.classList.remove("scrolled");
        logoContaniner.classList.remove("scrolled");
        logo.classList.remove("scrolled");
        logoContent.classList.remove("scrolled");
        headerContainer.classList.remove("scrolled");
        ulContainer.classList.remove("scrolled");
        nacVar.classList.remove("scrolled");
        login.classList.remove("scrolled");
        login2.classList.remove("scrolled");
        header.classList.remove("scrolled");
        flag = true;

        window.scrollTo({ left: 0, top: 50 });
    }
  });