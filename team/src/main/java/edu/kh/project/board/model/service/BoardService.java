package edu.kh.project.board.model.service;

import java.util.Map;

public interface BoardService {

	
	/** 게시물 리스트 조회
	 * @param boardCode
	 * @param cp
	 * @return
	 */
	Map<String, Object> selectBoardList(int boardCode, int cp);

	

}
