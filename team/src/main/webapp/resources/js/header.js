 // 페이지가 로드된 후 스크롤 이벤트를 감지
 window.addEventListener("scroll", function() {
    // 현재 스크롤 위치를 조회
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // 스크롤 위치가 일정 값 이상이면 scrolled 클래스 추가, 이 값 미만이면 제거
    var headerSection = document.getElementById("header-section");
    var logo = document.getElementById("logo");
    var logoContent = document.getElementById("logo-content");
    var headerContainer = document.getElementById("header-container");
    var ulContainer = document.getElementById("ul-container");
    var nacVar = document.getElementById("nav-bar");
    var login = document.getElementById("login");
    var login2 = document.getElementById("login2");
    if (scrollTop > 1) {

        headerSection.classList.add("scrolled");
        logo.classList.add("scrolled");
        logoContent.classList.add("scrolled");
        headerContainer.classList.add("scrolled");
        ulContainer.classList.add("scrolled");
        nacVar.classList.add("scrolled");
        login.classList.add("scrolled");
        login2.classList.add("scrolled");

    } else {

        headerSection.classList.remove("scrolled");
        logo.classList.remove("scrolled");
        logoContent.classList.remove("scrolled");
        headerContainer.classList.remove("scrolled");
        ulContainer.classList.remove("scrolled");
        nacVar.classList.remove("scrolled");
        login.classList.remove("scrolled");
        login2.classList.remove("scrolled");
    }
  });