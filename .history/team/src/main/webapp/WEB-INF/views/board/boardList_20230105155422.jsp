<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
  String queryValue = request.getParameter("query");
%>

<c:set var="boardList" value="${map.boardList}"/>
<c:set var="pagination" value="${map.pagination}"/>

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
  <jsp:include page="/WEB-INF/views/admin/store.jsp" />
    <main>
      <!-- board 영역 -->
      <section class="board-body-area">
        <div class="board-title">
          <img src="../../resources/images/커뮤니티배경.jpg" alt="">
          <p>커뮤니티</p>
        </div>
        <div>
          <p>문의 게시판</p>
        </div>
        <!-- 검색 -->
        <form action="4" method="get" id="boardSearch" onSubmit="return true">
          <div class="board-list-serch-write-area">

              <!-- 검색어 입력 input -->
              <div class="board-list-serch">
                <select name="key" id="search-key">
                  <option value="t">제목</option>
                  <option value="c">내용</option>
                  <option value="tc">제목+내용</option>
                  <option value="w">작성자</option>
                </select>
                <input type="text" name="query" id="search-query">
              </div>

              <!-- 검색 버튼 -->
              <button class="board-serch-btn"><i class="fa-solid fa-magnifying-glass fa-1.8x"></i></button>

              
              <div class="board-write-btn" id="boardWriteBtn">글작성</div>

            

          </div>
        </form>

    
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
                  <tr class="board-list-view">
                    <td>${board.boardNo}</td>
                    <td><i class="fa-solid fa-seedling"></i>${board.boardTitle}</a></td>
                    <td>${board.memberId}</td>
                    <td>${board.readCount}</td>
                    <td id="${board.boardNo}">${board.createDate}</td>
                  </tr>
                </c:forEach>
              </c:otherwise>
            
            </c:choose>
<%--             
              <!-- 공지 -->
              <tr class="board-list-view">
                <td><i class="fa-solid fa-bullhorn"></i></td>
                <td>음식점 정보가 변경되었습니다.</td>
                <td>작성자</td>
                <td>44</td>
                <td>2022.12.13</td>
              </tr>

              <!-- 게시물 -->
              <tr class="board-list-view">
                <td>10</td>
                <td>음식점 정보가 잘못되어있는거 같습니다.</td>
                <td>작성자</td>
              <td>44</td>
                <td>2022.11.23</td>
              </tr> 
--%>
            </tbody>
        
          </table>
            <%-- 페이지네이션 --%>
            <ul class="board-list-page-area">

            <c:choose>

                    <%-- <c:if test="${param.cp ==10}"> --%>
                    
                      <c:when test="${not empty param.query}">
                        <%-- 첫 페이지로 이동 --%>
                        
                        <li>
                          <a href="/boardList/${boardCode}?cp=1&key=${param.key}&query=${param.query}">
                            <i class="fa-solid fa-caret-left"></i>
                          </a>
                        </li>
                        
                        
                        <%-- 이전 목록 마지막 번호로 이동 --%>
                        <li>
                          <a href="/boardList/${boardCode}?cp=${pagination.prevPage}&key=${param.key}&query=${param.query}">
                            <i class="fa-solid fa-angle-left"></i>
                          </a>
                        </li>
                      </c:when>
                      <c:otherwise>
                        <%-- 첫 페이지로 이동 --%>
                        <c:if test="${param.cp >1}">
                        
                       <li>
                          <a href="/boardList/${boardCode}?cp=1${sURL}">
                            <i class="fa-solid fa-caret-left"></i>
                          </a>
                        </li>
                        <%-- 이전 목록 마지막 번호로 이동 --%>
                        <li>
                          <a href="/boardList/${boardCode}?cp=${pagination.prevPage}">
                            <i class="fa-solid fa-angle-left"></i>
                          </a>
                        </li>
                        </c:if>
                      </c:otherwise>
                    <%-- </c:if> --%>
                    
            </c:choose>
              

