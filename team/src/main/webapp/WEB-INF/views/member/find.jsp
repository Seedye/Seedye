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
                <a href="#">
                <img width="50px" height="50px" src="../../resources/images/새싹이.png">
                </a>
                <div class="sprout">새싹이</div>
            </div>
            <div class="find-text">비밀번호를 찾을 아이디를 입력해주세요.</div>
        </article>

        <section class="find-content">
            <form action="/find" method="POST" onsubmit="return findValidate()">
                <div class="find-frm">
                    <div class="find-wrap">
                        <div class="find-row">
                            <div class="icon"><i class="fa-solid fa-user"></i></div>
                            <input type="text" id="memberId" placeholder="아이디" maxlength="20" autocomplete="off">
                        </div>
                    </div>
                    
                    <div class="message-area">
                        <p id="findMessage" class="findMessage">영문과 숫자를 포함해 10~20 글자 사이로 입력해주세요.</p>
                    </div>
                    
                    <div>
                        <button class="find-btn">비밀번호 찾기</button>
                    </div>
                </div>
            </form>
            <p class="loginPage">
                <a href="/login"><div class="login-page">로그인 화면으로 돌아가기</div></a>
            </p>
        </section>
    </main>
    <jsp:include page="/WEB-INF/views/common/footer.jsp" />

    <!-- jQuery -->
    <script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js" ></script>
    <!-- iamport.payment.js -->
    <script type="text/javascript" src="https://cdn.iamport.kr/js/iamport.payment-{SDK-1.2.0}.js"></script>
    <script src="../../resources/js/member/find.js"></script>

</body>
</html>