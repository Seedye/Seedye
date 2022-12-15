const checkObj = {
    "memberId"        : false, /* 아이디 */
    "memberPw"        : false, /* 비밀번호 */
    "memberPwConfirm" : false, /* 비밀번호 확인 */
    "memberTel"       : false, /* 전화번호 */
    "authKey"         : false  /* 인증번호 */
};

document.getElementById("signUp-frm").addEventListener("submit", function(event){

    for(let key in checkObj){

        let str;

        // checkObj 속성 하나를 꺼내 값을 검사했는데 false인 경우
        if(!checkObj[key]){

            switch(key){
            case "memberId" :  str = "이메일이 유효하지 않습니다."; break;
            case "memberPw"    :  str = "비밀번호가 유효하지 않습니다."; break; 
            case "memberPwConfirm" :  str = "비밀번호 확인이 유효하지 않습니다."; break;
            case "memberTel" : str = "전화번호가 유효하지 않습니다."; break;
            case "authKey" : str = "인증이 완료되지 않았습니다."; break;
        }

            alert(str); // 대화상자 출력

            // 유효하지 않은 입력으로 포커스 이동
            document.getElementById(key).focus();

            event.preventDefault(); // 제출 이벤트 제거
            return; // 함수 종료
        }
    }
});

// 아이디 유효성 검사
const memberId = document.getElementById("memberId");
const idMessage = document.getElementById("idMessage");

// input 이벤트 : input 태그에 입력이 되었을 경우 (모든 입력 인식)
memberId.addEventListener("input", function(){

    // 문자가 입력되지 않은 경우
    if(memberId.ariaValueMax.trim().length == 0){
        idMessage.innerText = "사용하고 싶은 아이디를 입력해주세요.";
        memberId.value = "";

        // confirm, error 클래스 제거 -> 검정 글씨로 만들기
        idMessage.classList.remove("confirm", "error");

        // 유효성 검사 확인 객체에 현재 상태 저장
        checkObj.memberId = false;
        return;
    }

    // 정규표현식을 이용한 유효성 검사




});

// 비밀번호 유효성 검사
const memberPw = document.getElementById("memberPw");
const memberPwConfirm = document.getElementById("memberPwConfirm");
const pwMessage = document.getElementById("pwMessage");

// 비밀번호 입력 시
memberPw.addEventListener("input", function(){

    // 비밀번호가 입력되지 않은 경우
    if(memberPw.value.trim().length == 0){
        pwMessage.innerText = "소문자, 대문자, 숫자, 특수문자를 각 하나 이상 포함해 8~16 글자 사이로 입력해주세요.";
        memberPw.value = "";
        pwMessage.classList.remove("confirm", "error"); // 검정 글씨로 변환
        checkObj.memberPw = false; 
        return;
    }

    // 비밀번호 정규표현식 검사
    const regEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

    if(regEx.test(memberPw.value)){ // 유효한 비밀번호
        checkObj.memberPw = true;

        // 유효한 비밀번호 + 확인 작성 X
        if(memberPwConfirm.value.trim().length == 0){
            pwMessage.innerText = "유효한 비밀번호 형식입니다.";
            pwMessage.classList.add("confirm");
            pwMessage.classList.remove("error");

        } else{ // 유효한 비밀번호 + 확인 작성 O -> 같은지 비교

            // 비밀번호가 입력 될 때
            // 비밀번호 확인에 작성된 값과 일치하는 경우
            if(memberPw.value == memberPwConfirm.value){
                pwMessage.innerText = "비밀번호가 일치합니다.";
                pwMessage.classList.add("confirm");
                pwMessage.classList.remove("error");
                checkObj.memberPwConfirm = true;

            } else{ // 일치하지 않는 경우
                pwMessage.innerText = "비밀번호가 일치하지 않습니다.";
                pwMessage.classList.add("error");
                pwMessage.classList.remove("confirm");
                checkObj.memberPwConfirm = false;
            }
        }

        
    } else { // 유효하지 않음
        pwMessage.innerText = "비밀번호 형식이 유효하지 않습니다.";
        pwMessage.classList.add("error");
        pwMessage.classList.remove("confirm");
        checkObj.memberPw = false;
    }

})


// 비밀번호 확인 유효성 검사
memberPwConfirm.addEventListener("input",function(){

    // 비밀번호가 유효할 경우에만 
    // 비밀번호 == 확인  같은지 비교
    if(checkObj.memberPw){ // 비밀번호가 유효한 경우
        // 비밀번호, 비밀번호 확인 같은지 검사
        if(memberPw.value == memberPwConfirm.value){
            pwMessage.innerText = "비밀번호가 일치합니다.";
            pwMessage.classList.add("confirm");
            pwMessage.classList.remove("error");
            checkObj.memberPwConfirm = true;

        } else{
            pwMessage.innerText = "비밀번호가 일치하지 않습니다.";
            pwMessage.classList.add("error");
            pwMessage.classList.remove("confirm");
            checkObj.memberPwConfirm = false;
        }

    }else{ // 비밀번호가 유효하지 않은경우
        checkObj.memberPwConfirm = false;
    }
    
});