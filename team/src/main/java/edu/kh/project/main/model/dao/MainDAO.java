package edu.kh.project.main.model.dao;


import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.project.admin.model.vo.Store;

@Repository
public class MainDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

	// 메인페이지 통계표 비동기 ajax 목록 불러오기
	public List<Store> resultList() {
		return sqlSession.selectList("mainMapper.resultList");
	}
	
	// 검색어 + 카테고리 검색 결과 출력하기
	public List<Store> storeList(Map<String, Object> saerchResult) {
		return sqlSession.selectList("mainMapper.storeList", saerchResult);
	}

	// 모달 팝업창 해당 가맹점 조회
	public List<Store> modalResult(int storeNo) {
		return sqlSession.selectList("mainMapper.modalResult", storeNo);
	}
}
