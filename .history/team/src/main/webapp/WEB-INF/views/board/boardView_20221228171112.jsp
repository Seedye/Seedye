<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

  <div class="board-view-modal" id="boardViewModal">
    <div class="board-view-area">
      <!-- /* 상세보기 */ -->
      <div class="board-view-title">
        <p class="board-view-x-hidden">&times;</p>
        <p>상세 조회</p>
        <p class="board-view-x" id="boardViewX">&times;</p>
      </div>

      <!-- /* 상세보기 내용 */ -->
      <div class="board-view-content-all">
        <div class="board-view-title-detail-answer" id="boardViewTitleDetailAnswer">
            <%-- <p>가게정보에 대해 문의드립니다.</p> --%>
        </div>

        <div class="board-view-title-detail-answer">
          <div class="board-view-content-detail-answer">
            <div class="board-view-content-content" id="boardViewContentContent">
              <p>문의 내용</p>
              <%-- <p>yjy_1005 / 2022.12.14</p> --%>
            </div>
            <div class="board-view-content-text" id="boardViewContentText">
              <%-- <p>
                사이트에 적혀져 있는 음식정보랑 가게에 직접갔을때 정보가 다른거 같습니다. 
                가격도 약간 차이가 있고 음식 종류도 약간 달라요. 빠른 업데이트 부탁드립니다. 
                매번 쉽게 사이트로 음식점을 찾을수 있어 좋지만, 
                이런 부분은 빠른 업데이트가 있으면 좋을것 같습니다. 항상 응원하겠습니다!
              </p> --%>
            </div>
          </div>
          <div class="board-view-content-img-area">
            <div class="board-view-content-img">
              <img src="../../resources/images/게시판테스트img1.jpg" alt="">
            </div>
            <div class="board-view-content-img">
              <img src="../../resources/images/게시판테스트img2.jpg" alt="">
            </div>
            <div class="board-view-content-img">
              <img src="../../resources/images/게시판테스트img3.jpg" alt="">
            </div>
            <div class="board-view-content-img">
              <img src="../../resources/images/게시판테스트img3.jpg" alt="">
            </div>
            
          </div>
        </div>

        <div class="board-view-title-detail-answer">
          <div class="board-view-content-detail-answer">
            <div class="board-view-content-content">
              <p>답변</p>
              <p>2022.12.15</p>
            </div>
              <div class="board-view-content-text" id="boardViewContentText">
                <p>yjy_1005님 사이트 이용에 불편을 드려 죄송합니다. 빠른 조치를 취하도록 하겠습니다.
                  항상 노력하는 새싹이 되겠습니다. 앞으로도 많은 이용 부탁드리겠습니다!
                  "${loginMember.memberId}"
                </p>
                </div>
            
          </div>
        </div>
          
      </div>
      <c:if test='"${loginMember.memberId}" == "${map.boardList[0].memberId}"''>
      
      <div class="board-view-content-delete-update">
        <div class="board-view-btn">
          삭제
        </div>
        <div class="board-view-btn">
          수정
        </div>
      </div>
      </c:if>
    </div>
  </div>
