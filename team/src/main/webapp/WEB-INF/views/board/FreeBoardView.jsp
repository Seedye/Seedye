<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>모달</title>

    <link rel="stylesheet" href="/resources/css/admin/freeBoardModal.css">
</head>
<body>
    <div id="modalAll">
        <div id="modalTitle">
            <div id="titleArea">
                <span>상세보기</span>
                <p id="modalClose">x</p>
            </div>
        </div>
        <div id="modalContent">
            <div id="contentInfo">
                <div class="info">
                    <aside>제목</aside>
                    <span id="boardModalTitle"></span>
                </div>
                <div class="info">
                    <aside>작성자</aside>
                    <span id="boardModalWriter"></span>
                </div>
                <div class="info">
                    <aside>작성일</aside>
                    <span id="boardModalDate"></span>
                </div>
            </div>
            <div id="content">
                <span>내용</span>
                <div id="boardModalContent">                

                </div>
            </div>
        </div>
        <div id="commentArea">
            <span>댓글</span>
            <div id="boardModalComment">
            </div>
        </div>
        <div id="modalBtnArea">
            <button id="deleteB">삭제</button>
            <button id="listB">목록으로</button>
        </div>
    </div>
</body>
</html>