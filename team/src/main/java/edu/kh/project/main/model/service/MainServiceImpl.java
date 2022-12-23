package edu.kh.project.main.model.service;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.project.admin.model.vo.Store;
import edu.kh.project.main.model.dao.MainDAO;

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
	
}
