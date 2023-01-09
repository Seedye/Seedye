<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>후원 및 단체소개</title>
    <link rel="stylesheet" href="../../resources/css/header.css">
    <link rel="stylesheet" href="../../resources/css/support-page.css">
    <link rel="stylesheet" href="../../resources/css/sideBar4.css">
</head>
<body>
     <jsp:include page="/WEB-INF/views/common/header.jsp"/>
     <jsp:include page="/WEB-INF/views/admin/store.jsp" />

    <main>
       
        <jsp:include page="/WEB-INF/views/common/sideBar.jsp"/>
        <section class="support-container">
            <div class="main-introduction">후원 및 재단소개</div>
            <p class="message">저희 새싹이는 직접적인 후원을 받지 않습니다. 전문적으로 아이들을 후원하는 단체를 소개합니다.</p>
            <div class="support-group-a">
                <div class="support-introduction">
                    <div class="support-img">
                        <a href="https://www.goodneighbors.kr/" target="_blank">
                            <img src="../../resources/images/굿네이버스.png">
                        </a>
                    </div>
                    <div class="support-text">
                        <p>굿네이버스</p>
                        <p>소중한 후원금을 아동과 지역사회를 위하여 투명하고 성실하게 수행하고 있습니다.</p>
                    </div>
                </div>
                
                <div class="support-introduction">
                   <div class="support-img">
                    <a href="https://www.compassion.or.kr/" target="_blank">
                        <img src="../../resources/images/한국컴패션.png">
                    </a>
                   </div>
                    <div class="support-text">
                        <p>한국컨패션</p>
                        <p>컴패션은 투명하고 효율적으로후원금을 사용합니다.</p>
                    </div>
                </div>
                
                <div class="support-introduction">
                    <div class="support-img">
                        <a href="https://www.childfund.or.kr/main.do" target="_blank">
                            <img src="../../resources/images/초록우산.jfif">
                        </a>
                    </div>
                    <div class="support-text">
                        <p>초록우산</p>
                        <p>따뜻한 응원이 저소득, 주거빈곤, 한부모가정 아이들의 희망찬 미래가 됩니다.</p>
                    </div>
                </div>
            </div>

            <div class="support-group-b">
                <div class="support-introduction">
                    <div class="support-img">
                        <a href="https://www.sc.or.kr/main.do" target="_blank">
                            <img src="../../resources/images/save the children.png">
                        </a>
                    </div>
                    <div class="support-text">
                        <p>Save the Children</p>
                        <p>할머니, 할아버지에게 부담이 될까 '먹고싶다' 한마디를 삼키는 아이들을 도와주세요.</p>
                    </div>
                </div>
        
                <div class="support-introduction">
                    <div class="support-img">
                        <a href="https://www.unicef.or.kr/" target="_blank">
                            <img src="../../resources/images/유니세프.png">
                        </a>
                    </div>
                    <div class="support-text">
                        <p>유니세프</p>
                        <p>‘차별 없는 구호’의 정신으로 전 세계 어린이를 돕기 위해 설립된 유엔기구입니다.</p>
                    </div>
                </div>
        
                <div class="support-introduction">
                    <div class="support-img">
                        <a href="https://www.redcross.or.kr/" target="_blank">
                            <img src="../../resources/images/대한적십자가.jpg">
                        </a>
                    </div>
                    <div class="support-text">
                        <p>대한적십자사</p>
                        <p>대한적십자사는 가장 낮고 어두운 곳에서 위협 받는 모든 생명을 지키기 위해 노력합니다.</p>
                    </div>
                </div>
            </div>
        </section>
<div class="abc"></div>
    </main>
    
    <!-- 푸터 -->
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>

    <script>
        var loginMemberAuthority = "${loginMember.authority}";
    </script>
    
    <script src="../../resources/js/sideBar.js"></script>
    <script src="../../resources/js/header.js"></script>

</body>
</html>