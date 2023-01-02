// 회원가입 타이머 작성
const authKey = document.getElementById("authKey");
const timer = function(){

    let time = 180; // 인증번호 제한시간 작성
    let min = ""; // 분
    let sec = ""; // 초
    
    // setInterval(함수, 시간) : 주기적인 실행
    let signUpTimer = setInterval(function(){
        // parseInt() : 정수를 반환
        min = parseInt(time/60); // 몫을 계산
        sec = time%60; // 나머지 계산
    
        document.getElementById("timer").innerHTML = "0" + min + ":" + (sec<10 ? "0" + sec : sec);
        time--;
    
        // 타임아웃 시
        if(time < 0) {
            clearInterval(signUpTimer); // setInterval() 실행 끝
            document.getElementById("timer").innerHTML = "시간만료";
            checkObj.authKey = false;
    
        } else { // 타임아웃이 아닐 시
            checkObj.authKey = true;
        }
    
    }, 1000);
}

const checkObj = {
    "memberId"        : false, /* 아이디 */
    "memberPw"        : false, /* 비밀번호 */
    "memberPwConfirm" : false, /* 비밀번호 확인 */
    "memberTel"       : false, /* 전화번호 */
    "phoneCheck"      : false, /* 인증번호 */
    "authKey"         : false, /* 인증 제한 시간(타이머) */
};

