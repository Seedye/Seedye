<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>관리자 페이지</title>
    <link rel="stylesheet" href="/resources/css/admin/admin-copy1.css">
    <link rel="stylesheet" href="/resources/css/header.css">
    <link rel="stylesheet" href="/resources/css/sideBar.css">
</head>
<body>
    <main>
        <jsp:include page="/WEB-INF/views/common/header.jsp" /> 

        <div id="adminMain">
            <jsp:include page="/WEB-INF/views/common/sideBar.jsp" />

            <!-- 식당 등록 -->
            <div id="adminR" class="admin-mainMenu">
                <form action="#">
                    <div id="imageArea">
                        <div class="imageDiv">
                            <label for="image0">
                                <img src="" class="preview">
                            </label>
                            <input type="file" id="image0" accept="image/*" class="imageInput">
                            <aside>사업자 등록증</aside>
                            <span class="red">*필수</span>
                        </div>
                        <div class="imageDiv">
                            <label for="image1">
                                <img src="" class="preview">
                            </label>
                            <input type="file" id="image1" accept="image/*" class="imageInput">
                            <aside>가게 이미지</aside>
                        </div>
                        <div class="imageDiv">
                            <label for="image2">
                                <img src="" class="preview">
                            </label>
                            <aside>메뉴판 이미지</aside>
                            <input type="file" id="image2" accept="image/*" class="imageInput">
                        </div>
                    </div>
                    <div class="adminR-menu">
                        <aside><span class="red">＊</span>업소 상호명</aside>
                        <input type="text">
                    </div>
                    <div class="adminR-menu">
                        <aside><span class="red">＊</span>업종</aside>
                        <select name="food" id="select">
                            <option value="">한식</option>
                            <option value="">중식</option>
                            <option value="">일식</option>
                            <option value="">양식</option>
                            <option value="">패스트푸드</option>
                            <option value="">일반대중음식</option>
                            <option value="">편의점</option>
                            <option value="">제과점</option>
                            <option value="">정육점</option>
                            <option value="">착한식당</option>
                        </select>
                    </div>
                    <div class="adminR-menu">
                        <aside><span class="red">＊</span>주소</aside>
                        <div id="addr-area">
                            <button type="button" onclick="sample4_execDaumPostcode()">주소 검색</button>
                            <input type="text" id="sample4_roadAddress" placeholder="도로명주소">
                            <input type="text" id="sample4_jibunAddress" placeholder="지번주소">
                            <span id="guide" style="color:#999;display:none"></span>
                        </div>
                    </div>
                    <div class="adminR-menu">
                        <aside><span class="red">＊</span>전화번호</aside>
                        <input type="text" class="phoneNumber" placeholder="전화번호" onkeyup="">
                    </div>
                    <div class="adminR-menu">
                        <aside>메뉴, 가격</aside>
                        <textarea placeholder="주요 메뉴, 가격" style="width: 50%; height: 40%;" resize="none"></textarea>
                    </div>
                    <div style="margin-Left:40px"><span style="color:#aaa">* 필수 입력 항목입니다.</span></div>
                    <div id="btn">
                        <button>등록</button>
                    </div>
                </form>
            </div>
            <div id="storeManage" class="admin-mainMenu">
                <div id="storeArea">
                    <select>
                        <option>업종</option>
                        <option value="">한식</option>
                        <option value="">중식</option>
                        <option value="">일식</option>
                        <option value="">양식</option>
                        <option value="">패스트푸드</option>
                        <option value="">일반대중음식</option>
                        <option value="">편의점</option>
                        <option value="">제과점</option>
                        <option value="">정육점</option>
                        <option value="">착한식당</option>
                    </select>
                    <h1 id="storeH1">식당 관리</h1>
                    <table id="storeTable">
                        <thead>
                            <tr id="storeTH">
                                <th>번호</th>
                                <th>이름</th>
                                <th>업종</th>
                                <th>주소</th>
                                <th>전화번호</th>
                                <th>처리여부</th>
                                <th>관리하기</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="storeList">
                                <td>1</td>
                                <td>가나다</td>
                                <td>한식</td>
                                <td>서울특별시 종로구 남대문로</td>
                                <td>0205050505</td>
                                <td>등록완료</td>
                                <td><button class="store-manage">관리</button></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>가나다</td>
                                <td>한식</td>
                                <td>서울특별시 종로구 남대문로</td>
                                <td>0205050505</td>
                                <td>등록완료</td>
                                <td><button class="store-manage">관리</button></td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>가나다</td>
                                <td>한식</td>
                                <td>서울특별시 종로구 남대문로</td>
                                <td>0205050505</td>
                                <td>등록완료</td>
                                <td><button class="store-manage">관리</button></td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>가나다</td>
                                <td>한식</td>
                                <td>서울특별시 종로구 남대문로</td>
                                <td>0205050505</td>
                                <td>등록완료</td>
                                <td><button class="store-manage">관리</button></td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>가나다</td>
                                <td>한식</td>
                                <td>서울특별시 종로구 남대문로</td>
                                <td>0205050505</td>
                                <td>등록완료</td>
                                <td><button class="store-manage">관리</button></td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>가나다</td>
                                <td>한식</td>
                                <td>서울특별시 종로구 남대문로</td>
                                <td>0205050505</td>
                                <td>등록완료</td>
                                <td><button class="store-manage">관리</button></td>
                            </tr>
                            <tr>
                                <td>7</td>
                                <td>가나다</td>
                                <td>한식</td>
                                <td>서울특별시 종로구 남대문로</td>
                                <td>0205050505</td>
                                <td>등록완료</td>
                                <td><button class="store-manage">관리</button></td>
                            </tr>
                            <tr>
                                <td>8</td>
                                <td>가나다</td>
                                <td>한식</td>
                                <td>서울특별시 종로구 남대문로</td>
                                <td>0205050505</td>
                                <td>등록완료</td>
                                <td><button class="store-manage">관리</button></td>
                            </tr>
                            <tr>
                                <td>9</td>
                                <td>가나다</td>
                                <td>한식</td>
                                <td>서울특별시 종로구 남대문로</td>
                                <td>0205050505</td>
                                <td>등록완료</td>
                                <td><button class="store-manage">관리</button></td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>가나다</td>
                                <td>한식</td>
                                <td>서울특별시 종로구 남대문로</td>
                                <td>0205050505</td>
                                <td>등록완료</td>
                                <td><button class="store-manage">관리</button></td> 
                            </tr>
                        </tbody>
                    </table>
                    <form action="">
                        <div id="searchStore">
                            <select name="" id="">
                                <option value="">이름</option>
                                <option value="">주소</option>
                                <option value="">전화번호</option>
                            </select>
                            <input type="text">
                            <button>검색</button>
                        </div>
                    </form>
                    <div id="btnArea">
                        <button>신청 조회</button>
                    </div>
                    <div id="pagination-area">
                        <ul class="pagination">
                            <li><a href="">&lt;&lt;</a></li>
                            <li><a href="">1</a></li>
                            <li><a href="">2</a></li>
                            <li><a href="">3</a></li>
                            <li><a href="">4</a></li>
                            <li><a href="">5</a></li>
                            <li><a href="">6</a></li>
                            <li><a href="">7</a></li>
                            <li><a href="">8</a></li>
                            <li><a href="">9</a></li>
                            <li><a href="">10</a></li>
                            <li><a href="">&gt;&gt;</a></li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>    
    </main>
    <jsp:include page="/WEB-INF/views/common/footer.jsp" />
    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
    <script src="/resources/js/admin/admin.js"></script>
    <script src="/resources/js/sideBar.js"></script>
   
</body>
</html>