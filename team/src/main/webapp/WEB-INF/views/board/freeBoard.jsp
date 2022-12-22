<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../resources/css/header.css">
    <link rel="stylesheet" href="../../resources/css/sideBar.css">
    <link rel="stylesheet" href="../../resources/css/board/freeBoard.css">
    <title>후원 및 단체소개</title>
    <script src="https://kit.fontawesome.com/8cc6d5f0de.js" crossorigin="anonymous"></script>
</head>
<body>
    <jsp:include page="/WEB-INF/views/common/header.jsp"/>

    <main>
        <section>
            <div id="freeBoard-container">
                <div id="title-content">
                    <p>자유 게시판</p>

                    <div id="title-search">
                        <input type="text">
                        <button><i class="fa-solid fa-magnifying-glass fa-1.8x"></i></button>
                    </div>
                    
                    <div id="title-write">
                        <button>글작성</button>
                    </div>
                    
                </div>
                <div id="freeBoard-content">
                    <div id="freeBoard-list">
                        <ul id="ul-container">
                            <li>
                                <div>
                                    <div class="freeBoard-title">
                                        <i class="fa-solid fa-seedling"></i>
                                        <p>새싹이가 정보를 정확하게 알려주지 않아요</p>
                                    </div>
                                    <div class="freeBoard-information">작성자 | 작성일</div>
                                </div>
                                <div class="asd">
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <div class="freeBoard-title">
                                        <i class="fa-solid fa-seedling"></i>
                                        <p>새싹이가 정보를 정확하게 알려주지 않아요</p>
                                    </div>
                                    <div class="freeBoard-information">작성자 | 작성일</div>
                                </div>
                                <div class="asd">
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            </li><li>
                                <div>
                                    <div class="freeBoard-title">
                                        <i class="fa-solid fa-seedling"></i>
                                        <p>새싹이가 정보를 정확하게 알려주지 않아요</p>
                                    </div>
                                    <div class="freeBoard-information">작성자 | 작성일</div>
                                </div>
                                <div class="asd">
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            </li><li>
                                <div>
                                    <div class="freeBoard-title">
                                        <i class="fa-solid fa-seedling"></i>
                                        <p>새싹이가 정보를 정확하게 알려주지 않아요</p>
                                    </div>
                                    <div class="freeBoard-information">작성자 | 작성일</div>
                                </div>
                                <div class="asd">
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            </li><li>
                                <div>
                                    <div class="freeBoard-title">
                                        <i class="fa-solid fa-seedling"></i>
                                        <p>새싹이가 정보를 정확하게 알려주지 않아요</p>
                                    </div>
                                    <div class="freeBoard-information">작성자 | 작성일</div>
                                </div>
                                <div class="asd">
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            </li><li>
                                <div>
                                    <div class="freeBoard-title">
                                        <i class="fa-solid fa-seedling"></i>
                                        <p>새싹이가 정보를 정확하게 알려주지 않아요</p>
                                    </div>
                                    <div class="freeBoard-information">작성자 | 작성일</div>
                                </div>
                                <div class="asd">
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            </li><li>
                                <div>
                                    <div class="freeBoard-title">
                                        <i class="fa-solid fa-seedling"></i>
                                        <p>새싹이가 정보를 정확하게 알려주지 않아요</p>
                                    </div>
                                    <div class="freeBoard-information">작성자 | 작성일</div>
                                </div>
                                <div class="asd">
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            </li>
                            
                        </ul>
                    </div>
                    
                    <div id="freeBoard-detail">
                        
                    </div>
                </div>
            </div>
        </section>
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>    
    </main>
    
    <script src="../../resources/js/sideBar.js"></script>
    <script src="../../resources/js/header.js"></script>
    <script src="../../resources/js/freeBoard.js"></script>

</body>
</html>