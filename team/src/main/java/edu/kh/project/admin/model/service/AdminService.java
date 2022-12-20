package edu.kh.project.admin.model.service;

import java.util.Map;

public interface AdminService {
	
	

	/** 게시판 목록 조회 + 페이지 처리 계산
	 * @param boardCode
	 * @param cp
	 * @return map
	 */
	Map<String, Object> selectBoardList(int boardCode, int cp);

}
