// 인증번호 받기 클릭 시
const confirmTelBtn = document.querySelector(".find-row");

// 인증번호 박스
const confirmTelBox = document.querySelector(".confirmTelBox");

// 인증번호 확인 버튼 감싸는 박스
const confirmBox = document.querySelector(".confirmBtnBox");

// 인증이 완료 되었을 때 나오는 결과 요소들
const memberInfo = document.querySelector(".memberInfo");
const readonlyBox = document.querySelector(".readonlyBox");
const pwChangeBox = document.querySelector(".pwChangeBox");

// 비밀번호 변경 눌렀을 때 나오는 요소들
const newPwBox = document.querySelector(".newPwBox");
const newConfirmPwBox = document.querySelector(".newConfirmPwBox");
const formBtn = document.querySelector(".formBtn");

// 입력한 전화번호 담을 변수 선언
let toPhone;

// 초기 비밀번호 변경 버튼 클릭 막아 놓기
const checkPw = {
    "newPw" : false,
    "newConfirmPw" : false,
};

document.getElementById("find-changePw").addEventListener("submit", e => {

    for (let items in checkPw){
        let str;
        
        if (!checkPw[items]){

            switch(items){
                case "newPw" : str = "새 비밀번호가 유효하지 않습니다."; break;
                case "newConfirmPw" : str = "새 비밀번호 확인이 유효하지 않습니다."; break;
            }
    
            alert(str);
    
            document.getElementById(items).focus();
    
            
            e.preventDefault();
            return;
        }
    }
});

// 인증 결과 후 아이디를 담을 변수 생성
let resultId;

// 전화번호 입력한 값
const inputTel = document.querySelector(".find-row > input");

// 인증번호 받기 버튼을 눌렀을 때
confirmTelBtn.lastElementChild.addEventListener("click", () => {
    
    timer();

    // 전화번호 정규식
    const regEx = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

    // 전화번호 입력칸에 아무것도 입력 안했을 때
    if (inputTel.value.trim().length == 0){
        alert("전화번호를 입력해 주세요.");
        return;
    }

    if (regEx.test(inputTel.value)) {

        toPhone = inputTel.value;
        alert("인증번호 발송하였습니다. 3분 이내에 입력해 주세요.");
        confirmTelBox.style.display = "block";

        // 인증번호 타이머 삽입 예정
        // confirmTelBox.lastElementChild.innerText = "03분00초";

        
        $.ajax({
            url : "/find/findConfirm",
            data : {"toPhone" : toPhone},
            type : "POST",
            success : (id) => {

                resultId = id;

                
            },
            error : () => {
                
                alert("아이디 비밀번호 찾기 페이지 인증번호 발송 실패");
                
            }
        });
        
        
    } else {
        
        alert("휴대폰 번호가 유효하지 않습니다.");
        return;
    }
});

