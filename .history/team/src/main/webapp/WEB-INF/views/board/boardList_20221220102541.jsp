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
          <div class="board-write-btn">글작성</div>
        </div>

    <%-- 상세보기 연결 --%>
    <%-- <jsp:include page="/WEB-INF/views/board/boardView.jsp"/> --%>
        <!-- 게시글 리스트 영역 -->
        <div class="board-list-area">
          <%-- 사이드바 --%>
          <jsp:include page="/WEB-INF/views/common/sideBar.jsp"/>

          <!-- 게시글 나타나는 테이블 -->
          <table class="board-list-table">
            <thead class="board-list-thead">
              <th>번호</th>
              <th>제목</th>
              <th>처리상태</th>
              <th>등록일</th>
            </thead>
            <tbody>

              <!-- 공지 -->
              <tr class="board-list-view">
                <td>공지</td>
                <td>음식점 정보가 변경되었습니다.</td>
                <td>공지사항</td>
                <td>2022.12.13</td>
      <!-- colspan="2" -->
              </tr>

              <!-- 게시물 -->
              <tr class="board-list-view">
                <td>10</td>
                <td>음식점 정보가 잘못되어있는거 같습니다.</td>
                <td>처리중</td>
                <td>2022.11.23</td>
              </tr>

              <tr class="board-list-view">
                <td>9</td>
                <td>새싹 덕분에 잘 </td>
                <td>처리중</td>
                <td>2022.11.23</td>
              </tr>

              <tr class="board-list-view">
                <td>8</td>
                <td>너무 구려</td>
                <td>처리완료</td>
                <td>2022.11.23</td>
              </tr>

              <tr class="board-list-view">
                <td>7</td>
                <td>음식점정보가 너무 이상하네요. </td>
                <td>처리완료</td>
                <td>2022.11.23</td>
              </tr>
              <tr class="board-list-view">
                <td>6</td>
                <td>음식점정보가 너무 이상하네요.  </td>
                <td>처리완료</td>
                <td>2022.11.23</td>
              </tr>
              <tr class="board-list-view">
                <td>5</td>
                <td>음식점정보가 너무 이상하네요.  </td>
                <td>처리완료</td>
                <td>2022.11.23</td>
              </tr>
              <tr class="board-list-view">
                <td>4</td>
                <td>음식점정보가 너무 이상하네요. </td>
                <td>처리완료</td>
                <td>2022.11.23</td>
              </tr>
              <tr class="board-list-view">
                <td>3</td>
                <td>음식점정보가 너무 이상하네요. 게요. </td>
                <td>처리완료</td>
                <td>2022.11.23</td>
              </tr>
              <tr class="board-list-view">
                <td>2</td>
                <td>음식점정보가 너무 이상하네요. 맨탁 드릴게요. </td>
                <td>처리완료</td>
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
    </main>
    
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>
    
    <script src="../../resources/js/board.js"></script>
    <script src="../../resources/js/board.js"></script>
</body>
</html>

