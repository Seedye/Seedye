package edu.kh.project.board.model.vo;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Board {
	private int boardNo;
	private String boardTitle; // 제목
	private String boardContent; // 내용
	private String createDate; // 생성날짜
	private String updateDate; // 수정 날짜
	private String boardDelFl; // 삭제 여부
	private int boardCode; // 게시판 코드
	private int memberNo; // 회원 번호
	private int readCount; // 조회수
	private String memberId; // 멤버 아이디
	private String commentContent;
	private String commentCreateDate;

	
	
	// 이미지 목록
	private List<BoardImg> imageList;
	
	// 댓글 목록
    private List<Comment> commentList;
	
}