<%--               
              <li class="board-list-page-no">3</li>
              <li class="board-list-page-no">4</li>
              <li class="board-list-page-no">5</li>
              <li class="board-list-page-no">6</li>
              <li class="board-list-page-no">7</li>
              <li class="board-list-page-no">8</li>
              <li class="board-list-page-no">9</li>
              <li class="board-list-page-no">10</li> --%>

              <c:forEach var="i" begin="${pagination.startPage}" 
                                  end="${pagination.endPage}" step="1">
              
                <c:choose>
                  <c:when test="${i == pagination.currentPage}">
                    <li class="board-list-page-no"><a>${i}</a></li>
                  </c:when>
                
                  <c:otherwise>

                    <c:choose>
                    
                      <c:when test="${not empty param.query}">
                        <li class="board-list-page-no" id="${i}"><a class="aaa" href="/boardList/${boardCode}?cp=${i}&key=${param.key}&query=${param.query}">${i}</a></li>
                      </c:when>
                      <c:otherwise>
                      
                        <li class="board-list-page-no" id="${i}"><a class="aaa" href="/boardList/${boardCode}?cp=${i}${sURL}">${i}</a></li>
                      </c:otherwise>
                    
                    </c:choose>
                  </c:otherwise>
                </c:choose>
              
              </c:forEach>
              

              <!-- 다음 목록 시작 번호로 이동 -->

                    <c:choose>
                    
                      <c:when test="${not empty param.query}">
                        <%-- <li class="board-list-page-no"><a href="/boardList/${boardCode}?cp=${i}&key=${param.key}&query=${param.query}">${i}</a></li> --%>
                        <li><a href="/boardList/${boardCode}?cp=${pagination.nextPage}&key=${param.key}&query=${param.query}"><i class="fa-solid fa-angle-right"></i></a></li>

                        <!-- 끝 페이지로 이동 -->
                        <li><a href="/boardList/${boardCode}?cp=${pagination.maxPage}&key=${param.key}&query=${param.query}"><i class="fa-solid fa-caret-right"></i></a></li>
                      </c:when> 
                      <c:otherwise>
                      
                      <c:if test="${param.cp != pagination.maxPage}">
                        <%-- <li class="board-list-page-no"><a href="/boardList/${boardCode}?cp=${i}${sURL}">${i}</a></li> --%>
                        <li><a href="/boardList/${boardCode}?cp=${pagination.nextPage}"><i class="fa-solid fa-angle-right"></i></a></li>
                        <%-- ${pagination.nextPage} --%>
                      </c:if>

                      ${param.cp}
                      ${pagination.maxPage}

                        <c:if test="${param.cp < pagination.maxPage}">
                          <!-- 끝 페이지로 이동 -->
                          <li><a href="/boardList/${boardCode}?cp=${pagination.maxPage}"><i class="fa-solid fa-caret-right"></i></a></li>
                        </c:if>
                      
                      </c:otherwise>
                    
                    </c:choose>
              
              <%-- <li><i class="fa-solid fa-angle-right"></i></li>
              <li><i class="fa-solid fa-caret-right"></i></li> --%>
            </ul>
            <!-- <div class="board-list-page-num"></div>
            <div class="board-list-page-num"></div> -->
          </div>

          
      </section>
      
      <%-- 상세보기 모달 연결 --%>
      <jsp:include page="/WEB-INF/views/board/boardView.jsp"/>
      <%-- 게시물작성 모달 연결 --%>
      <jsp:include page="/WEB-INF/views/board/boardWrite.jsp"/>
      <jsp:include page="/WEB-INF/views/common/footer.jsp"/>
      
      
    </main>
    <script>
    
      var boardNo = "${boardList[0].boardNo}";
      var loginMemberAutority = "${loginMember.authority}";
      var memberNo = "${loginMember.memberNo}";
      var cp = "${param.cp}";
    </script>

    <script src="https://code.jquery.com/jquery-3.6.2.min.js" integrity="sha256-2krYZKh//PcchRtd+H+VyyQoZ/e3EcrkxhM8ycwASPA=" crossorigin="anonymous"></script>
    
    <script src="../../resources/js/header.js"></script>
    <script src="../../resources/js/sideBar.js"></script>
    <script src="../../resources/js/board.js"></script>
    <script src="../../resources/js/board/QAview.js"></script>
</body>
</html>