document.getElementById("signUp-frm").addEventListener("submit", function(event){

    for(let key in checkObj){

        let str;

        // checkObj 속성 하나를 꺼내 값을 검사했는데 false인 경우
        if(!checkObj[key]){

            switch(key){
            case "memberId" :  str = "아이디가 유효하지 않습니다."; break;
            case "memberPw"    :  str = "비밀번호가 유효하지 않습니다."; break; 
            case "memberPwConfirm" :  str = "비밀번호 확인이 유효하지 않습니다."; break;
            case "memberTel" : str = "전화번호가 유효하지 않습니다."; break;
            case "phoneCheck" : str = "전화번호 인증이 완료되지 않았습니다."; break;
            case "authKey" : str = "인증 제한 시간이 초과되었습니다."; break;
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
    if(memberId.value.trim().length == 0){
        idMessage.innerText = "사용하고 싶은 아이디를 입력해주세요.";
        memberId.value = "";

        // confirm, error 클래스 제거 -> 검정 글씨로 만들기
        idMessage.classList.remove("confirm", "error");

        // 유효성 검사 확인 객체에 현재 상태 저장
        checkObj.memberId = false;
        return;
    }

    // 정규표현식을 이용한 유효성 검사
    const regEx = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{10,20}$/;

    if(regEx.test(memberId.value)){
        $.ajax({
            url : "/idDupCheck", // 비동기 통신을 진행할 서버 요청 주소
            data: {"memberId" : memberId.value}, // JS객체에서 서버로 전달할 값
            type: "GET", // 데이터 전달 방식(GET/POST) -> ajax는 보통 GET방식
            success: (result) => { // 비동기 통신에 성공해서 응답 받았을 때

                if(result == 0){
                    idMessage.innerText = "사용가능한 아이디입니다."
                    idMessage.classList.add("confirm");
                    idMessage.classList.remove("error");
                    checkObj.memberId = true;
                } else {
                    idMessage.innerText = "이미 사용중인 아이디입니다."
                    idMessage.classList.add("error");
                    idMessage.classList.remove("confirm");
                    checkObj.memberId = false;                    
                }
            },
            error : () => { // 비동기 통신이 실패했을 때 수행
                console.log("ajax통신 실패");
            },
            complete : ()=> {// success, error 수행여부 관계없이 무조건 수행
                console.log("중복 검사 수행 완료")
            }
        });
    } else {
        idMessage.innerText = "영문과 숫자를 포함해 10~20 글자 사이로 입력해주세요.";
        idMessage.classList.add("error");
        idMessage.classList.remove("confirm");

        checkObj.memberId = false;      
    }


});

// 비밀번호 유효성 검사
const memberPw = document.getElementById("memberPw");
const memberPwConfirm = document.getElementById("memberPwConfirm");
const pwMessage = document.getElementById("pwMessage");

// 비밀번호 입력 시
memberPw.addEventListener("input", function(){

    // 비밀번호가 입력되지 않은 경우
    if(memberPw.value.trim().length == 0){
        pwMessage.innerText = "영문, 숫자, 특수문자를 각 하나 이상 포함해 8~16 글자 사이로 입력해주세요.";
        memberPw.value = "";
        pwMessage.classList.remove("confirm", "error"); // 검정 글씨로 변환
        checkObj.memberPw = false; 
        return;
    }

    // 비밀번호 정규표현식 검사
    // const regEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!-|])[A-Za-z\d!-|]{8,16}$/;
    const regEx = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#^)(_+=|-])[A-Za-z\d@$!%*?&#^)(_+=|-]{8,16}$/;

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

const autoHyphen = (target) => {
    target.value = target.value
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
}

// 전화번호 유효성 검사
const memberTel = document.getElementById("memberTel");
const telMessage = document.getElementById("telMessage");

memberTel.addEventListener("input", function(){

    // 문자가 입력되지 않은 경우
    if(memberTel.value.trim().length == 0){
        telMessage.innerText = "전화번호를 입력해주세요.";
        telMessage.classList.remove("confirm", "error");
        checkObj.memberTel = false;
        sendAuthKeyBtn.removeAttribute("disabled");
        return;
    }

    // ^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$
    // 전화번호 정규표현식 검사
    const regEx = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    const sendAuthKeyBtn = document.getElementById("sendAuthKeyBtn");

    if(regEx.test(memberTel.value)){

        $.ajax({
            url: "/telDupCheck",
            data: {"memberTel": memberTel.value},
            type: "GET",
            success: (result) => {
                console.log(result)

                if (result == 0){ // 전화번호 중복이 아닐 시
                    telMessage.innerText = "유효한 전화번호 형식입니다."
                    telMessage.classList.add("confirm");
                    telMessage.classList.remove("error");
                    checkObj.memberTel = true;
                    sendAuthKeyBtn.removeAttribute("disabled");

                } else { // 중복이면
                
                    telMessage.innerText = "이미 등록되어있는 번호입니다."
                    telMessage.classList.add("error");
                    telMessage.classList.remove("confirm");
                    checkObj.memberTel = false;

                    // 버튼 클릭 못하게
                    sendAuthKeyBtn.setAttribute("disabled", "");
                
                }

            },
            error: () => {
                console.log("ajax 통신 실패");
            },
            complete: () => {
                console.log("중복 검사 수행 완료");
            }
        });

    } else {
        telMessage.innerText = "전화번호 형식이 유효하지 않습니다."
        telMessage.classList.add("error");
        telMessage.classList.remove("confirm");
        checkObj.memberTel = false;
        sendAuthKeyBtn.setAttribute("disabled", "");
    }

});

// 전화번호 인증 번호 전송
const mainTel = document.querySelector(".mainTel");
const phoneConfirmBox = document.querySelector(".phoneConfirmBox");

// 인증번호 받기 버튼 눌렀을 때
mainTel.lastElementChild.addEventListener("click", () => {

    timer();

    checkObj.phoneCheck = false;

    const inputTel = document.querySelector("input[name=memberTel]");

    let changeTel;

    phoneConfirmBox.style.display = "block";

    const authKeyMessage = document.getElementById("authKeyMessage");
    
    authKeyMessage.innerText = "인증번호를 입력해주세요.";
    authKeyMessage.classList.add("error");
    authKeyMessage.classList.remove("confirm");

    // authKeyMessage.style.display = "block";

    alert("인증번호를 발송하였습니다. 3분 이내에 입력해주세요.");

    changeTel = inputTel.value;


    $.ajax({
        url : "/signUp/phoneCheck",
        data : {"toPhone" : changeTel},
        type : "POST",
        success : (randomNumber) => {

            const confirmCheck = document.querySelector(".confirmCheck");

            // 인증확인 버튼 눌렀을 때
            confirmCheck.lastElementChild.addEventListener("click", () => {

                const phoneCheck = document.querySelector("input[name=phoneCheck]");

                if (phoneCheck.value == randomNumber){

                    // 인증번호 일치 할 때
                    checkObj.phoneCheck = true;

                    authKeyMessage.innerText = "인증이 완료 되었습니다.";
                    authKeyMessage.classList.add("confirm");
                    authKeyMessage.classList.remove("error");
                
                } else {
                    checkObj.phoneCheck = false;

                    authKeyMessage.innerText = "인증번호가 일치하지 않습니다.";
                    authKeyMessage.classList.add("error");
                    authKeyMessage.classList.remove("confirm");

                }

            });
        },
        error : () => {
            alert("인증번호 전송 실패");
        }

    });

});