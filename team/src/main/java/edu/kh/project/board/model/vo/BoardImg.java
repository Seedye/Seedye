package edu.kh.project.board.model.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BoardImg {
	
	private int imgNo; // 이미지 번호
	private String imgPath; // 이미지 저장 폴더 경로
	private String imgRename; // 변경된 이미지 파일 이름
	private String imgOriginal; // 원본 이미지 파일 이름
	private int imgOrder; // 이미지 파일 순서 번호
	private int boardNo; // 게시글 번호
}
