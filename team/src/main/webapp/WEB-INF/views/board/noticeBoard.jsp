<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>공지사항</title>
    <link rel="stylesheet" href="/resources/css/header.css">
    <link rel="stylesheet" href="/resources/css/board/noticeBoard.css">
</head>
<body>
    <jsp:include page="/WEB-INF/views/common/header.jsp" />
    <main>
        <div id="noticeAll">
            <div id="banner"><img src="/resources/images/important.png"></div>
            <div id="tableArea">
                <table id="noticeTable">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>조회수</th>
                            <th>등록일</th>
                        </tr>
                    </thead>
                    <tbody id="noticeTbody">
                        <%--<tr>
                            <td>1</td>
                            <td>제목</td>
                            <td>작성자</td>
                            <td>5</td>
                            <td>2022.12.22</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>제목</td>
                            <td>작성자</td>
                            <td>5</td>
                            <td>2022.12.22</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>제목</td>
                            <td>작성자</td>
                            <td>5</td>
                            <td>2022.12.22</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>제목</td>
                            <td>작성자</td>
                            <td>5</td>
                            <td>2022.12.22</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>제목</td>
                            <td>작성자</td>
                            <td>5</td>
                            <td>2022.12.22</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>제목</td>
                            <td>작성자</td>
                            <td>5</td>
                            <td>2022.12.22</td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>제목</td>
                            <td>작성자</td>
                            <td>5</td>
                            <td>2022.12.22</td>
                        </tr>
                        <tr>
                            <td>8</td>
                            <td>제목</td>
                            <td>작성자</td>
                            <td>5</td>
                            <td>2022.12.22</td>
                        </tr>
                        <tr>
                            <td>9</td>
                            <td>제목</td>
                            <td>작성자</td>
                            <td>5</td>
                            <td>2022.12.22</td>
                        </tr>
                        <tr>
                            <td>10</td>
                            <td>제목</td>
                            <td>작성자</td>
                            <td>5</td>
                            <td>2022.12.22</td>
                        </tr>--%>
                    </tbody>
                </table>
                <div class="pagination-area">
                    <ul class="pagination">
                        <!-- 첫 페이지로 이동 -->
                        <li><a href="/board/${boardCode}?cp=1${sURL}">&lt;&lt;</a></li>
                        <!-- 이전 목록 마지막 번호로 이동 -->
                        <li><a href="/board/${boardCode}?cp=${pagination.prevPage}${sURL}">&lt;</a></li>
    
                        <c:forEach var="i" begin="${pagination.startPage}" 
                            end="${pagination.endPage}" step="1">
    
                            <c:choose>
                                <c:when test="${i == pagination.currentPage}">
                                    <%-- 현재 페이지인 경우 --%>
                                    <li><a class="current">${i}</a></li>
                                </c:when>
    
                                <c:otherwise>
                                    <!-- 현재 페이지를 제외한 나머지 -->
                                    <li><a href="/board/${boardCode}?cp=${i}${sURL}">${i}</a></li>
                                </c:otherwise>
                            </c:choose>
    
                        </c:forEach>
                        <!-- 특정 페이지로 이동 -->
                        
                        <!-- 다음 목록 시작 번호로 이동 -->
                        <li><a href="/board/${boardCode}?cp=${pagination.nextPage}${sURL}">&gt;</a></li>
    
                        <!-- 끝 페이지로 이동 -->
                        <li><a href="/board/${boardCode}?cp=${pagination.maxPage}${sURL}">&gt;&gt;</a></li>
    
                    </ul>
                </div>
                <div>
                    <button id="writeBtn">작성</button>
                </div>
                <div>
                    <form action="">
                        <select name="" id="">
                            <option value="">제목</option>
                            <option value="">내용</option>
                        </select>
                        <input type="text">
                        <button>검색</button>
                    </form>
                </div>

            </div>
        </div>    



    </main>
    <jsp:include page="/WEB-INF/views/common/footer.jsp" />
    <script src="/resources/js/admin/noticeBoard.js"></script>


</body>
</html>