<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:set var="freeBoardList" value="${map.freeBoardList}"/>
<c:set var="pagination" value="${map.pagination}"/>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../resources/css/header.css">
    <link rel="stylesheet" href="../../resources/css/sideBar.css">
    <link rel="stylesheet" href="../../resources/css/board/freeBoardList.css">
    <link rel="stylesheet" href="../../resources/css/board/board-write-style.css">
    <title>자유 게시판</title>
    <script src="https://kit.fontawesome.com/8cc6d5f0de.js" crossorigin="anonymous"></script>
</head>
<body>
    <jsp:include page="/WEB-INF/views/common/header.jsp"/>

    <main>
    <jsp:include page="/WEB-INF/views/common/sideBar.jsp"/>

        <section id="freeBoard-section">
            <div id="freeBoard-container">
               <form action="3" method="get" id="boardSearch" onSubmit="return true">
                    <div class="board-list-serch-write-area">
                    <p>자유 게시판</p>

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

                        <c:if test="${not empty loginMember}">
                            <!-- 글작성 버튼 -->
                            <div class="board-write-btn" id="boardWriteBtn">글작성</div>
                        </c:if>

                    </div>
                 </form>

                <div id="freeBoard-content">
                    <div id="freeBoard-list">
                        <ul id="ul-container">
                            <c:forEach var="freeBoard" items="${freeBoardList}">
                            <li class="freeBoard-listOne">
                                <div>
                                    <div class="freeBoard-title">
                                        <i class="fa-solid fa-seedling"></i>
                                        <p>${freeBoard.boardTitle}</p>
                                    </div>
                                    <div class="freeBoard-information">${freeBoard.memberId} | ${freeBoard.createDate}</div>
                                </div>
                                <div class="arrow" id="${freeBoard.boardNo}">
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            </li>
                            </c:forEach>
                            <%-- <li>
                                <div>
                                    <div class="freeBoard-title">
                                        <i class="fa-solid fa-seedling"></i>
                                        <p>새싹이가 정보를 정확하게 알려주지 않아요</p>
                                    </div>
                                    <div class="freeBoard-information">작성자 | 작성일</div>
                                </div>
                                <div class="asd">
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            </li> --%>
                            
                        </ul>
                    </div>
                    
                    <div id="freeBoard-detail">
                        <div id="freeBoard-detail-view">

                            <%-- <p>10번째 게시글 입니다.</p>
                            
                            <div id="freeBoard-detail-title">
                                <p>내용</p>
                                <p>작성자 / 작성일</p>
                            </div>

                            <p id="freeBoard-detail-content">사이트에 적혀져 있는 음식정보랑 가게에 직접갔을때 정보가 다른거 같습니다.빠른 업데이트 부탁드립니다. 매번 쉽게 사이트로 음식점을 찾을수 있어 좋지만, 이런 부분은 빠른 업데이트가 있으면 좋을것 같습니다. 항상 응원하겠습니다!</p>
                            
                            <div>
                                <img src="../../resources/images/새싹이.png">
                            </div> 
                            
                            <div id="freeBoard-detail-anwser">
                                <p>답변</p>
                                <input type="text" id="commentContent">
                                <button>답글 작성</button>
                            </div>  --%>

                        </div>
                    </div>
                </div>

            <ul class="board-list-page-area">
                <c:choose>
                
                    <c:when test="${not empty param.query}">
                    <li>
                        <a href="/freeBoardList/${boardCode}?cp=1&key=${param.key}&query=${param.query}">
                        <i class="fa-solid fa-caret-left"></i>
                        </a>
                    </li>

                    <li>
                        <a href="/freeBoardList/${boardCode}?cp=${pagination.prevPage}&key=${param.key}&query=${param.query}">
                        <i class="fa-solid fa-angle-left"></i>
                        </a>
                    </li>
                    </c:when>

                    <c:otherwise>
                    <li>
                        <a href="/freeBoardList/${boardCode}?cp=1${sURL}">
                        <i class="fa-solid fa-caret-left"></i>
                        </a>
                    </li>
                    
                    <li>
                        <a href="/freeBoardList/${boardCode}?cp=${pagination.prevPage}${sURL}">
                        <i class="fa-solid fa-angle-left"></i>
                        </a>
                    </li>
                    </c:otherwise>
                
                </c:choose>

                <c:forEach var="i" begin="${pagination.startPage}" 
                                    end="${pagination.endPage}" step="1">
                
                    <c:choose>
                        <c:when test="${i == pagination.currentPage}">
                            <li class="board-list-page-no"><a>${i}</a></li>
                        </c:when>
                        
                        <c:otherwise>

                            <c:choose>
                            
                            <c:when test="${not empty param.query}">
                                <li class="board-list-page-no"><a href="/freeBoardList/${boardCode}?cp=${i}&key=${param.key}&query=${param.query}">${i}</a></li>
                            </c:when>

                            <c:otherwise>
                                <li class="board-list-page-no" id="${i}"><a href="/freeBoardList/${boardCode}?cp=${i}${sURL}">${i}</a></li>
                            </c:otherwise>
                            
                            </c:choose>
                        
                        </c:otherwise>
                    </c:choose>
                
                </c:forEach>

                <!-- 다음 목록 시작 번호로 이동 -->

                    <c:choose>
                    
                      <c:when test="${not empty param.query}">
                        <%-- <li class="board-list-page-no"><a href="/boardList/${boardCode}?cp=${i}&key=${param.key}&query=${param.query}">${i}</a></li> --%>
                        <li><a href="/freeBoardList/${boardCode}?cp=${pagination.nextPage}&key=${param.key}&query=${param.query}"><i class="fa-solid fa-angle-right"></i></a></li>

                        <!-- 끝 페이지로 이동 -->
                        <li><a href="/freeBoardList/${boardCode}?cp=${pagination.maxPage}&key=${param.key}&query=${param.query}"><i class="fa-solid fa-caret-right"></i></a></li>
                      </c:when>
                      <c:otherwise>
                      
                        <%-- <li class="board-list-page-no"><a href="/boardList/${boardCode}?cp=${i}${sURL}">${i}</a></li> --%>
                        <li><a href="/freeBoardList/${boardCode}?cp=${pagination.nextPage}${sURL}"><i class="fa-solid fa-angle-right"></i></a></li>

                        <!-- 끝 페이지로 이동 -->
                        <li><a href="/freeBoardList/${boardCode}?cp=${pagination.maxPage}${sURL}"><i class="fa-solid fa-caret-right"></i></a></li>
                      </c:otherwise>
                    
                    </c:choose>
            </ul>

            </div>
        </section>

    <jsp:include page="/WEB-INF/views/board/freeBoardWrite.jsp"/>
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>    
    </main>

    <script>
        var boardNo = "${freeBoardList[0].boardNo}";
        var memberId = "${loginMember.memberId}";
        var memberNo = "${loginMember.memberNo}";
        var loginMemberAuthority = "${loginMember.loginMemberAuthority}";
    </script>

    <script src="https://code.jquery.com/jquery-3.6.2.min.js" integrity="sha256-2krYZKh//PcchRtd+H+VyyQoZ/e3EcrkxhM8ycwASPA=" crossorigin="anonymous"></script>

    <script src="../../resources/js/freeBoard.js"></script>
    <script src="../../resources/js/sideBar.js"></script>
    <script src="../../resources/js/header.js"></script>
    <script src="../../resources/js/board.js"></script>

</body>
</html>