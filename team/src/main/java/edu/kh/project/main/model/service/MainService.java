package edu.kh.project.main.model.service;

import java.util.List;
import java.util.Map;

import edu.kh.project.admin.model.vo.Store;
import edu.kh.project.main.model.vo.Bookmark;

public interface MainService {

	// 메인페이지 통계표 비동기 ajax 목록 불러오기
	List<Store> resultList();

	// 검색어 + 카테고리 검색 결과 출력하기
	List<Store> storeList(Map<String, Object> saerchResult);

	// 모달 팝업창 해당 가맹점 조회
	List<Store> modalResult(int storeNo);

	// 신규 추가된 가맹점 조회(위에서 10개)
	List<Store> newInsertList();

	// 로그인한 회원의 즐겨찾기 조회
	List<Bookmark> selectBookmarkList(int memberNo);

	// 즐겨찾기 삭제
	int modalDelete(Map<String, Integer> deleteMap);

	// 즐겨찾기 등록
	int modalInsert(Map<String, Integer> insertMap);

}
