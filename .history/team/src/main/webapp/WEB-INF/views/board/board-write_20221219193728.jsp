<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../../resources/css/header.css">
  <link rel="stylesheet" href="../../resources/css/board/board-write-style.css">
  <title>게시물 작성 모달</title>

  <script src="https://kit.fontawesome.com/95f413b465.js" crossorigin="anonymous"></script>

</head>
<body>
  <header>
    <!-- 헤더 -->
    <section id="header-container">
        <!-- 로고 -->
        <section id="header-section">
            <a href="#"><img id="logo" src="../../resources/images/새싹이.png"></a>
            <a href="#" id="logo-content">새싹이</a>
        </section>
        <!-- 메뉴창 -->
        <nav id="nav-bar">
            <ul>
                <li><a href="#"></a>소개</li>
                <li><a href="#"></a>공지사항</li>
                <li><a href="../board/board-list.html"></a>커뮤니티</li>
                <li><a href="#"></a>식당 등록 문의</li>
                <li><a href="#"></a>마이 페이지</li>
                <!-- <li><a href="#"></a>관리자</li> -->
                <!-- <li><a href="#"></a>후원</li> -->
            </ul>
        </nav>
    </section>
  </header>
  <div class="board-view-modal">
    <div class="board-view-area">
      <!-- /* 상세보기 */ -->
      <div class="board-view-title">
        <p class="board-view-x-hidden">&times;</p>
        <p>작성</p>
        <p class="board-view-x">&times;</p>
      </div>

      <!-- /* 상세보기 내용 */ -->
      <div class="board-view-content-all">
        <div class="board-view-title-detail-answer">
          <!-- <p>[ </p> -->
          <input type="text" placeholder="작성할 제목을 입력해주세요.(20자내외)">
          <!-- <p> ]</p> -->
      </div>

      <div class="board-view-title-detail-answer">
        <div class="board-view-content-detail-answer">
          <div class="board-view-content-content">
            <p>문의 내용</p>
            <p>yjy_1005 / 2022.12.14</p>
          </div>
          <div class="board-view-content-text">
            <textarea></textarea>

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
                  <input type="file" id="inputFile" multiple="multiple" hidden>
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
                  <input type="file" id="inputFile" multiple="multiple" hidden>                
                </div> 
              </div>

          
        </div>
      </div>
          
      </div>
      <div class="board-view-content-delete-update">
        <div class="board-view-btn">
          등록
        </div>
        <!-- <div class="board-view-btn">
          수정
        </div> -->
      </div>
    </div>
  </div>
<script src="../../resources/js/board.js"></script>
</body>

</html>
