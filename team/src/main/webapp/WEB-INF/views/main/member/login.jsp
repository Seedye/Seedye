<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>로그인</title>

    <link rel="stylesheet" href="/team/src/main/webapp/resources/css/login.css">

</head>

<body>
    <main>
        <article class="login-logo">
            <div class="login-head">
                <a href="#">
                <img width="50px" height="50px" src="/team/src/main/webapp/resources/images/새싹이.png">
                </a>
                <div class="sprout">새싹이</div>
            </div>
        </article>

        <form action="/member/login" method="POST">
            <div class="input-text">
                <input type="text" name="email" placeholder="아이디" required>
            </div>

            <div class="input-text">
                <input type="password" name="password" placeholder="비밀번호" id="memberPw" required>
            </div>

            <button class="login-btn">로그인</button>

            <div class="save-area">
                <input type="checkbox" name="saveId" id="saveId">
                <label for="saveId">
                    <div></div> <article class="saveId">아이디 저장</article>
                </label>
            </div>

            <p class="login-end">
                <a href="#">회원가입</a>
                <span class="login-span">|</span>
                <a href="#">ID/PW 찾기</a>
            </p>
        </form>
    </main>
</body>

</html>