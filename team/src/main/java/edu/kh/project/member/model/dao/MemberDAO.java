package edu.kh.project.member.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.project.member.model.vo.Member;

@Repository
public class MemberDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	// 로그인 DAO
	public Member login(String memberId) {
		return sqlSession.selectOne("memberMapper.login",memberId);
	}

	// 회원가입 DAO
	public int signUp(Member inputMember) {
		
		return sqlSession.insert("memberMapper.signUp", inputMember);
	}
}
