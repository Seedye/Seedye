package edu.kh.project.main.model.dao;


import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.project.admin.model.vo.Store;
import edu.kh.project.main.model.vo.Bookmark;

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

	// 신규 추가된 가맹점 조회(위에서 10개)
	public List<Store> newInsertList() {
		return sqlSession.selectList("mainMapper.newInsertList");
	}

	// 로그인한 회원의 즐겨찾기 조회
	public List<Bookmark> selectBookmarkList(int memberNo) {
		return sqlSession.selectList("mainMapper.selectBookmarkList", memberNo);
	}

	// 즐겨찾기 삭제
	public int modalDelete(Map<String, Integer> deleteMap) {
		return sqlSession.delete("mainMapper.modalDelete", deleteMap);
	}

	// 즐겨찾기 등록
	public int modalInsert(Map<String, Integer> insertMap) {
		return sqlSession.insert("mainMapper.modalInsert", insertMap);
	}
}
