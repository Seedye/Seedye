package edu.kh.project.main.model.service;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.project.admin.model.vo.Store;
import edu.kh.project.main.model.dao.MainDAO;
import edu.kh.project.main.model.vo.Bookmark;

@Service
public class MainServiceImpl implements MainService {

	@Autowired
	private MainDAO dao;

	// 메인페이지 통계표 비동기 ajax 목록 불러오기
	@Override
	public List<Store> resultList() {
		return dao.resultList();
	}

	// 검색어 + 카테고리 검색 결과 출력하기
	@Override
	public List<Store> storeList(Map<String, Object> saerchResult) {
		return dao.storeList(saerchResult);
	}
	
	// 모달 팝업창 해당 가맹점 조회
	@Override
	public List<Store> modalResult(int storeNo) {
		return dao.modalResult(storeNo);
	}

	// 신규 추가된 가맹점 조회(위에서 10개)
	@Override
	public List<Store> newInsertList() {
		return dao.newInsertList();
	}

	// 로그인한 회원의 즐겨찾기 조회
	@Override
	public List<Bookmark> selectBookmarkList(int memberNo) {
		return dao.selectBookmarkList(memberNo);
	}

	// 즐겨찾기 삭제
	@Override
	@Transactional
	public int modalDelete(Map<String, Integer> deleteMap) {
		return dao.modalDelete(deleteMap);
	}

	// 즐겨찾기 등록
	@Override
	@Transactional
	public int modalInsert(Map<String, Integer> insertMap) {
		return dao.modalInsert(insertMap);
	}
	
}
