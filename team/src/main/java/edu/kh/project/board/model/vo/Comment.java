package edu.kh.project.board.model.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Comment {

	private int commentNo;
	private String commentContent;
	private String commentCreateDate;
	private String commentDeleteFlag;
	private int boardNo;
	private int memberNo;
	private int parentNo;
	private String memberId;
	
}
