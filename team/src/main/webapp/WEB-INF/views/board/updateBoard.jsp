<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>업데이트</title>
    <link rel="stylesheet" href="/resources/css/header.css">
    <link rel="stylesheet" href="/resources/css/board/updateBoard.css">
</head>
<body>
    <header>
        <!-- 헤더 -->
        <div id="header-container">
            <!-- 로고 -->
            <section id="header-section">
                <div id="login2"></div>
                <div>
                    <a href="#"><img id="logo" src="../../resources/images/새싹이.png"></a>
                    <a href="#" id="logo-content">새싹이</a>
                </div>
                <div id="login">
                    <a href="">로그인</a>
                    <a href="">회원가입</a>
                </div>
            </section>
            <!-- 메뉴창 -->
            <nav id="nav-bar">
                <ul id="ul-container">
                    <li><a href="#"></a>새싹소개</li>
                    <li><a href="#"></a>공지사항</li>
                    <li><a href="#"></a>커뮤니티</li>
                    <li><a href="#"></a>식당 등록 문의</li>
                    <li><a href="#"></a>마이 페이지</li>
                    <!-- <li><a href="#"></a>관리자</li> -->
                    <!-- <li><a href="#"></a>후원</li> -->
                </ul>
            </nav>
        </div>
    </header>
    <main>
        <div id="updateAll">
            <div id="banner">
                <img src="/resources/images/update.png">
            </div>
            <div id="tableArea">
                <table id="updateTable">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>조회수</th>
                        <th>등록일</th>
                    </tr>
                </thead>
                <tbody id="updateTbody">
                    <tr>
                        <td>1</td>
                        <td>공지사항</td>
                        <td>관리자</td>
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
                    </tr>
                </tbody>
            </table>
            <div id="btn-area">
                <button id="writeBtn">글 작성</button>
            </div>
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


</body>
</html>