// 인증번호 확인 버튼 눌렀을 때
confirmBox.lastElementChild.addEventListener("click", () => {
    
    const confirmBoxInput = document.querySelector(".confirmBtnBox input");
    
    $.ajax({
        url : "/find/confirmCheck",
        data : {"inputConfirmNo" : confirmBoxInput.value},
        type : "POST",
        success : (result) => {

            // result가 0일 때 인증 실패
            if(result == 0){
                alert("인증번호가 일치하지 않습니다.");

                return;
            } else{

                console.log(resultId);

                if(resultId == ""){
                    
                    alert("등록된 회원이 없습니다.");
                    confirmTelBox.style.display = "none";
                    confirmBoxInput.value = "";
                    inputTel.value = "";
                    confirmTelBox.lastElementChild.innerText = "";
                    
                    inputTel.focus();

                    return false;
                    
                } else {

                    alert("인증이 완료 되었습니다.");

                    // 아이디 찾기 결과 담을 요소
                    const findId = document.querySelector(".readonlyBox input");
                    
                    findId.value = resultId;

                    // 숨겨진 요소 출력
                    memberInfo.style.display = "block";
                    readonlyBox.style.display = "block";
                    pwChangeBox.style.display = "block";

                    // 비밀번호 변경 버튼을 눌렀을 때
                    pwChangeBox.lastElementChild.addEventListener("click", () => {

                        // 기존 비밀번호 변경 버튼 숨기기
                        pwChangeBox.style.display = "none";

                        // 비밀번호 변경 눌렀을 때 나오는 요소
                        newPwBox.style.display = "block";
                        newConfirmPwBox.style.display = "block";
                        formBtn.style.display = "block";


                        // 새 비밀번호, 새 비밀번호 확인 유효성 검사
                        const newInputPw = document.getElementById("newPw");
                        const newConfirmeInputPw = document.getElementById("newConfirmPw");
                        const changePwMessage = document.getElementById("changeMessage");

                        // 비밀번호 정규식
                        const regEx = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#^)(_+=|-])[A-Za-z\d@$!%*?&#^)(_+=|-]{8,16}$/;

                        // 새 비밀번호 입력 시
                        newInputPw.addEventListener("input", () => {

                            if(newInputPw.value.trim().length == 0){

                                changePwMessage.innerText = "영문, 숫자, 특수문자를 각 하나 이상 포함해 8~16 글자 사이로 입력해주세요.";
                                newInputPw.value = "";
                                changePwMessage.classList.remove("confirm", "error");
                                checkPw.newPw = false;
                                return;
                            }

                            if(regEx.test(newInputPw.value)){

                                checkPw.newPw = true;

                                if(newConfirmeInputPw.value.trim().length == 0){

                                    changePwMessage.innerText = "유효한 비밀번호 형식입니다."
                                    changePwMessage.classList.add("confirm");
                                    changePwMessage.classList.remove("error");

                                } else{

                                    if(newInputPw.value == newConfirmeInputPw.value){

                                        changePwMessage.innerText = "비밀번호가 일치합니다.";
                                        changePwMessage.classList.add("confirm");
                                        changePwMessage.classList.remove("error");
                                        checkPw.newConfirmPw = true;

                                    } else {

                                        changePwMessage.innerText = "비밀번호가 일치하지 않습니다."
                                        changePwMessage.classList.add("error");
                                        changePwMessage.classList.remove("confirm");
                                        checkPw.newConfirmPw = false;

                                    }
                                }

                            } else {

                                checkPw.newPw = false;
                                changePwMessage.innerText = "새 비밀번호 형식이 일치하지 않습니다.";
                                changePwMessage.classList.add("error");
                                changePwMessage.classList.remove("confirm");

                            }
                        });

                        // 새 비밀번호 입력 시 
                        newConfirmeInputPw.addEventListener("input", () => {

                            if(checkPw.newPw){

                                if(newInputPw.value == newConfirmeInputPw.value){

                                    changePwMessage.innerText = "비밀번호가 일치합니다.";
                                    changePwMessage.classList.add("confirm");
                                    changePwMessage.classList.remove("error");
                                    checkPw.newConfirmPw = true;

                                } else {

                                    changePwMessage.innerText = "비밀번호 확인이 일치하지 않습니다."
                                    changePwMessage.classList.add("error");
                                    changePwMessage.classList.remove("confirm");
                                    checkPw.newConfirmPw = false;

                                }

                            } else {

                                checkPw.newConfirmPw = false;

                            }
                        });

                    });
                }
            }

        },
        error : () => {
            alert("인증번호 확인 실패");
        }
    });
    
});

/* if(id == ""){

    alert("등록된 회원이 없습니다.");

    confirmTelBox.style.display = "none";
    confirmBoxInput.value = "";
    inputTel.value = "";
    confirmTelBox.lastElementChild.innerText = "";
    
    inputTel.focus();

    return;

} else{

} */

const authKey = document.getElementById("authKey");
const timer = function(){


    let time = 180; // 인증번호 제한시간 작성
    let min = ""; // 분
    let sec = ""; // 초
    
    // setInterval(함수, 시간) : 주기적인 실행
    let x = setInterval(function(){
        // parseInt() : 정수를 반환
        min = parseInt(time/60); // 몫을 계산
        sec = time%60; // 나머지 계산
    
        document.getElementById("timer").innerHTML = "0" + min + ":" + (sec<10 ? "0" + sec : sec);
        time--;
    
        // 타임아웃 시
        if(time < 0) {
            clearInterval(x); // setInterval() 실행 끝
            document.getElementById("timer").innerHTML = "인증 시간이 만료 되었습니다. 다시 인증번호를 발급해주세요.";
            const sendAuthKeyBtn = document.getElementById("sendAuthKeyBtn");
            sendAuthKeyBtn.setAttribute("disabled", "");
    
        } else {
            sendAuthKeyBtn.removeAttribute("disabled");
        }
    
    }, 1000);
}