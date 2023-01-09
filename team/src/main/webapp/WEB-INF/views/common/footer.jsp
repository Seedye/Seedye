<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

    <footer>
        <p>
            Copyright &copy; KH Information Educational Institute A-Class Seedye Team
        </p>
        <article>
            <a href="/introduction">소개</a>
            <span>|</span>
            <a href="/noticeBoardListt/1">공지사항</a>
            <span>|</span>
            <a href="/boardList/4">커뮤니티</a>
            <span>|</span>
            <a href="javascript:void(0);" id="inquiry">식당등록문의</a>
        </article>
    </footer>

<%-- session scope에 message 속성이 존재하는 경우
alert창을 이용해서 내용을 출력 --%>

<c:if test="${not empty message}">
    <script>
        alert("${message}");
    </script>

    <%-- message 1회 출력 후 모든 scope 삭제 --%>
    <c:remove var="message" />
</c:if>