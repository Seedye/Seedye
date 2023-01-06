<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%-- 문자열 관련 메서드를 제공하는 JSTL (EL형식) --%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>마이페이지</title>

    <link rel="stylesheet" href="../../resources/css/member/myPage.css">
    <link rel="stylesheet" href="../resources/css/header.css">

</head>
<body>
    <main>
        <!-- header.jsp include -->
        <jsp:include page="/WEB-INF/views/common/header.jsp" />

        <session class="myPage-content">

            <section class="left-side">
                <!-- 사이드메뉴 -->
                <ul class="list-group">
                    <li><a href="/info">내정보</a></li>
                    <li><a href="/delete">회원 탈퇴</a></li>
                </ul>
            </section>

            <section class="myPage-main">

                <h1 class="myPage-title">회원 탈퇴</h1>
                <span class="myPage-subject">현재 비밀번호가 일치하는 경우 탈퇴할 수 있습니다.</span>
                
                <form action="delete" method="POST" name="myPage-frm" id="memberDeleteForm">

                    <div class="myPage-row">
                        <label>비밀번호</label>
                        <input type="password" id="memberPw" name="memberPw" maxlength="16">
                    </div>

                    <div class="myPage-row info-title">
                        <label>회원 탈퇴 약관</label>
                    </div>

                    <pre class="secession-terms">

                        회원탈퇴 전 아래 내용을 확인 해 주세요.

                                        주의 사항

    • 회원탈퇴 시 현재 로그인 된 아이디는 사용하실 수 없습니다.

    • 회원탈퇴 시 탈퇴 된 아이디는 복구가 불가능합니다.

    • 회원탈퇴 시 등록된 모든 개인정보는 삭제, 폐기 처리되며 
        복구되지 않습니다.

    • 회원탈퇴 시 동일 아이디로 재가입하실 수 없습니다.

    • 회원탈퇴 시 이용했던 커뮤니티 게시판 및 댓글이 삭제됩니다.

    • 회원탈퇴 시 보류기간 없이 바로 탈퇴처리 됩니다.
                    </pre>

                    <div>
                        <input type="checkbox" name="agree" id="agree">
                        <label for="agree">위 약관에 동의합니다.</label>
                    </div>

                    <button class="myPage-submit">회원 탈퇴</button>

                </form>

            </section>
        </session>

    </main>
    <!-- footer.jsp include -->
    <jsp:include page="/WEB-INF/views/common/footer.jsp" />

    <!-- myPage.js external 방식으로 추가 -->
    <script src="../../resources/js/member/myPage.js"></script>
    
</body>
</html>