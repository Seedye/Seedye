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
                <div id="pagination-area">
                    <ul class="pagination">
                        <li><a href="">&lt;&lt;</a></li>
                        <li><a href="">1</a></li>
                        <li><a href="">2</a></li>
                        <li><a href="">3</a></li>
                        <li><a href="">4</a></li>
                        <li><a href="">5</a></li>
                        <li><a href="">6</a></li>
                        <li><a href="">7</a></li>
                        <li><a href="">8</a></li>
                        <li><a href="">9</a></li>
                        <li><a href="">10</a></li>
                        <li><a href="">&gt;&gt;</a></li>
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