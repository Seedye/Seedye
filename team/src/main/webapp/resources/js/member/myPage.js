const btn1 = document.getElementById("btn1");

btn1.addEventListener("click", function(){
    
    const pw = document.getElementById('pw');
    
    // btn1 숨기기 (display: none)
    if(pw.style.display !== 'block') {
        pw.style.display = 'block';
    }

    // btn1 보이기 (display: block)
    else {
        pw.style.display = 'none';
    }

});