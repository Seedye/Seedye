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
