<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>boardList</title>
    <link rel="stylesheet" href="../../resources/css/header.css">
    <link rel="stylesheet" href="../../resources/css/sideBar.css">
    <%-- 게시물 css --%>
    <link rel="stylesheet" href="../../resources/css/board/boardList-style.css">
    <link rel="stylesheet" href="../../resources/css/board/board-view-style.css">
    <link rel="stylesheet" href="../../resources/css/board/board-write-style.css">

    <script src="https://kit.fontawesome.com/95f413b465.js" crossorigin="anonymous"></script>
</head>
<body>
  <%-- 헤더 추가 --%>
  <jsp:include page="/WEB-INF/views/common/header.jsp"/>
    <main>
      <!-- board 영역 -->
      <section class="board-body-area">
        <div class="board-title">
          <img src="../../resources/images/커뮤니티배경.jpg" alt="">
          <p>커뮤니티</p>
        </div>
        <!-- 검색 -->
        <div class="board-list-serch-write-area">
          <!-- 검색어 입력 input -->
          <div class="board-list-serch">
            <input type="text" >
          </div>
          <!-- 검색 버튼 -->
          <button><i class="fa-solid fa-magnifying-glass fa-1.8x"></i></button>
          <!-- 글작성 버튼 -->
          <div class="board-write-btn" id="boardWriteBtn">글작성</div>
        </div>

    
        <!-- 게시글 리스트 영역 -->
        <div class="board-list-area">
          <%-- 사이드바 --%>
          <jsp:include page="/WEB-INF/views/common/sideBar.jsp"/>

          <!-- 게시글 나타나는 테이블 -->
          <table class="board-list-table">
            <thead class="board-list-thead">
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>조회수</th>
              <th>등록일</th>
            </thead>
            <tbody>
            <c:choose>
            <%-- 게시글 존재  x 시 --%>
              <c:when test="${empty boardList}">
                <tr>
                  <th colspan="5">게시글 존재 하지 않습니다.</th>
                </tr>
              </c:when>

              <c:otherwise>
                <c:forEach var="board" items="${boardList}">
                   <tr class="board-list-view" >
                    <td>${board.boardNo}</td>
                    <td>${board.boardContent}</a></td>
                    <td>${board.memberNo}</td>
                    <td>${board.readCount}</td>
                    <td>${board.createDate}</td>
                  </tr>
                </c:forEach>
              </c:otherwise>
            
            </c:choose>
              <!-- 공지 -->
              <%-- <tr class="board-list-view">
                <td><i class="fa-solid fa-bullhorn"></i></td>
                <td>음식점 정보가 변경되었습니다.</td>
                <td>작성자</td>
              <td>44</td>
                <td>2022.12.13</td>
      <!-- colspan="2" -->
              </tr> --%>

              <!-- 게시물 -->
              <%-- <tr class="board-list-view">
                <td>10</td>
                <td>음식점 정보가 잘못되어있는거 같습니다.</td>
                <td>작성자</td>
              <td>44</td>
                <td>2022.11.23</td>
              </tr>
            </tbody>
          

          </table>
      
            <ul class="board-list-page-area">
              <li><i class="fa-solid fa-caret-left"></i></li>
              <li><i class="fa-solid fa-angle-left"></i></li>
              <li class="board-list-page-no">1</li>
              <li class="board-list-page-no">2</li>
              <li class="board-list-page-no">3</li>
              <li class="board-list-page-no">4</li>
              <li class="board-list-page-no">5</li>
              <li class="board-list-page-no">6</li>
              <li class="board-list-page-no">7</li>
              <li class="board-list-page-no">8</li>
              <li class="board-list-page-no">9</li>
              <li class="board-list-page-no">10</li>
              <li><i class="fa-solid fa-angle-right"></i></li>
              <li><i class="fa-solid fa-caret-right"></i></li>
            </ul>
            <!-- <div class="board-list-page-num"></div>
            <div class="board-list-page-num"></div> -->
          </div>

          
      </section>
      <%-- 상세보기 모달 연결 --%>
      <jsp:include page="/WEB-INF/views/board/boardView.jsp"/>
      <%-- 게시물작성 모달 연결 --%>
      <jsp:include page="/WEB-INF/views/board/boardWrite.jsp"/>
    </main>

    <script src="https://code.jquery.com/jquery-3.6.2.min.js" integrity="sha256-2krYZKh//PcchRtd+H+VyyQoZ/e3EcrkxhM8ycwASPA=" crossorigin="anonymous"></script>
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>
    
    <script src="../../resources/js/sideBar.js"></script>
    <script src="../../resources/js/board.js"></script>
    <script src="../../resources/js/header.js"></script>
</body>
</html>

