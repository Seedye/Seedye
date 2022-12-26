<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>로그인</title>

    <link rel="stylesheet" href="../resources/css/member/login.css">
    <link rel="stylesheet" href="../resources/css/header.css">

</head>

<body>
    <main>
        <article class="login-logo">
            <div class="login-head">
                <a href="/">
                <img width="50px" height="50px" src="../resources/images/새싹이.png">
                </a>
                <div class="sprout">새싹이</div>
            </div>
        </article>

        <form action="/login" method="POST">
            <div class="input-text">
                <input type="text" name="memberId" placeholder="아이디" required value="${cookie.saveId.value}">
            </div>

            <div class="input-text">
                <input type="password" name="memberPw" placeholder="비밀번호" id="memberPw" required>
            </div>

            <button class="login-btn">로그인</button>

            <%-- 쿠키에 saveId가 있는 경우 변수 생성 --%>
            <c:if test="${!empty cookie.saveId.value}">
                <c:set var="temp" value="checked" />
            </c:if>

            <div class="save-area">
                <input type="checkbox" name="saveId" id="saveId" ${temp}>
                <label for="saveId">
                    <div></div> <article class="saveId">아이디 저장</article>
                </label>
            </div>

            <p class="login-end">
                <a href="/signUp">회원가입</a>
                <span class="login-span">|</span>
                <a href="/find">ID/PW 찾기</a>
            </p>
        </form>
    </main>
    <jsp:include page="/WEB-INF/views/common/footer.jsp" />

<c:if test="${not empty sessionScope.message}">
    <script>
        alert("${sessionScope.message}");
    </script>

    <%-- message 1회 출력 후 session scope에서 삭제 --%>
    <c:remove var="message" scope="session" />
</c:if>

</body>

</html>