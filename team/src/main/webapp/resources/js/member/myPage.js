const btn1 = document.getElementById("btn1");
const pw = document.getElementById('pw');

const currentPw = document.getElementById("currentPw");
const newPw = document.getElementById("newPw");
const newPwConfirm = document.getElementById("newPwConfirm");

const authKey = document.getElementById("authKey");

// 휴대폰 인증 유무에 따른 타이머 시간 제어 변수 
let flag = false;

const timer = function(){

    let time = 180; // 인증번호 제한시간 작성
    let min = ""; // 분
    let sec = ""; // 초
    
    // setInterval(함수, 시간) : 주기적인 실행
    let infoTimer = setInterval(function(){
        // parseInt() : 정수를 반환
        min = parseInt(time/60); // 몫을 계산
        sec = time%60; // 나머지 계산
    
        document.getElementById("timer").innerHTML = "0" + min + ":" + (sec<10 ? "0" + sec : sec);
        if(!flag){

            time--;
        }
    
        // 타임아웃 시
        if(time < 0) {
            clearInterval(infoTimer); // setInterval() 실행 끝
            document.getElementById("timer").innerHTML = "시간만료";
            checkObj.authKey = false;
    
        } else { // 타임아웃이 아닐 시
            checkObj.authKey = true;
        }
    
    }, 1000);
}

const checkObj = {
    "newPw"        : true, /* 새 비밀번호 */
    "newPwConfirm" : true, /* 새 비밀번호 확인 */
    "confirm" : true, /* 인증번호 */
    "authKey" : true, /* 인증 제한 시간(타이머) */
    "memberTel" : true, /* 전화번호 */
};

if(document.getElementById("myPage-frm") != null){
    document.getElementById("myPage-frm").addEventListener("submit", function(event){

        for(let key in checkObj){

            let str;

            // checkObj 속성 하나를 꺼내 값을 검사했는데 false인 경우
            if(!checkObj[key]){

                switch(key){
                case "newPw"    :  str = "새 비밀번호가 유효하지 않습니다."; break; 
                case "newPwConfirm" :  str = "새 비밀번호 확인이 유효하지 않습니다."; break;
                case "confirm" :  str = "전화번호 인증을 완료해주세요."; break;
                case "authKey" : str = "인증 제한 시간이 초과되었습니다."; break;
                case "memberTel" : str = "이미 가입되어있는 번호입니다."; break;
                }

                alert(str); // 대화상자 출력

                // 유효하지 않은 입력으로 포커스 이동
                document.getElementById(key).focus();

                event.preventDefault(); // 제출 이벤트 제거
                return; // 함수 종료
            }
        }
    });

}

// 회원 탈퇴 작성
const memberDeleteForm = document.getElementById("memberDeleteForm");

if(memberDeleteForm != null){

    memberDeleteForm.addEventListener("submit", function(event){

        const memberPw = document.getElementById("memberPw");

        // 비밀번호 미 작성 시
        if(memberPw.value.trim().length == 0){
            alert("비밀번호를 입력해주세요");
            memberPw.focus();
            memberPw.value = "";

            event.preventDefault(); // form 기본 이벤트 제거
            return;
        }

        // 체크박스 동의
        const agree = document.getElementById("agree");

        if(!agree.checked){ // 체크가 되지 않은 경우

            alert("탈퇴를 원하시면 약관에 동의 해주세요.");
            agree.focus();

            agree.checked = false;
            event.preventDefault();
            return;
        }

        // 탈퇴 여부 검사
        if(!confirm("탈퇴하시겠습니까?")){ // 취소를 누르면
            alert("탈퇴 취소");
            event.preventDefault();
            memberPw.value = "";
            return;
        }

    });
}


const regEx = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#^)(_+=|-])[A-Za-z\d@$!%*?&#^)(_+=|-]{8,16}$/;
if(btn1 != null){
    btn1.addEventListener("click", function(){

        // btn1 보이기 (display: block)
        if(pw.style.display !== 'block') {
            pw.style.display = 'block';

            checkObj.newPw = false;
            checkObj.newPwConfirm = false;

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

        // btn1 숨기기 (display: none)
        } else {
            pw.style.display = 'none';

            currentPw.removeAttribute("required");
            newPw.removeAttribute("required");
            newPwConfirm.removeAttribute("required");

            checkObj.newPw = true;
            checkObj.newPwConfirm = true;

            currentPw.value = "";
            newPw.value = "";
            newPwConfirm.value = "";
        }

    });
}

// 전화번호 오토하이픈
const autoHyphen = (target) => {
    target.value = target.value
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
}

// 전화번호 인증하기
const mainTel = document.querySelector(".mainTel");

