const btn1 = document.getElementById("btn1");

btn1.addEventListener("click", function(){
    
    const pw = document.getElementById('pw');

    const currentPw = document.getElementById("currentPw");
    const newPw = document.getElementById("newPw");
    const newPwConfirm = document.getElementById("newPwConfirm");
    
    // btn1 숨기기 (display: none)
    if(pw.style.display !== 'block') {
        pw.style.display = 'block';

        currentPw.setAttribute("required", "");
        newPw.setAttribute("required", "");
        newPwConfirm.setAttribute("required", "");
        
    }
    
    // btn1 보이기 (display: block)
    else {
        pw.style.display = 'none';

        currentPw.removeAttribute("required");
        newPw.removeAttribute("required");
        newPwConfirm.removeAttribute("required");
    }
    
});