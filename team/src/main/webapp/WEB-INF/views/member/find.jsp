<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>비밀번호 찾기</title>

    <link rel="stylesheet" href="../../resources/css/member/find.css">
    <link rel="stylesheet" href="../resources/css/header.css">
    
    <!-- fontawesome 아이콘 -->
    <script src="https://kit.fontawesome.com/e4f69a07ca.js" crossorigin="anonymous"></script>

</head>
<body>
    <main>
        
        <article class="find-logo">
            <div class="find-head">
                <a href="/">
                <img width="50px" height="50px" src="../../resources/images/새싹이.png">
                </a>
                <div class="sprout">새싹이</div>
            </div>
            <div class="find-text">아이디 / 비밀번호 찾기</div>
        </article>

        <section class="find-content">
            <form action="/find" method="POST" onsubmit="return findValidate()">
                <div class="find-frm">

                    <div class="find-wrap">
                        <div class="find-row">
                            <div class="font-text">전화번호</div>
                            <input type="text" id="memberTel" placeholder="(- 없이 숫자만 입력)" maxlength="20" autocomplete="off">
                            <button type="button">인증번호 받기</button>
                        </div>
                    </div>

                    <div class="confirmTelBox">
                        <div class="find-wrap">
                            <div class="confirm-box confirmBtnBox">
                                <div class="font-text">인증번호</div>
                                <input type="text" id="confirmNum" maxlength="4" autocomplete="off">
                                <button type="button">인증번호 확인</button>
                            </div>
                        </div>
                        <span class="findMessage">인증 확인 유무</span>
                    </div>

                    <div class="memberInfo">휴대전화 등록된 회원 아이디</div>

                    <div class="find-wrap readonlyBox">
                        <div class="confirm-box new-box">
                            <div class="font-text">아이디</div>
                            <input type="text" id="memberId" maxlength="20" autocomplete="off" value="test" readonly>
                        </div>
                    </div>

                    <div class="newPwBox">
                        <div class="find-wrap">
                            <div class="confirm-box new-box">
                                <div class="font-text">새 비밀번호</div> 
                                <input type="password" id="newPw" maxlength="16" autocomplete="off">
                            </div>
                        </div>
                        <span class="findMessage">새 비밀번호 정규식</span>
                    </div>

                    <div class="newConfirmPwBox">
                        <div class="find-wrap">
                            <div class="confirm-box new-box">
                                <div class="font-text">새 비밀번호 확인</div>
                                <input type="password" id="newConfirmPw" maxlength="16" autocomplete="off">
                            </div>
                        </div>
                        <span class="findMessage">새 비밀번호 확인 정규식</span>
                    </div>
                    
                    <div class="pwChangeBox">
                        <button type="button" class="find-btn">비밀번호 변경</button>
                    </div>
                    <div class="formBtn">
                        <button class="find-btn">수정</button>
                    </div>
                </div>
            </form>
            <p class="loginPage">
                <a href="/login"><div class="login-page">로그인 화면으로 돌아가기</div></a>
            </p>
        </section>
    </main>
    <jsp:include page="/WEB-INF/views/common/footer.jsp" />

    <%-- 제이쿼리 사용시 필요한 스크립트 --%>
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" 
    integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" 
    crossorigin="anonymous"></script>
    
    <script src="../../resources/js/member/find.js"></script>

</body>
</html>