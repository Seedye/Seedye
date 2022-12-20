package edu.kh.project.admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/admin")
@Controller
public class AdminController {
	


	// 게시글 관리화면 이동
	@GetMapping("/manageBoard")
	public String selectManageBoard() {
		return "admin/manageBoard";
	}
	
	// 회원 관리 화면 이동
	@GetMapping("/manageMember")
	public String manageMember() {
		return "admin/manageMember";
	}
	
	// 식당 관리 화면 이동
	@GetMapping("/manageStore")
	public String manageStore() {
		return "admin/manageStore";
	}
	
	// 게시글 목록 조회
	
	// 게시글 상세 조회
		
	// 게시글 삭제
	
	// 게시글 수정화면 이동
	
	// 게시글 수정
	
	// 게시글 작성(공지사항, 업데이트) 이동
	
	// 게시글 작성
	
	// 댓글 작성(문의하기 게시판)
	
	// 댓글 조회
	
	// 댓글 수정
	
	// 댓글 삭제
	
	
	// -----------------------------------------------------------
	
	
	// 회원 목록 조회
	
	// 회원 권한 변경
	
	// 회원 탈퇴
	
	// 식당 목록 조회
	
	// 식당 등록 신청
	
	// 식당 등록(조회 후 승인)
	
	
	
	
	
	
	
}
