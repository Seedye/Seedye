package edu.kh.project.main.model.service;

import java.util.List;

import edu.kh.project.admin.model.vo.Store;

public interface MainService {

	// 메인페이지 통계표 비동기 ajax 목록 불러오기
	List<Store> resultList();

}
