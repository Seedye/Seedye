package edu.kh.project.member.model.dao;

import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.project.member.model.vo.Member;

@Repository
public class MyPageDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	
	/** 회원 정보 수정 DAO
	 * @param inputMember
	 * @return
	 */
//	public int updateInfo(Member inputMember) {
//		return sqlSession.update("myPageMapper.updateInfo", inputMember);
//	}


	/** 회원 정보 수정 DAO
	 * @param inputMember
	 * @param paramMap
	 * @return
	 */
	public int updateInfo(Member inputMember, Map<String, Object> paramMap) {
		return sqlSession.update("myPageMapper.updateInfo", paramMap);
	}

}
