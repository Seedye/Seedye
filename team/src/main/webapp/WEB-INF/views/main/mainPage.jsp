<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>새싹이 -꿈나무카드 가맹점 찾기</title>

    <link rel="stylesheet" href="../resources/css/header.css">
    <link rel="stylesheet" href="../resources/css/mainPage.css">
</head>
<body>

    <%-- 헤더 위치 --%>
    <jsp:include page="/WEB-INF/views/common/header.jsp"/>

    <main>
        <!-- 사진에 검색창 넣을려다가 일딴 뺏음 -->
        <div class="searchAria">
        </div>
        <!-- 메인페이지 상단 이미지 -->
        <img class="main-image" src="../resources/images/mainImg.jpg" alt="">

        <!-- 본문 스타일 지정 -->
        <div class="main-container">

            <!-- 검색창 -->
            <div class="search-container">
                <div class="searchBoxName">꿈나무 카드 가맹점 위치 조회</div>
                <div class="searchBox">
                    <input type="text" class="searchTxt button--antiman" placeholder="oo구 oo동(지번) / ooo로 검색 가능(도로명)">
                    <button class="searchBtn button button--antiman">검색</button>
                </div>
    
            </div>
    
    
            <div class="foodTypecategory">
                <h2>카테고리</h2>
                <ul>
                    <li>
                        <div class="category-box">
                            <label for="food-aType"><img src="../resources/images/foodType/bibimbap.jpg" alt="업종"></label>
                            <input type="checkbox" id="food-aType" value="한식">한식
                        </div>
                    </li>
                    <li>
                        <div class="category-box">
                            <label for="food-bType"><img src="../resources/images/foodType/black-bean-noodles.jpg" alt="업종"></label>
                            <input type="checkbox" id="food-bType" value="중식">중식
                        </div>
                    </li>
                    <li>
                        <div class="category-box">
                            <label for="food-cType"><img src="../resources/images/foodType/sushi.jpg" alt="업종"></label>
                            <input type="checkbox" id="food-cType" value="일식">일식
                        </div>
                    </li>
                    <li>
                        <div class="category-box">
                            <label for="food-dType"><img src="../resources/images/foodType/pizza.jpg" alt="업종"></label>
                            <input type="checkbox" id="food-dType" value="양식">양식
                        </div>
                    </li>
                    <li>
                        <div class="category-box">
                            <label for="food-eType"><img src="../resources/images/foodType/hamburger.jpg" alt="업종"></label>
                            <input type="checkbox" id="food-eType" value="패스트푸드">패스트푸드
                        </div>
                    </li>
                    <li>
                        <div class="category-box">
                            <label for="food-fType"><img src="../resources/images/foodType/alum.jpg" alt="업종"></label>
                            <input type="checkbox" id="food-fType" value="일반대중음식">일반대중음식
                        </div>
                    </li>
                    <li>
                        <div class="category-box">
                            <label for="food-gType"><img src="../resources/images/foodType/store.jpg" alt="업종"></label>
                            <input type="checkbox" id="food-gType" value="편의점">편의점
                        </div>
                    </li>
                    <li>
                        <div class="category-box">
                            <label for="food-hType"><img src="../resources/images/foodType/cookie.jpg" alt="업종"></label>
                            <input type="checkbox" id="food-hType" value="제과점">제과점
                        </div>
                    </li>
                    <li>
                        <div class="category-box">
                            <label for="food-iType"><img src="../resources/images/foodType/flesh.jpg" alt="업종"></label>
                            <input type="checkbox" id="food-iType" value="정육점">정육점
                        </div>
                    </li>
                    <li>
                        <div class="category-box">
                            <label for="food-jType"><img src="../resources/images/foodType/icon.png" alt="업종"></label>
                            <input type="checkbox" id="food-jType" value="착한식당">착한식당
                        </div>
                    </li>
                    <!--  <li>
                        <div class="category-box">
                            <label for="food-kType"><img src="../resources/images/foodType/icon.png" alt="업종"></label>
                            <input type="checkbox" id="food-kType">더보기
                        </div>
                    </li> -->
                </ul>
            </div>
    
            <div class="result-box">

                <div class="statistics">
                    <h3>가맹점 수</h3>
                    <br>
                    <ul class="statistics-ul">
                    <%-- 가맹점 타입별 점포 수 --%>
                    <c:forEach var="statList" items="${resultList}">
                        <li class="statistics-li">
                            <span>${statList.storeType}</span>
                            <span>${statList.storeCount}</span>
                        </li>
                    </c:forEach>
                    </ul>
                </div>

                <div class="searchList">
                    <h2>검색 결과</h2>
<!-- 
                    <div class="searchList-none">
                        검색 결과가 없습니다.
                    </div>
