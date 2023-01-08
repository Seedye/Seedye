<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:set var="boardCode" value="${map.boardCode}" />

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
    <link rel="stylesheet" href="/resources/css/admin/storeModal.css">
    <link rel="stylesheet" href="/resources/css/board/board-view-style.css">
</head>
<body>
    <main>
        <jsp:include page="/WEB-INF/views/common/header.jsp" />
        <jsp:include page="/WEB-INF/views/admin/store.jsp" />
        
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
                                <span>커뮤니티</span>
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
                    <span class="manageTitle"> ${map.boardCode} 관리</span>
                    <table id=boardTable>
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
                    <div id="searchBoard">
                        <select name="search" id="search">
                            <option value="title">제목</option>
                            <option value="content">내용</option>
                            <option value="writer">작성자</option>
                        </select>
                        <input type="text" name="keyword" id="keyword">
                        <button id="searchBtn">검색</button>
                    </div>
                    <div id="returnArea">
                        <a href="/admin/manageBoard">돌아가기</a>
                    </div>
                    <div class="pagination-area">
                        <ul class="pagination">
                        </ul>
                    </div>
                </div>
                
            </div>
        </div>
    </main>
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>
    <Jsp:include page="/WEB-INF/views/board/boardView.jsp"/>
    <script>      
    var loginMemberAuthority = "${loginMember.authority}";
    const boardCode = "${boardCode}"
    console.log(boardCode);
    </script>
<script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
   <script src="/resources/js/sideBar.js"></script>
   <script src="/resources/js/admin/swiper.min.js"></script>
   <script src="/resources/js/header.js"></script>
   <script src="/resources/js/admin/boardManage.js"></script>
   <script src="/resources/js/board/QAview.js"></script>
</body>
</html>