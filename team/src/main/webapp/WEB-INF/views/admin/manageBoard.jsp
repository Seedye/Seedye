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
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>작성자</th>
                                <th>조회수</th>
                                <th>등록일</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody id="tbody">
                            <%-- <tr>
                                <td>1</td>
                                <td>test</td>
                                <td>2022.12.19</td>
                                <td>테스트</td>
                                <td>4</td>
                                <td>
                                    <button>관리</button>
                                </td>
                            </tr> --%>
                        </tbody>    
                    </table>
                    <form action="">
                        <div id="searchBoard">
                            <select name="" id="">
                                <option value="">이름</option>
                                <option value="">내용</option>
                                <option value="">작성자</option>
                            </select>
                            <input type="text">
                            <button>검색</button>
                        </div>
                    </form>
                </div>
                
            </div>
        </div>
    </main>
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>
<script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
   <script src="/resources/js/sideBar.js"></script>
   <script src="/resources/js/admin/swiper.min.js"></script>
   <script src="/resources/js/header.js"></script>
   <script src="/resources/js/admin/boardManage.js"></script>
</body>
</html>