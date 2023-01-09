
window.addEventListener('scroll', function() {
    var scrollPosition = window.scrollY;
    var fIntroduction = document.querySelector('.first-introduction');
    var sIntroduction = document.querySelector('.second-introduction');
    var tIntroduction = document.querySelector('.third-introduction');
    var pIntroduction = document.querySelector('.fourth-introduction');
  
    if (scrollPosition > 0) {
        fIntroduction.style.opacity = 1;
    } else{
        fIntroduction.style.opacity = 0;
    }

    if (scrollPosition > 342) {
        sIntroduction.style.opacity = 1;
    }else{
        sIntroduction.style.opacity = 0;
    }

    if (scrollPosition > 745) {
        tIntroduction.style.opacity = 1;

    }
    if(scrollPosition < 760){
        tIntroduction.style.opacity = 0;
    }

    
  });