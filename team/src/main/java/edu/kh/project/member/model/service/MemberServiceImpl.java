package edu.kh.project.member.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
		
//		if(loginMember != null) { // 아이디 정상 입력
//		  
//		if(bcrypt.matches(inputMember.getMemberPw(), loginMember.getMemberPw())) {
//		 
//		loginMember.setMemberPw(null);
//		  
//		} else { loginMember = null; } }
		 
//		System.out.println("입력한 비밀번호 : " + inputMember.getMemberPw());
//		System.out.println("암호화 비밀번호 : " + bcrypt.encode(inputMember.getMemberPw()));
		
		return loginMember;
	}

	// 회원가입 서비스
	@Transactional(rollbackFor = Exception.class) // 모든 예외 발생 시 롤백
	@Override
	public int signUp(Member inputMember) {
		// 비밀번호 암호화
		String encPw = bcrypt.encode(inputMember.getMemberPw());
		
		inputMember.setMemberPw(encPw);
		
		// DAO 호출 후 결과 반환 받기
		int result = dao.signUp(inputMember);
		
		return result;
	}

	// 아이디 중복 검사 서비스
	@Override
	public int idDupCheck(String memberId) {
		return dao.idDupCheck(memberId);
	}
	
	
	
	
	
	
	
}