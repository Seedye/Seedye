package edu.kh.project.main.model.service;


import java.util.HashMap;
import java.util.List;

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
	
}
