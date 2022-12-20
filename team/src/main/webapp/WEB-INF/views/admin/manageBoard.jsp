<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>관리자 페이지</title>
    <link rel="stylesheet" href="/resources/css/admin/boardManage.css">
    <link rel="stylesheet" href="/resources/css/header.css">
    <link rel="stylesheet" href="/resources/css/sideBar.css">
    <link rel="stylesheet" href="/resources/css/admin/swiper.min.css">
</head>
<body>
    <main>
        <jsp:include page="/WEB-INF/views/common/header.jsp" />
        <div id="adminMain">    
            
            <jsp:include page="/WEB-INF/views/common/sideBar.jsp"/>

            <div id="boardManage" class="admin-mainMenu">
                <div class="swiper-container" id="swiperMain">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <div class="container" id="boardNotice">
                            <span>공지사항</span>
                            <img src="/resources/images/공지사항.jpg">
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="container" id="update">
                            <span>업데이트</span>
                            <img src="/resources/images/업데이트.jpg">
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="container" id="freeBoard">
                                <span>자유 게시판</span>
                                <img src="/resources/images/자유게시판.jpg">
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="container" id="question">
                            <span>문의게시판</span>
                            <img src="/resources/images/문의게시판.jpg">
                            </div>
                        </div>

                    </div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>


                </div>
                <div id="boardTest">
                    <table>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>등록일</th>
                            <th>작성자</th>
                            <th>조회수</th>
                            <th>관리</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>test</td>
                            <td>2022.12.19</td>
                            <td>테스트</td>
                            <td>4</td>
                            <td>
                                <button>관리</button>
                            </td>
                        </tr>
                    </table>
                </div>
                
            </div>
        </div>
    </main>
    <footer>
        <p>
            Copyright &copy; KH Information Educational Institute A-Class Seedye Team
        </p>
        <article>
            <a href="#">프로젝트 소개</a>
            <span>|</span>
            <a href="#">이용약관</a>
            <span>|</span>
            <a href="#">개인정보처리방침</a>
            <span>|</span>
            <a href="#">고객센터</a>
        </article>
    </footer>
   <script src="/resources/js/sideBar.js"></script>
   <script src="/resources/js/admin/swiper.min.js"></script>
   <script src="/resources/js/admin/boardManage.js"></script>
</body>
</html>