const confirmTelMassege = document.getElementById("confirm");

// 전화번호 유효성 검사
const memberTel = document.getElementById("memberTel");

if(memberTel != null){
    memberTel.addEventListener("input", function(){

        // ^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$
        // 전화번호 정규표현식 검사
        const regEx = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

        // 문자가 입력되지 않은 경우
        if(memberTel.value.trim().length == 0){
            confirmTelMassege.innerText = "전화번호를 입력해주세요.";
            confirmTelMassege.classList.remove("confirm", "error");
            checkObj.memberTel = false;
            authKey.removeAttribute("disabled");
            return;
        }   

        if(regEx.test(memberTel.value)){

            $.ajax({
                url: "/telDupCheck",
                data: {"memberTel": memberTel.value},
                type: "GET",
                success: (result) => {

                    if (result == 0){ // 전화번호 중복이 아닐 시
                        confirmTelMassege.innerText = "유효한 전화번호 형식입니다."
                        confirmTelMassege.classList.add("confirm");
                        confirmTelMassege.classList.remove("error");
                        checkObj.memberTel = true;
                        authKey.removeAttribute("disabled");

                    } else { // 중복이면
                    
                        confirmTelMassege.innerText = "이미 등록되어있는 번호입니다."
                        confirmTelMassege.classList.add("error");
                        confirmTelMassege.classList.remove("confirm");
                        checkObj.memberTel = false;

                        // 버튼 클릭 못하게
                        authKey.setAttribute("disabled", "");
                    
                    }

                },
                error: () => {
                    console.log("ajax 통신 실패");
                },
            });

        } else {
            confirmTelMassege.innerText = "전화번호 형식이 유효하지 않습니다."
            confirmTelMassege.classList.add("error");
            confirmTelMassege.classList.remove("confirm");
            checkObj.memberTel = false;
            authKey.setAttribute("disabled", "");
        }

    });
}

if(mainTel != null){
    // 전화번호 변경 버튼 눌렀을 때
    mainTel.lastElementChild.addEventListener("click", () => {
        
        checkObj.confirm = false;
        
        const inputTel = document.querySelector("input[name=memberTel]");

        let changeTel;
        
        // 전화번호가 읽기 전용일 때 (전화번호가 기존에 입력된 정보 일 때)
        if(inputTel.getAttribute("readonly") == false){

            
            // 읽기 전용 속성 삭제
            inputTel.removeAttribute("readonly");
            
            // 입력칸 비우고 포커스 등 스타일 변경
            inputTel.value = "";
            inputTel.focus();
            mainTel.lastElementChild.innerText = "인증번호 발송";
            mainTel.nextElementSibling.style.display = "flex";
            
        // 인증번호 발송 버튼을 눌렀을 때
        } else {

            timer();

            checkObj.authKey = false;


            confirmTelMassege.innerText = "인증번호를 입력해주세요.";
            confirmTelMassege.classList.add("error");
            confirmTelMassege.classList.remove("confirm");

            confirmTelMassege.style.display = "flex";

            
            changeTel = inputTel.value;
            
            $.ajax({
                url : "/info/confirmTel",
                data : {"toPhone" : changeTel},
                type : "POST",
                success : (result) => {
                    
                    alert("인증번호를 발송하였습니다. 3분 이내에 입력해주세요.");
                    
                    
                },
                error : () => {
                    alert("문자 인증 전송 실패");
                }
                
            });
        }
        
    });
    
    const confirm = document.querySelector(".confirmCheck");
    
    const confirmCheck = document.querySelector("input[name=confirmTel]");

    // 인증확인 버튼 눌렀을 때
    confirm.lastElementChild.addEventListener("click", () => {
        
        $.ajax({
            url : "/info/confirmCheck",
            data : {"infoInputNo" : confirmCheck.value},
            type : "POST",
            success : (result) => {

                if (result == 1){
        
                    // 인증번호 일치 할 때
                    checkObj.confirm = true;
        
                    if(checkObj.authKey == true) {
                        confirmTelMassege.innerText = "인증이 완료 되었습니다.";
                        confirmTelMassege.classList.add("confirm");
                        confirmTelMassege.classList.remove("error");
                        memberTel.setAttribute("readonly", "");
                        authKey.setAttribute("disabled", "");
                    }

                    flag = true;
        
                } else {
        
                    // 인증번호 일치하지 않을 때
                    checkObj.confirm = false;
        
                    confirmTelMassege.innerText = "인증번호가 일치하지 않습니다.";
                    confirmTelMassege.classList.add("error");
                    confirmTelMassege.classList.remove("confirm");
                }
            },
            error : () => {

                alert("인증번호 확인중 오류 발생");

            }
        })


    });
}