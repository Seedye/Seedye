<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

  <div class="board-write-modal" id="boardWriteModal">
  <form action="/QAWrite/4" method="POST" enctype="multipart/form-data" id="postForm" name="postForm">
    <div class="board-view-area">
      <!-- /* 상세보기 */ -->
      <div class="board-view-title">
        <p class="board-view-x-hidden">&times;</p>
        <p>작성</p>
        <p class="board-view-x" id="boardWriteX">&times;</p>
      </div>

      <!-- /* 상세보기 내용 */ -->
      <div class="board-view-content-all">
        <div class="board-view-title-detail-answer">
          <!-- <p>[ </p> -->
          <input name="boardTitle" type="text" placeholder="작성할 제목을 입력해주세요.(20자내외)">
          <!-- <p> ]</p> -->
      </div>

      <div class="board-view-title-detail-answer">
        <div class="board-view-content-detail-answer">
          <div class="board-view-content-content">
            <p>문의 내용</p>
            <p>yjy_1005 / 2022.12.14</p>
          </div>
          <div class="board-view-content-text">
            <textarea name="boardContent"></textarea>

          </div>
        </div>
      </div>

      <div class="board-view-title-detail-answer">
        <div class="board-view-content-detail-answer">
          <div class="board-view-content-content">
            <p>첨부 사진 (최대 4개)</p>
            <!-- <p>2022.12.15</p> -->
          </div>

              <div class="board-view-content-img-area" id="boardViewContentImgArea">
              <!-- <div></div> -->
              <!-- 파일선택 div -->
                <div class="board-view-content-img-select" id="boardViewContentImgSelect">
                  <label for="inputFile">
                    <i class="fa-solid fa-plus fa-3x"></i>
                    <p>업로드할 사진을 선택해 주세요</p>
                  </label>
                  <input type="file" name="inputFile" id="inputFile" multiple="multiple" hidden>
                </div>
                <!-- 이미지미리보기 -->
                <!-- <div class="board-view-content-img">
                  <div class="board-Write-img-delete">&times;</div>

                  <img src="../../resources/images/게시판테스트img1.jpg" alt="">
                </div>
                <div class="board-view-content-img">
                  <div class="board-Write-img-delete">&times;</div>
                  <img src="../../resources/images/게시판테스트img2.jpg" alt="">
                </div>
                <div class="board-view-content-img">
                  <div class="board-Write-img-delete">&times;</div>
                  <img src="../../resources/images/게시판테스트img3.jpg" alt="">
                </div>
                <div class="board-view-content-img">
                  <div class="board-Write-img-delete">&times;</div>
                  <img src="../../resources/images/게시판테스트img3.jpg" alt="">
                </div> 
              -->
                <!-- 사진 추가 버튼 -->
                <div class="board-view-content-img add-file-area-hidden" id="inputAddFile">
                  <label for="inputFile">
                    <div class="board-Write-img-delete">
                      <i class="fa-solid fa-plus fa-1x"></i>
                    </div>
                  </label>
                  <input type="file" name="inputFile" id="inputFile" multiple="multiple" hidden>                
                </div> 
              </div>

          
        </div>
      </div>
          
      </div>
      <div class="board-view-content-delete-update">
        <button class="board-view-btn" id="boardWriteInput">
          등록
        </button>

      </div>
    </div>
  </form>
    
  </div>
