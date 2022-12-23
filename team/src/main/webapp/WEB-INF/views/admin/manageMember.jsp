<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

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
                                <th>회원 종류</th>
                                <th>아이디</th>
                                <th>전화번호</th>
                                <th>가입일</th>
                                <th>회원 탈퇴여부</th>
                                <th>회원 관리</th>
                            </tr>
                        </thead>
                        <tbody id="memberTbody">
                        <%--<tr>
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
                    <form action="">
                        <div id="searchArea">
                            <select name="" id="">
                                <option value="">아이디</option>
                                <option value="">이름</option>
                                <option value="">전화번호</option>
                            </select>
                            <input type="text">
                            <button>검색</button>
                        </div>
                    </form>
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
                </div>
            </div>
            <div id="memberManage" class="admin-mainMenu">
                <div id="memberManageAll">
                    <h1>회원 관리</h1>
                    <div id="memberInfoChange">
                        <div id="memberInfo">
                            <div class="memberInfoList">
                                <aside>번호</aside>
                                <span id="memberNO">1</span>
                            </div>
                            <div class="memberInfoList">
                                <aside>아이디</aside>
                                <span>Test</span>
                            </div>
                            <div class="memberInfoList">
                                <aside>전화번호</aside>
                                <span>01012345678</span>
                            </div>
                            <div class="memberInfoList">
                                <aside>주소</aside>
                                <span>서울시 중구 남대문로</span>
                            </div>
                            <div class="memberInfoList">
                                <aside>가입일</aside>
                                <span>2022.12.15</span>
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
                <form id="updateInfo" action="updateInfo" method = "GET">  
                    <div id="memberBtn">
                        <button id="m-Btn">권한 변경</button>
                        <button id="m-BtnR">돌아가기</button>
                    </div>
                </form> 
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