-->
                    <ul class="searchList-style">
<%-- 
                        <li>
                            <div class="storeInfo">
                                <span>가게 이름</span>
                                <span>가게 주소</span>
                                <span>가게 전화번호</span>
                            </div>
                            <div class="storeInfoLink">
                                <button>상세보기</button>
                            </div>
                        </li>
                        --%>
                    </ul>
                </div>

                <div class="bookmark">
                    <h3>즐겨찾기</h3>
                    <br>
                    <ul>
                        <li>
                            <span>삼겹살집</span>
                        </li>
                        <li>
                            <span>부대찌개</span>
                        </li>
                        <li>
                            <span>햄버거</span>
                        </li>
                        <li>
                            <span>매그노나르도</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- 상세보기 모달 팝업 -->
        <div class="modal-container">
            <div class="storeInfoModal-window">
                <div class="storeInfoModal-popup">
                    <div class="modal-title">
                        <span class="modal-title-hidden">새</span>
                        <span class="modal-title-name">상세보기</span>
                        <span class="modal-close-btn">&times;</span>
                    </div>
                    <div class="modal-content">
                        <div class="modal-content-left">
                            <span class="title">탐파(Tampa)</span>
                            <span class="content"><span class="content-title">지번주소 : </span>서울 마포구 연남동 260-2</span>
                            <span class="content"><span class="content-title">도로명 : </span>서울 마포구 동교로38길 12  지하1층 (연남동)</span>
                            <span class="content"><span class="content-title">전화번호 : </span>02-537-7172</span>
                            <%-- 상세보기 이미지 슬라이드 --%>
                            <div class="modal-slider">
                                <input type="radio" name="slide" id="slide1" checked>
                                <input type="radio" name="slide" id="slide2">
                                <input type="radio" name="slide" id="slide3">
                                <input type="radio" name="slide" id="slide4">
                                <ul id="imgHolder" class="modal-imgs">
                                    <li><img src="../resources/images/foodType/pizza.jpg"></li>
                                    <li><img src="../resources/images/foodType/cookie.jpg"></li>
                                    <li><img src="../resources/images/foodType/hamburger.jpg"></li>
                                    <li><img src="../resources/images/foodType/sushi.jpg"></li>
                                </ul>
                                <div class="modal-slider-dot">
                                    <label for="slide1">&nbsp;</label>
                                    <label for="slide2">&nbsp;</label>
                                    <label for="slide3">&nbsp;</label>
                                    <label for="slide4">&nbsp;</label>
                                </div>
                            </div>

                            <span class="content-pre">
                                &lt; 메뉴 설명 &gt;<br><br>
                                페페로니 피자 3,000원<br>
                                하와이안 피자 4,000원
                            </span>
                        </div>
                        <div class="modal-contant-right">
                            <!-- 지도 위치(카카오api) -->
                            <div id="map" style="width:350px;height:350px;"></div>
                            <!-- <span><img src="../resources/images/map.png" alt=""></span> -->
                            <span>
                                홈페이지 내부 규정상 가게에<br>
                                리뷰는 달 수 없음을 양해부탁드립니다.<br>
                                잘못된 정보는 문의에 남겨주시면<br>
                                빠른 시일내에 수정하겠습니다.<br>
                                <br>
                                - 새싹이 일동
                            </span>
                        </div>
                        <div class="modal-btn">
                            <button class="board-btn">문의하러 가기</button>
                            <button class="bookmark-btn">즐겨찾기 등록</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 슬라이드 쇼 광고 혹은 게시물 사진 사용 할 때 사용할 예정 -->
<!-- 
        <div id="slideshow">
            <div class="slide">
                <img src="../resources/images/mainslide/children-gcdcf2541f_1280.jpg" alt="Slide 1">
                <div class="caption">Caption 1</div>
            </div>
            <div class="slide">
                <img src="../resources/images/mainslide/children-gfd08c2a3f_1280.jpg" alt="Slide 2">
                <div class="caption">Caption 2</div>
            </div>
            <div class="slide">
                <img src="../resources/images/mainslide/girls-gf0fcf7f58_1280.jpg" alt="Slide 3">
                <div class="caption">Caption 3</div>
            </div>
        </div>
        -->
    </main>

    <%-- 푸터 위치 --%>
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>
    
    <!-- 카카오 api -->
    <!-- <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=9227b223417161b5e676ce8ceee2a4a9"></script> -->
    <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=9227b223417161b5e676ce8ceee2a4a9&libraries=services"></script>
    
    <%-- 제이쿼리 사용시 필요한 스크립트 --%>
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" 
    integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" 
    crossorigin="anonymous"></script>

    <script src="../resources/js/header.js"></script>
    <script src="../resources/js/mainPage.js"></script>


</body>
</html>