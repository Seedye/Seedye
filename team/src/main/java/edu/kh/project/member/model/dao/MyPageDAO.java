package edu.kh.project.member.model.dao;

import java.util.List;
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
	 * @return result
	 */
	public int updateInfo(Member inputMember) {
		return sqlSession.update("myPageMapper.updateInfo", inputMember);
	}


	/** 회원 정보 (비밀번호 포함) 수정 서비스
	 * @param paramMap
	 * @return result
	 */
	public int updatePw(Map<String, Object> paramMap) {
		return sqlSession.update("myPageMapper.changePw", paramMap);
	}


	public String selectEncPw(int memberNo) {
		return sqlSession.selectOne("myPageMapper.selectEncPw", memberNo);
	}


	/** 휴대폰 번호로 맴버 아이디 조회
	 * @param toPhone
	 * @return memberId
	 */
	public String selectPhoneMemberId(String toPhone) {
		return sqlSession.selectOne("myPageMapper.selectPhoneMemberId", toPhone);
	}

}
