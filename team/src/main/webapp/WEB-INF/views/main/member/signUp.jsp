<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>회원가입</title>

    <link rel="stylesheet" href="../resources/css/member/signUp.css">

</head>
<body>
    <main>
        
        <!-- 아이디, 비밀번호, 전화번호, 주소 -->
        <section class="signUp-content">
            <div class="solid">

                <article class="login-logo">
                    <div class="login-head">
                        <a href="/">
                        <img width="50px" height="50px" src="../resources/images/새싹이.png">
                        </a>
                        <div class="sprout">환영합니다.</div>
                    </div>
                </article>

                <form action="/signUp" method="POST" name="signUp-frm" id="signUp-frm">

                    <label for="memberId">
                        * 
                        <span class="required">아이디 (필수 입력)</span>
                    </label>
                    <!-- 아이디 입력 -->
                    <div class="signUp-input-area">
                        <input type="text" name="memberId" id="memberId" placeholder="아이디"
                        maxlength="20" autocomplete="off" required>

                    </div>
                    <span class="signUp-message" id="idMessage">영문과 숫자를 포함해 10~20 글자 사이로 입력해주세요.</span>

                    <!-- 비밀번호/비밀번호 확인 입력 -->
                    <label for="memberPw">
                        *
                        <span class="required">비밀번호 (필수 입력)</span>
                    </label>

                    <div class="signUp-input-area">
                        <input type="password" name="memberPw" id="memberPw" placeholder="비밀번호 입력"
                        maxlength="16" required>
                    </div>

                    <div class="signUp-input-area">
                        <input type="password" name="memberPwConfirm" id="memberPwConfirm" placeholder="비밀번호 확인"
                        maxlength="16" required>
                    </div> 

                    <span class="signUp-message" id="pwMessage">소문자, 대문자, 숫자, 특수문자를 각 하나 이상 포함해 8~16 글자 사이로 입력해주세요.</span>

                    <!-- 전화번호 입력 -->
                    <label for="memberTel">
                        *
                        <span class="required">전화번호 (필수 입력)</span>
                    </label>

                    <div class="signUp-input-area">
                        <input type="text" name="memberTel" id="memberTel" placeholder="(- 없이 숫자만 입력)"
                        maxlength="13" oninput="autoHyphen(this)" required>

                        <button type="button">인증번호 받기</button>
                    </div>

                    <span class="signUp-message" id="telMessage">전화번호를 입력해주세요.</span>   

                    <!-- 인증번호 입력 -->
                    <label for="phoneCheck">
                        *
                        <span class="required">인증번호 (필수 입력)</span>
                    </label>

                    <div class="signUp-input-area">
                        <input type="text" name="phoneCheck" id="phoneCheck" placeholder="인증번호 입력"
                        maxlength="6" required>

                        <button id="checkAuthKeyBtn" type="button">인증하기</button>
                    </div>
                    <span id="authKeyMessage" class="signUp-message">인증되었습니다.</span>

                    <!-- 주소 입력 -->
                    <label for="memberAddress">
                        <span class="required">주소</span>
                    </label>

                    <div class="signUp-input-area">
                        <input type="text" name="memberAddress" id="sample6_postcode" placeholder="우편 번호"
                        maxlength="6">

                        <button type="button" onclick="sample6_execDaumPostcode()">검색</button>
                    </div>

                    <div class="signUp-input-area">
                        <input type="text" name="memberAddress" id="sample6_address" placeholder="도로명/지번 주소">
                    </div>

                    <div class="signUp-input-area">
                        <input type="text" name="memberAddress" id="sample6_detailAddress" placeholder="상세 주소">
                    </div>

                    <button id="signUp-btn">가입하기</button>

                </form>
            </div>
        </section>

    </main>

    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>    
    <script>
        function sample6_execDaumPostcode() {
            new daum.Postcode({
                oncomplete: function(data) {

                    var addr = ''; // 주소 변수
        
                        //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                    if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                        addr = data.roadAddress;
                    } else { // 사용자가 지번 주소를 선택했을 경우(J)
                        addr = data.jibunAddress;
                    }
        
                    // 우편번호와 주소 정보를 해당 필드에 넣는다.
                    document.getElementById('sample6_postcode').value = data.zonecode;
                    document.getElementById("sample6_address").value = addr;
                    // 커서를 상세주소 필드로 이동한다.
                    document.getElementById("sample6_detailAddress").focus();
                }
            }).open();
        }
    </script>

    <!-- jQuery 라이브러리(.js 파일) 추가(CDN 방식) -->
    <script
    src="https://code.jquery.com/jquery-3.6.1.min.js"
    integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ="
    crossorigin="anonymous">
    </script>

    <script src="../../resources/js/member/signUp.js"></script>

</body>

</html>