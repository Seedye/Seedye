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

// 인증번호 받기 버튼을 눌렀을 때
confirmTelBtn.lastElementChild.addEventListener("click", () => {
    
    // 전화번호 정규식
    const regEx = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

    // 전화번호 입력한 값
    const inputTel = document.querySelector(".find-row > input");

    // 전화번호 입력칸에 아무것도 입력 안했을 때
    if (inputTel.value.trim().length == 0){
        alert("전화번호를 입력해 주세요.");
        return;
    }

    if (regEx.test(inputTel.value)) {

        toPhone = inputTel.value;
        alert("인증번호 발송하였습니다. -3분 이내에 입력해 주세요-");
        confirmTelBox.style.display = "block";

        $.ajax({
            url : "/find/findConfirm",
            data : {"toPhone" : toPhone},
            type : "POST",
            success : (id) => {

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

                                // 아이디 찾기 결과 담을 요소
                                const findId = document.querySelector(".readonlyBox input");
                                
                                findId.value = id;
            
                                // 숨겨진 요소 출력
                                memberInfo.style.display = "block";
                                readonlyBox.style.display = "block";
                                pwChangeBox.style.display = "block";
            
                                pwChangeBox.lastElementChild.addEventListener("click", () => {
            
                                    // 기존 비밀번호 변경 버튼 숨기기
                                    pwChangeBox.style.display = "none";
            
                                    // 비밀번호 변경 눌렀을 때 나오는 요소
                                    newPwBox.style.display = "block";
                                    newConfirmPwBox.style.display = "block";
                                    formBtn.style.display = "block";
            

                                    // 일단 휴대폰 번호 입력 시 인증번호 발송 하면서 인증번호 입력창 출력
                                    // 인증번호 틀렸을 시 alert 인증번호 맞으면
                                    // 아이디 확인
                                    // 비밀번호 변경 눌렀을 때
                                    // 비밀번호 변경할 칸 출력까지 구현
                                });
                            }
                        },
                        error : () => {
                            alert("오류");
                        }
                    });

                });

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

