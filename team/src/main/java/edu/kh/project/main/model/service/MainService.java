package edu.kh.project.main.model.service;

import java.util.List;
import java.util.Map;

import edu.kh.project.admin.model.vo.Store;

public interface MainService {

	// 메인페이지 통계표 비동기 ajax 목록 불러오기
	List<Store> resultList();

	// 검색어 + 카테고리 검색 결과 출력하기
	List<Store> storeList(Map<String, Object> saerchResult);

}
