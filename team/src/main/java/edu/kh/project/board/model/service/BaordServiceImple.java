package edu.kh.project.board.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.project.board.model.dao.BoardDAO;
import edu.kh.project.board.model.vo.Board;
import edu.kh.project.board.model.vo.Pagination;

@Service
public class BaordServiceImple implements BoardService{

	@Autowired
	private BoardDAO dao;

	// 게시물 리스트 조회
	@Override
	public Map<String, Object> selectBoardList(int boardCode, int cp) {
		
		// 특정 게시판 전체 게시글 수 조회
		int listCount = dao.getListCount(boardCode);
		
		// 페이징 처리 위해 
		Pagination pagination = new Pagination(listCount, cp);
		
		// 게시글 목록조회
		List<Board> boardList = dao.selectBoardList(pagination, boardCode);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("pagination", pagination);
		map.put("boardList", boardList);
		
		
		return map;
	}

	@Override
	public Map<String, Object> selectFreeBoardList(int boardCode, int cp) {
		
		// 특정 게시판 전체 게시글 수 조회
		int listCount = dao.getListCount(boardCode);
		
		// 페이징 처리 위해 
		Pagination pagination = new Pagination(listCount, cp);
		
		// 게시글 목록조회
		List<Board> freeBoardList = dao.selectFreeBoardList(pagination, boardCode);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("pagination", pagination);
		map.put("freeBoardList", freeBoardList);
		
		
		return map;
	}

	
	
}
