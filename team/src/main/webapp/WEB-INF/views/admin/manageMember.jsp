<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:set var="pagination" value="${map.pagination}"/>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>관리자 메뉴</title>
    <link rel="stylesheet" href="/resources/css/admin/admin-copy1.css">
    <link rel="stylesheet" href="/resources/css/header.css">
    <link rel="stylesheet" href="/resources/css/sideBar.css">

</head>
<body>
    <main>
        <jsp:include page="/WEB-INF/views/common/header.jsp" /> 

        <div id="adminMain">
            <jsp:include page="/WEB-INF/views/common/sideBar.jsp" />
            <!-- 회원 관리 -->
            <div id="adminMember" class="admin-mainMenu">
                <div id="tableArea">
                    <h1 id="memberH1">회원 관리</h1>
                    <table class="list-table">
                        <thead>
                            <tr id="tableHead">
                                <th class = "memberNo">회원 번호</th>
                                <th cl>회원 종류</th>
                                <th>아이디</th>
                                <th>전화번호</th>
                                <th>가입일</th>
                                <th>탈퇴여부</th>
                                <th>회원 관리</th>
                            </tr>
                        </thead>
                        <tbody id="memberTbody">
                        <%--<tr>
                                <td>1</td>
                                <td>업주</td>
                                <td>testzsdb</td>
                                <td>테스트</td>
                                <td>01011112222</td>
                                <td>2022.12.15</td>
                                <td>N</td>
                                <td><button class="memberManageBtn">관리</button></td>
                            </tr>
                            <tr>
                                <td>업주</td>
                                <td>testzsdb</td>
                                <td>테스트</td>
                                <td>01011112222</td>
                                <td>2022.12.15</td>
                                <td>N</td>
                                <td><button>관리</button></td>
                            </tr>
                            <tr>
                                <td>업주</td>
                                <td>testzsdb</td>
                                <td>테스트</td>
                                <td>01011112222</td>
                                <td>2022.12.15</td>
                                <td>N</td>
                                <td><button>관리</button></td>
                            </tr>
                            <tr>
                                <td>업주</td>
                                <td>testzsdb</td>
                                <td>테스트</td>
                                <td>01011112222</td>
                                <td>2022.12.15</td>
                                <td>N</td>
                                <td><button>관리</button></td>
                            </tr>
                            <tr>
                                <td>업주</td>
                                <td>testzsdb</td>
                                <td>테스트</td>
                                <td>01011112222</td>
                                <td>2022.12.15</td>
                                <td>N</td>
                                <td><button>관리</button></td>
                            </tr>
                            <tr>
                                <td>업주</td>
                                <td>testzsdb</td>
                                <td>테스트</td>
                                <td>01011112222</td>
                                <td>2022.12.15</td>
                                <td>N</td>
                                <td><button>관리</button></td>
                            </tr>
                            <tr>
                                <td>업주</td>
                                <td>testzsdb</td>
                                <td>테스트</td>
                                <td>01011112222</td>
                                <td>2022.12.15</td>
                                <td>N</td>
                                <td><button>관리</button></td>
                            </tr>
                            <tr>
                                <td>업주</td>
                                <td>testzsdb</td>
                                <td>테스트</td>
                                <td>01011112222</td>
                                <td>2022.12.15</td>
                                <td>N</td>
                                <td><button>관리</button></td>
                            </tr>
                            <tr>
                                <td>업주</td>
                                <td>testzsdb</td>
                                <td>테스트</td>
                                <td>01011112222</td>
                                <td>2022.12.15</td>
                                <td>N</td>
                                <td><button>관리</button></td>
                            </tr>
                            <tr>
                                <td>업주</td>
                                <td>testzsdb</td>
                                <td>테스트</td>
                                <td>01011112222</td>
                                <td>2022.12.15</td>
                                <td>N</td>
                                <td><button>관리</button></td>
                            </tr>
                        </tbody> --%>
                    </table>
                   
                        <div id="searchArea">
                            <select name="key" id="search-key">
                                <option value="t">아이디</option>
                                <option value="tnumber">전화번호</option>
                            </select>
                            <input type="text" name="query"  id="search-query" placeholder="검색어를 입력해주세요.">
                            <button id="searchBtn" onclick="return searchBtnClick()">검색</button>
                        </div>
                  
                    <div class="pagination-area">
                        <ul class="pagination">
                            <%-- 첫 페이지로 이동 --%>
                            <%-- <li><a href="javascript:void(0)" id="firstP">&lt;&lt;</a></li> --%>
                            <%-- 이전 목록 마지막 번호로 이동 --%>
                          <%--   <li><a href="javascript:void(0)" id="preP">&lt;</a></li> --%>
        
                        <%--    <c:forEach var="i" begin="${pagination.startPage}" 
                                end="${pagination.endPage}" step="1">
        
                                <c:choose>
                                    <c:when test="${i == pagination.currentPage}"> 
                                        <li><a class="current">${i}</a></li>
                                    </c:when> --%>
        
                                    <%-- <c:otherwise> --%>
                                        <%-- 현재 페이지를 제외한 나머지 --%>
                                      <%--   <li><a href="javascript:void(0)">${i}</a></li> --%>
                                 <%--    </c:otherwise>
                                </c:choose> 
        
                            </c:forEach> --%>
                            <!-- 특정 페이지로 이동 -->
                            
                            <!-- 다음 목록 시작 번호로 이동 -->
                           <%--  <li><a href="javascript:void(0);" id="nextP">&gt;</a></li> --%>
        
                            <!-- 끝 페이지로 이동 -->
              <%--               <li><a href="javascript:void(0);">&gt;&gt;</a></li> --%>
                        </ul>
                    </div>        
                </div>
            </div>
            <div id="memberManage" class="admin-mainMenu">  
                <div id="memberManageAll">
                    <h1>회원 관리</h1>
                    <div id="memberInfoChange">
                        <div id="memberInfo">
                            <div class="memberInfoList">
                                <aside>번호</aside>
                                <span id="memberNo">"${tempNo.value}"</span>
                            </div>
                            <div class="memberInfoList">
                                <aside>아이디</aside>
                                <span id="memberId">Test</span>
                            </div>
                            <div class="memberInfoList">
                                <aside>전화번호</aside>
                                <span id="memberTel">01012345678</span>
                            </div>
                            <div class="memberInfoList">
                                <aside>주소</aside>
                                <span id="memberAddress">서울시 중구 남대문로</span>
                            </div>
                            <div class="memberInfoList">
                                <aside>가입일</aside>
                                <span id="enrollDate">2022.12.15</span>
                            </div>
                            <div class="memberInfoList">
                                <aside>회원 종류</aside>
                                <span id="authority">이용자</span>
                            </div>
                        </div>
                        <div id="licenseArea">
                            <img src="" id="licenseView">
                            <span id="licenseText">사업자 등록증</span>
                        </div>
                    </div>
                <div id="updateInfo" >  
                    <div id="memberBtn">
                        <button id="m-Btn">권한 변경</button>
                        <button id="m-BtnD">탈퇴</button>
                        <button id="m-BtnR"><a href="/admin/manageMember">돌아가기</a></button>
                    </div>
                </div> 
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
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
    <script src="/resources/js/admin/member.js"></script>
    <script src="/resources/js/sideBar.js"></script>
    </body>
</html>