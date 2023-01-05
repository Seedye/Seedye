<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>소개</title>
    <link rel="stylesheet" href="../../resources/css/header.css">
    <link rel="stylesheet" href="../../resources/css/introduction-page.css">
    <link rel="stylesheet" href="../../resources/css/sideBar.css">
</head>
<body>
        <jsp:include page="/WEB-INF/views/common/header.jsp"/>

    <main>
    <jsp:include page="/WEB-INF/views/common/sideBar.jsp"/>

        <section id="introduction-container" class="introduction-container">
            <div id="main-introduction">새싹이는</div>

            <div id="first-introduction" class="first-introduction">
                <img src="../../resources/images/seedlings-g2f0997c9d_1920.jpg">
                <div class="introduction-text">
                    <p>소개글</p>
                    <p>안녕하세요 새싹이 입니다. 저희 홈페이지를 방문해주셔 감사합니다. 결식 아동을 위한 길잡이가 되겠습니다.</p>
                </div>
            </div>

            <div id="second-introduction" class="second-introduction">
                <div class="introduction-text">
                    <p>프로젝트 및 팀원 소개</p>
                    <p>저희는 파이널 프로젝트 주제를 선정하던 도중 결식 아동들의 불편함을 알고 도움이 되고자 새싹이라는 프로젝트를 준비했습니다.</p>
                </div>
                <img src="../../resources/images/playmobil-g689a8b9bb_1920.jpg">
            </div>

            <div id="third-introduction" class="third-introduction">
                <img src="../../resources/images/board-g283d28f9e_1920.jpg">
                <div class="introduction-text">
                    <p>프로젝트 목적</p>
                    <p>결식 아동들의 편의를 위해 중간 단계에서 확실한 길잡이가 되어 보다 편리한 시설이용을 목적으로 한 프로젝트 입니다.</p>
                </div>
            </div>

            <div id="fourth-introduction" class="fourth-introduction">
                <div class="introduction-text">
                    <p>꿈나무 카드</p>
                    <p>꿈나무 카드를 이용한 시설을 알려드립니다.</p>
                </div>
                <img src="../../resources/images/abstract-gc426cae69_1280.png">
            </div>
        </section>
    </main>

      <!-- 푸터 -->
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>

    <script src="../resources/js/header.js"></script>
    <script src="../../resources/js/introduction-page.js"></script>
    <script src="../../resources/js/sideBar.js"></script>
</body>
</html>