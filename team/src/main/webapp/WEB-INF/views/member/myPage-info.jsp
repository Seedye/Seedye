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

    <link rel="stylesheet" href="../resources/css/member/myPage.css">
    <link rel="stylesheet" href="../resources/css/header.css">

</head>
<body>
    <main>
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

                <h1 class="myPage-title">내 정보</h1>
                <span class="myPage-subject">원하는 회원 정보를 수정할 수 있습니다.</span>
                
                <form action="/info" method="POST" name="myPage-frm" id="myPage-frm">

                    <div class="myPage-row">
                        <label>아이디</label>
                        <input type="text" name="memberId" value="${loginMember.memberId}" maxlength="20" readonly>
                    </div>

                    <button type="button" class="myPage-submit" id="btn1">비밀번호 변경</button>

                    <div id="pw" class="pw">

                        <div class="myPage-row">
                            <label>현재 비밀번호</label>
                            <input type="password" id="currentPw" name="currentPw" maxlength="16" placeholder="비밀번호 입력">
                        </div>

                        <div class="myPage-row">
                            <label>새 비밀번호</label>
                            <input type="password" id="newPw" name="newPw" maxlength="16" placeholder="새 비밀번호 입력">
                        </div>
                        <span class="myPage-message" id="pwMessage">영문, 숫자, 특수문자를 각 하나 이상 포함해 8~16 글자 사이로 입력해주세요.</span>

                        <div class="myPage-row">
                            <label>새 비밀번호 확인</label>
                            <input type="password" id="newPwConfirm" name="newPwConfirm" maxlength="16" placeholder="새 비밀번호 확인">
                        </div>
                        <span class="myPage-message" id="newPwMessage">영문, 숫자, 특수문자를 각 하나 이상 포함해 8~16 글자 사이로 입력해주세요.</span>

                    <%-- <button class="myPage-submit">변경하기</button> --%>
                    </div>

                    <div class="myPage-row tel mainTel">
                        <label>전화번호</label>
                        <input type="text" name="memberTel" id="memberTel" value="${loginMember.memberTel}" maxlength="13" readonly>
                        <button type="button" class="aaa" id="authKey">전화번호 변경</button>
                    </div>
                    <div class="confirmBox">
                        <div class="myPage-row tel confirmCheck">
                            <label>인증번호</label>
                            <input type="text" name="confirmTel" maxlength="4">

                            <div id="timer"></div>

                            <button type="button">인증확인</button>
                        </div>
                        <span class="myPage-message" id="confirm"></span>
                    </div>

                    <div class="myPage-row info-title">
                        <span>주소</span>
                    </div>

                    <%-- split(문자열, 구분자) : 문자열을 구분자로 쪼개서 배열로 반환 --%>
                    <c:set var="addr" value="${fn:split(loginMember.memberAddress, ',,')}" />

                    <div class="myPage-row info-address">
                        <input type="text" name="memberAddress" id="sample6_postcode" value="${addr[0]}" placeholder="우편번호">
                        <button type="button" onclick="sample6_execDaumPostcode()">검색</button>
                    </div>

                    <div class="myPage-row info-address">
                        <input type="text" name="memberAddress" id="sample6_address"
                        value="${addr[1]}" placeholder="도로명/지번 주소">
                    </div>

                    <div class="myPage-row info-address">
                        <input type="text" name="memberAddress" id="sample6_detailAddress" 
                        value="${addr[2]}" placeholder="상세주소">
                    </div>

                    <button class="myPage-submit">수정하기</button>

                </form>

            </section>
        </session>

    </main>
    <jsp:include page="/WEB-INF/views/common/footer.jsp" />
    <!-- footer.jsp include -->

    <%-- 제이쿼리 사용시 필요한 스크립트 --%>
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" 
    integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" 
    crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js"></script>

    <!-- 다음 주소 api 추가 -->
    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
    <script>
        function sample6_execDaumPostcode() {
            new daum.Postcode({
                oncomplete: function(data) {
                    // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
    
                    // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                    // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                    var addr = ''; // 주소 변수
    
                    //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                    if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                        addr = data.roadAddress;
                    } else { // 사용자가 지번 주소를 선택했을 경우(J)
                        addr = data.jibunAddress;
                    }
    
                    // 우편번호와 주소 정보를 해당 필드에 넣는다.
                    document.getElementById('sample6_postcode').value = data.zonecode;
                    document.getElementById("sample6_address").value = addr;
                    // 커서를 상세주소 필드로 이동한다.
                    document.getElementById("sample6_detailAddress").focus();
                }
            }).open();
        }
    </script>

    <script>
        const loginMemberTel = "${loginMember.memberTel}";
    </script>
    
        <!-- myPage.js external 방식으로 추가 -->
        <script src="../../resources/js/member/myPage.js"></script>
</body>
</html>