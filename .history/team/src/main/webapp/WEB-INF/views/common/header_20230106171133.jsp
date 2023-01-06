<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<header>
        <!-- 헤더 -->
        <div id="header-container">
            <!-- 로고 -->
            <section id="header-section">
                <div id="login2"></div>
                <div id="logo-container">
                    <a href="/"><img id="logo" src="../../resources/images/새싹이.png"></a>
                    <a href="/" id="logo-content">새싹이</a>
                </div>
                
                <c:if test="${empty loginMember}">
                <div id="login">
                    <a href="/login">로그인</a>
                    <a href="/signUp">회원가입</a>
                </div>
                </c:if>

                <c:if test="${!empty loginMember}">
                    <div id="login">
                        <a href="/info">${loginMember.memberId}</a>
                        <a href="/logout">로그아웃</a>
                    </div>
                </c:if>
            </section>
            <!-- 메뉴창 -->
            <nav id="nav-bar">
            <P>${boardTypeList.BOARD_CODE}잠시확인만</P>
                <ul id="ul-container">
                    <li><a href="/introduction">소개</a></li>
                    <li><a href="/boardList/1">공지사항</a></li>
                    <li><a href="/boardList/${boardTypeList.BOARD_CODE}">커뮤니티</a></li>
                    <li><a href="javascript:void(0);" id="inquiry">식당 등록 문의</a></li>
                    <li><a href="/support">후원</a></li>
                    <c:if test="${loginMember.authority == 2}">
                    <li><a href="/admin/manageStore">관리자</a></li>
                    </c:if>

                </ul>
            </nav>
        </div>

    </header>