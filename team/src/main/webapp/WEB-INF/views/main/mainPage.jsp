<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>새싹이 -꿈나무카드 가맹점 찾기</title>

    <link rel="stylesheet" href="../resources/css/mainPage.css">
</head>
<body>

    <%-- 헤더 위치 --%>

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
                            <input type="checkbox" id="food-aType">한식
                        </div>
                    </li>
                    <li>
                        <div class="category-box">
                            <label for="food-bType"><img src="../resources/images/foodType/black-bean-noodles.jpg" alt="업종"></label>
                            <input type="checkbox" id="food-bType">중식
                        </div>
                    </li>
                    <li>
                        <div class="category-box">
                            <label for="food-cType"><img src="../resources/images/foodType/sushi.jpg" alt="업종"></label>
                            <input type="checkbox" id="food-cType">일식
                        </div>
                    </li>
                    <li>
                        <div class="category-box">
                            <label for="food-dType"><img src="../resources/images/foodType/pizza.jpg" alt="업종"></label>
                            <input type="checkbox" id="food-dType">양식
                        </div>
                    </li>
                    <li>
                        <div class="category-box">
                            <label for="food-eType"><img src="../resources/images/foodType/hamburger.jpg" alt="업종"></label>
                            <input type="checkbox" id="food-eType">패스트푸드
                        </div>
                    </li>
                    <li>
                        <div class="category-box">
                            <label for="food-fType"><img src="../resources/images/foodType/alum.jpg" alt="업종"></label>
                            <input type="checkbox" id="food-fType">일반대중음식
                        </div>
                    </li>
                    <li>
                        <div class="category-box">
                            <label for="food-gType"><img src="../resources/images/foodType/store.jpg" alt="업종"></label>
                            <input type="checkbox" id="food-gType">편의점
                        </div>
                    </li>
                    <li>
                        <div class="category-box">
                            <label for="food-hType"><img src="../resources/images/foodType/cookie.jpg" alt="업종"></label>
                            <input type="checkbox" id="food-hType">제과점
                        </div>
                    </li>
                    <li>
                        <div class="category-box">
                            <label for="food-iType"><img src="../resources/images/foodType/flesh.jpg" alt="업종"></label>
                            <input type="checkbox" id="food-iType">정육점
                        </div>
                    </li>
                    <li>
                        <div class="category-box">
                            <label for="food-jType"><img src="../resources/images/foodType/icon.png" alt="업종"></label>
                            <input type="checkbox" id="food-jType">착한식당
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
                    <ul>
                        <li>
                            <span>한식 : 300,000개</span>
                        </li>
                        <li>
                            <span>중식 : 300,000개</span>
                        </li>
                        <li>
                            <span>일식 : 300,000개</span>
                        </li>
                        <li>
                            <span>양식 : 300,000개</span>
                        </li>
                        <li>
                            <span>편의점 : 300,000개</span>
                        </li>
                        <li>
                            <span>제과점 : 300,000개</span>
                        </li>
                        <li>
                            <span>정육점 : 300,000개</span>
                        </li>
                        <li>
                            <span>패스트푸드 : 300,000개</span>
                        </li>
                        <li>
                            <span>일반대중음식 : 300,000개</span>
                        </li>
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
        <div class="modal-cont">
            <div class="storeInfoModal-window">
                <div class="storeInfoModal-popup">
                    <div class="modal-title">
                        <span class="modal-title-hidden">새</span>
                        <span class="modal-title-name">상세보기</span>
                        <span class="modal-close-btn">&times;</span>
                    </div>
                    <div class="modal-content">
                        <div class="modal-content-left">
                            <span class="title">가게 이름</span>
                            <span class="content">가게 주소</span>
                            <span class="content">가게 전화번호</span>
                            <span>이미지</span>
                            <span class="content">메뉴설명</span>
                        </div>
                        <div class="modal-contant-right">
                            지도 마커
                            리뷰 x
                            <div class="modal-btn">
                                <button>잘못된 정보 신고하러 가기</button>
                                <button>즐겨찾기 등록</button>
                            </div>
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
    
</body>
</html>