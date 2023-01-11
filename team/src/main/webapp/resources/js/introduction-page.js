
window.addEventListener('scroll', function() {
    var scrollPosition = window.scrollY;
    var fIntroduction = document.querySelector('.first-introduction');
    var sIntroduction = document.querySelector('.second-introduction');
    var tIntroduction = document.querySelector('.third-introduction');
    var pIntroduction = document.querySelector('.fourth-introduction');
  
    // if (scrollPosition > 0) {
    //     fIntroduction.style.opacity = 1;
    // } else{
    //     fIntroduction.style.opacity = 0;
    // }

    if (scrollPosition > 300) {
        sIntroduction.style.opacity = 1;
    }else{
        sIntroduction.style.opacity = 0;
    }

    if (scrollPosition > 945) {
        tIntroduction.style.opacity = 1;

    }
    if(scrollPosition < 1100){
        tIntroduction.style.opacity = 0;
    }

    
  });