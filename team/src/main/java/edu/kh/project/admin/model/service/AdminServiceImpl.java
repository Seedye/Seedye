package edu.kh.project.admin.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import edu.kh.project.admin.model.dao.AdminDAO;
import edu.kh.project.admin.model.vo.Store;
import edu.kh.project.board.model.vo.Board;
import edu.kh.project.common.Pagination;
import edu.kh.project.member.model.vo.Member;


@Service
public class AdminServiceImpl implements AdminService{

	@Autowired
	private AdminDAO dao;

	/**
	 * 특정 게시판 목록 조회 및 페이징 처리
	 */
	@Override
	public Map<String, Object> selectBoardList(int boardCode, int cp) {
	
		int listCount = dao.getListCount(boardCode);
		
		Pagination pagination = new Pagination(listCount, cp);
		
		List<Board> boardList = dao.seleceBoardList(pagination, boardCode);
		
		Map<String, Object>map = new HashMap<String, Object>();
		map.put("pagination", pagination);
		map.put("boardList", boardList);
		
		
		return map;
	}

	/**
	 * 검색 조건이 일치하는 게시글 수 조회
	 */
	@Override
	public Map<String, Object> selectBoardList(Map<String, Object> pm, int cp) {
		
		int listCount = dao.getListCount(pm);
		
		Pagination pagination = new Pagination(listCount, cp);
		
		List<Board> boardList = dao.selectBoardList(pagination, pm);
		
		Map<String, Object>map = new HashMap<String, Object>();
		map.put("pagination", pagination);
		map.put("boardList", boardList);
		
	
		return map;
	}

	@Override
	public Board selectBoardDetail(int boardNo) {
		
		return dao.selectBoardDetail(boardNo);
	}

	/**
	 *게시글 삭제
	 */
	@Override
	public int boardDelete(int boardNo) {
		
		return dao.boardDelete(boardNo);
	}

	
	// 식당 목록 조회
	@Override
	public List<Store> selectStoreList() {
		return dao.selectStoreList();
	}

	@Override
	public List<Member> selectMemberList() {
		return dao.selectMemberList();
	}

	/**
	 * 회원 등급 수정
	 */
	@Override
	public int updateInfo(int memberNo) {
		
		return dao.updateInfo(memberNo);
	}

	
	// 회원 관리 화면 
	@Override
	public Member selectMember(int memberNo) {
		return dao.selectMember(memberNo);
	}

	// 식당 selectBox 조회
	@Override
	public List<Store> selectStoreList(String storeType) {
		return dao.selectStoreList(storeType);
	}

	// 식당 신청 조회
	@Override
	public List<Store> selectEnroll(char checkFl) {
		return dao.selectEnroll(checkFl);
	}

	
	
	
}
