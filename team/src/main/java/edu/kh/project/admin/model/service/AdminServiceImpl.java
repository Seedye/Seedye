package edu.kh.project.admin.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import edu.kh.project.admin.model.dao.AdminDAO;
import edu.kh.project.board.model.vo.Board;
import edu.kh.project.common.Pagination;


@Service
public class AdminServiceImpl implements AdminService{

	private AdminDAO dao;

	
	
	/** 게시판 목록 조회 및 페이징 처리
	 *
	 */
	@Override
	public Map<String, Object> selectBoardList(int boardCode, int cp) {
		
		int listCount = dao.getListCount(boardCode);
		
		Pagination pagination = new Pagination(listCount, cp);
		
		List<Board>boardList = dao.selectBoardList(pagination, boardCode);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("pagination", pagination);
		map.put("boardList", boardList);
		
		
		
		return map ;
	}
}
