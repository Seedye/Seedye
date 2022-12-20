<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<header>
        <!-- 헤더 -->
        <div id="header-container">
            <!-- 로고 -->
            <section id="header-section">
                <div id="login2"></div>
                <div>
                    <a href="/"><img id="logo" src="../../resources/images/새싹이.png"></a>
                    <a href="/" id="logo-content">새싹이</a>
                </div>
                <div id="login">
                    <a href="/login">로그인</a>
                    <a href="/signUp">회원가입</a>
                </div>
            </section>
            <!-- 메뉴창 -->
            <nav id="nav-bar">
                <ul id="ul-container">
                    <li><a href="#">공지사항</a></li>
                    <li><a href="#">커뮤니티</a></li>
                    <li><a href="#">식당 등록 문의</a></li>
                    <li><a href="#">마이 페이지</a></li>
                    <li><a href="/support">후원</a></li>
                    <!-- <li><a href="#"></a>관리자</li> -->
                </ul>
            </nav>
        </div>
    </header>