package edu.kh.project.main.model.dao;


import java.util.List;

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
}
