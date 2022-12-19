package edu.kh.project.member.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import edu.kh.project.member.model.dao.MemberDAO;
import edu.kh.project.member.model.vo.Member;

@Service
public class MemberServiceImpl implements MemberService{

	@Autowired
	private MemberDAO dao;
	
	// spring-security.xml에서 등록한 bean을 의존성 주입(DI)
	@Autowired
	private BCryptPasswordEncoder bcrypt;

	// 로그인 서비스
	@Override
	public Member login(Member inputMember) {
		Member loginMember = dao.login(inputMember.getMemberId());
		
		if(loginMember != null) { // 아이디 정상 입력
			
			if(bcrypt.matches(inputMember.getMemberPw(), loginMember.getMemberPw())) {

				loginMember.setMemberPw(null);
				
			} else {
				loginMember = null;
			}
		}
		return loginMember;
	}
	
	
	
	
	
	
	
}