const btn1 = document.getElementById("btn1");
const pw = document.getElementById('pw');

const currentPw = document.getElementById("currentPw");
const newPw = document.getElementById("newPw");
const newPwConfirm = document.getElementById("newPwConfirm");

const checkObj = {
    "newPw"        : false, /* 새 비밀번호 */
    "newPwConfirm" : false, /* 새 비밀번호 확인 */
};

document.getElementById("myPage-frm").addEventListener("submit", function(event){

    for(let key in checkObj){

        let str;

        // checkObj 속성 하나를 꺼내 값을 검사했는데 false인 경우
        if(!checkObj[key]){

            switch(key){
            case "newPw"    :  str = "새 비밀번호가 유효하지 않습니다."; break; 
            case "newPwConfirm" :  str = "새 비밀번호 확인이 유효하지 않습니다."; break;
        }

            alert(str); // 대화상자 출력

            // 유효하지 않은 입력으로 포커스 이동
            document.getElementById(key).focus();

            event.preventDefault(); // 제출 이벤트 제거
            return; // 함수 종료
        }
    }
});

const regEx = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#^)(_+=|-])[A-Za-z\d@$!%*?&#^)(_+=|-]{8,16}$/;

btn1.addEventListener("click", function(){

    // btn1 보이기 (display: block)
    if(pw.style.display !== 'block') {
        pw.style.display = 'block';

        // currentPw.setAttribute("required", "");
        // newPw.setAttribute("required", "");
        // newPwConfirm.setAttribute("required", "");

        

        

        // 비밀번호 유효성 검사
        const pwMessage = document.getElementById("pwMessage");
        const newPwMessage = document.getElementById("newPwMessage");

        // 새 비밀번호 입력 시
        newPw.addEventListener("input", function(){

            // 새 비밀번호가 입력되지 않은 경우
            if(newPw.value.trim().length == 0){
                pwMessage.innerText = "영문, 숫자, 특수문자를 각 하나 이상 포함해 8~16 글자 사이로 입력해주세요.";
                newPw.value = "";
                pwMessage.classList.remove("confirm", "error"); // 검정 글씨로 변환
                checkObj.newPw = false;
                return;

            }

            // 새 비밀번호 정규표현식 검사
            

            if(regEx.test(newPw.value)){
                checkObj.newPw = true;

                if(newPwConfirm.value.trim().length == 0){
                    pwMessage.innerText = "유효한 비밀번호 형식입니다.";
                    pwMessage.classList.add("confirm");
                    pwMessage.classList.remove("error");

                } else {
                    
                    if(newPw.value == newPwConfirm.value){
                        pwMessage.innerText = "변경할 비밀번호가 일치합니다.";
                        pwMessage.classList.add("confirm");
                        pwMessage.classList.remove("error");
                        checkObj.newPwConfirm = true;

                    } else {
                        pwMessage.innerText = "변경할 비밀번호가 일치하지 않습니다."
                        pwMessage.classList.add("error");
                        pwMessage.classList.remove("confirm");
                        checkObj.newPwConfirm = false;
                    }

                }

            } else {
                pwMessage.innerText = "비밀번호 형식이 유효하지 않습니다.";
                pwMessage.classList.add("error");
                pwMessage.classList.remove("confirm");
                checkObj.newPw = false;                
            }

        });

        // 새 비밀번호 확인 유효성 검사
        newPwConfirm.addEventListener("input", function(){
            
            if(checkObj.newPw){
                
                if(newPw.value == newPwConfirm.value){
                    pwMessage.innerText = "비밀번호가 일치합니다.";
                    pwMessage.classList.add("confirm");
                    pwMessage.classList.remove("error");
                    checkObj.newPwConfirm = true;
                
                } else{
                    pwMessage.innerText = "비밀번호가 일치하지 않습니다.";
                    pwMessage.classList.add("error");
                    pwMessage.classList.remove("confirm");
                    checkObj.newPwConfirm = false;
                }
            
            }else{ // 비밀번호가 유효하지 않은경우
                
                checkObj.newPwConfirm = false;
            }
        
        })

    // 위에까진 성공.

    newPwConfirm.addEventListener("input", ()=>{
        

        if(newPwConfirm.value.trim().length == 0){
            newPwMessage.innerText = "영문, 숫자, 특수문자를 각 하나 이상 포함해 8~16 글자 사이로 입력해주세요.";
            newPwConfirm.value = "";
            newPwMessage.classList.remove("confirm", "error");
            checkObj.newPwConfirm = false;
            return;
        }

        if (regEx.test(newPwConfirm.value)){
            newPwMessage.innerText = "유효한 비밀번호 형식입니다.";
            newPwMessage.classList.add("confirm");
            newPwMessage.classList.remove("error");
            checkObj.newPwConfirm = true;

        } else{
            newPwMessage.innerText = "새 비밀번호와 일치하지 않습니다.";
            newPwMessage.classList.add("error");
            newPwMessage.classList.remove("confirm");
            checkObj.newPwConfirm = false;
        }
    });

//

newPwConfirm.addEventListener("input", function(){
            
    if(checkObj.newPw){
        
        if(newPw.value == newPwConfirm.value){
            newPwMessage.innerText = "새 비밀번호와 일치합니다.";
            newPwMessage.classList.add("confirm");
            newPwMessage.classList.remove("error");
            checkObj.newPwConfirm = true;
        
        } else{
            newPwMessage.innerText = "새 비밀번호와 일치하지 않습니다.";
            newPwMessage.classList.add("error");
            newPwMessage.classList.remove("confirm");
            checkObj.newPwConfirm = false;
        }
    
    }else{ // 비밀번호가 유효하지 않은경우
        
        checkObj.newPwConfirm = false;
    }

})

//


    // btn1 숨기기 (display: none)
    } else {
        pw.style.display = 'none';

        currentPw.removeAttribute("required");
        newPw.removeAttribute("required");
        newPwConfirm.removeAttribute("required");
    }

});

// 전화번호 오토하이픈
const autoHyphen = (target) => {
    target.value = target.value
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
}