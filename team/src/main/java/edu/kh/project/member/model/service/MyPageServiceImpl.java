package edu.kh.project.member.model.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.project.member.model.dao.MyPageDAO;
import edu.kh.project.member.model.vo.Member;

@Service
public class MyPageServiceImpl implements MyPageService{
	
	@Autowired
	private MyPageDAO dao;
	
	@Autowired
	private BCryptPasswordEncoder bcrypt;
	
	// 회원 정보 수정 서비스
	@Transactional
	@Override
	public int updateInfo(Member inputMember) {
		int result = dao.updateInfo(inputMember);
		return result;
	}

	// 회원 정보 (비밀번호 포함) 수정 서비스
	@Transactional
	@Override
	public int updateAllInfo(Member inputMember, Map<String, Object> paramMap) {
		
		String encPw = dao.selectEncPw( (int)paramMap.get("memberNo"));
		
		if(bcrypt.matches( (String)paramMap.get("currentPw"), encPw)) {
			
			int infoResult = dao.updateInfo(inputMember);
			// 새 비밀번호 암호화
			String newPw = bcrypt.encode( (String)paramMap.get("newPw"));
			
			paramMap.put("newPw", newPw);
			// paramMap에 존재하는 기존 "newPw"를 덮어쓰기
			
			int PwResult = dao.updatePw(paramMap);
			
			return infoResult + PwResult;
		}
		
		return 0;
	}

	// 휴대폰 번호로 맴버 아이디 조회
	@Override
	public String selectPhoneMemberId(String toPhone) {
		return dao.selectPhoneMemberId(toPhone);
	}


	// 회원 탈퇴 서비스
//	@Transactional
//	@Override
//	public int memberDelete(int memberNo, String memberPw) {
//		
//		String encPw = dao.selectEncPw(memberNo);
//		
//		if(bcrypt.matches)
//		return dao.memberDelete(memberNo);
//	}

}
