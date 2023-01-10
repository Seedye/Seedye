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
    <link rel="stylesheet" href="../../resources/css/sideBar3.css">
</head>
<body>
        <jsp:include page="/WEB-INF/views/common/header.jsp"/>
        <jsp:include page="/WEB-INF/views/admin/store.jsp" />


    <main>
         <jsp:include page="/WEB-INF/views/common/sideBar.jsp"/>
        <section id="introduction-container" class="introduction-container">
            <div id="main-introduction">새싹이란?!</div>

            <div id="first-introduction" class="first-introduction">
                <img src="../../resources/images/새싹쓰.jpg">
                <div class="introduction-text">
                    <p>소개글</p>
                    <p>이 홈페이지는 비영리 목적으로 꿈나무 카드를 이용하는 아동들의 <br>급식권 보호와 맛있고 영양가 있는 식사를 돕기 위해 <br>위치 서비스를 제공합니다.</p>
                    <p>* 정보수정이 필요한 경우 별도 문의게시판에 남겨주시면 감사하겠습니다 *</p>
                </div>
            </div>

            <div id="second-introduction" class="second-introduction">
                 <div class="introduction-text">
                    <p>꿈나무 카드란?</p>
                    <p>꿈나무카드는 대한민국이 2009년 7월 1일, 어린이를 위해 도입한<br>카드이다. 결식 어린이가 사는 지역 주민자치센터는 해당카드를 <br>발급하는 역할을 한다. 어린이의 가정환경에 따라 하루 몇끼를<br> 제공할 지 결정한다.</p>
                    <p>* 꿈나무카드에 대한 더 많은 정보를 확인하고 싶으시다면 인터넷에 꿈나무 카드를 검색해 주세요 *</p>
                </div>
                <img src="../../resources/images/세계수.jpg">
            </div>

            <div id="third-introduction" class="third-introduction">
                <img src="../../resources/images/주먹쓰.jpg">
                <div class="introduction-text">
                    <p>프로젝트 및 팀원 소개</p>
                    <div class="team-area-all">
                    
                        <div class="team-area">
                        
                            <div class="team">
                                <p>황석현</p>
                                <p>hsh9588@naver.com</p>
                            </div>
                            <div class="team">
                                <p>용환재</p>
                                <p>ist635@naver.com</p>
                            </div>
                            <div class="team">
                                <p>신아민</p>
                                <p>qnrlgkals@naver.com</p>
                            </div>
                        </div>
                        <div class="team-area">
                            <div class="team">
                                <p>강치우</p>
                                <p>cldn0619@naver.com</p>
                            </div>
                            <div class="team">
                                <p>강민규</p>
                                <p>rkdalsrb65@naver.com</p>
                            </div>
                            <div class="team">
                                <p>윤주영</p>
                                <p>sd05sd@naver.com</p>
                            </div>
                        </div>
                    

                </div>
            </div>

        </section>
        <div class="qqq"></div>
    </main>

      <!-- 푸터 -->
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>

<script>
    var loginMemberAuthority = "${loginMember.authority}";
</script>

    <script src="../resources/js/header.js"></script>
    <script src="../../resources/js/introduction-page.js"></script>
    <script src="../../resources/js/sideBar.js"></script>
</body>
</html>