<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

    <section>

    <div id="sideAll">                  
        <label for="sideIntro" class="sideM" id="side1"><a href="/introduction">소개</a></label>
        <input type="checkbox" id="sideIntro">
            <div id="sideMenu1">
                <ul class="dropdown-sideMenu1">
                    <%-- <li><a href="">소개글</a></li> --%>
                    <%-- <li><a href="">프로젝트 및 팀원 소개</a></li>
                    <li><a href="">프로젝트 목적</a></li>
                    <li><a href="">꿈나무 카드</a></li> --%>
                </ul>
            </div>

        <label for="sideNotice" class="sideM" id="side2">공지사항</label>
        <input type="checkbox" id="sideNotice">
            <div id="sideMenu2">
                <ul class="dropdown-sideMenu2">
                    <li><a href="/noticeBoardListt/1">공지사항</a></li>
                    <li><a href="/updateBoard2/2">업데이트</a></li>
                </ul>
            </div>        
        <label for="side" class="sideM" id="side3">커뮤니티</label>
        <input type="checkbox" id="side">
            <div id="sideMenu3">
                <ul class="dropdown-sideMenu3">
                    <li><a href="/boardList/4">문의게시판</a></li>
                    <li><a href="/freeBoardList/3">자유게시판</a></li>
                </ul>     
            </div>
        <label for="" class="sideM" id="side4"><a href="">식당 등록문의</a></label>
        <label for="" class="sideM" id="side5"><a href="">마이페이지</a></label>
        <c:if test="${loginMember.authority == 2}">
            <label for="sideManage" class="sideM" id="side6">관리자 메뉴</label>  
            <input type="checkbox" id="sideManage">
                <div id="sideMenu4">
                    <ul class="dropdown-sideMenu4">
                        <li><a href="/admin/manageStore">식당 관리</a></li>
                        <li><a href="/admin/manageMember">회원 관리</a></li>
                        <li><a href="/admin/manageBoard">게시글 관리</a></li>
                    </ul>
                </div>
        </c:if>
    </div>

</section>