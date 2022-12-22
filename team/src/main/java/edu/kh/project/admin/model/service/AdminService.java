package edu.kh.project.admin.model.service;

import java.util.List;
import java.util.Map;

import edu.kh.project.admin.model.vo.Store;
import edu.kh.project.board.model.vo.Board;

public interface AdminService {

	
	/** 특정 게시판 목록 조회 + 페이징 처리
	 * @param boardCode
	 * @param cp
	 * @return map
	 */
	Map<String, Object> selectBoardList(int boardCode, int cp);
	
	

	/** 검색 조건이 일치하는 게시글 수 조회
	 * @param pm
	 * @param cp
	 * @return
	 */
	Map<String, Object> selectBoardList(Map<String, Object> pm, int cp);



	/** 식당 목록 조회
	 * @return storeList
	 */
	List<Store> selectStoreList();
	Board selectBoardDetail(int boardNo);
	
	

	
	

}
