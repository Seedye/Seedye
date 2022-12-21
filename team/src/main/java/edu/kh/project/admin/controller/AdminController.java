package edu.kh.project.admin.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.core.tools.picocli.CommandLine.ParameterException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;

import edu.kh.project.admin.model.service.AdminService;
import edu.kh.project.board.model.vo.Board;
import edu.kh.project.member.model.vo.Member;


@RequestMapping("/admin")
@Controller
public class AdminController {
	
	@Autowired
	private AdminService service;

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
	@GetMapping("/board/{boardCode}")
	public String selectBoardList(@PathVariable("boardCode") int boardCode,
			Model model,
			@RequestParam(value="cp", required = false, defaultValue = "1")int cp,
			@RequestParam Map<String, Object> pm) {
		
		if(pm.get("key") == null) {
			Map<String, Object> map = service.selectBoardList(boardCode, cp);
			model.addAttribute("map",map);
		} else {
			pm.put("boardCode", boardCode);
			Map<String, Object> map = service.selectBoardList(pm,cp);
			model.addAttribute("map",map);
		}
			return "admin/manageBoard";
	}
	
	// 게시글 상세 조회
	
	@GetMapping("/board/{boardCode}/{boardNo}")
	public String boardDetail(
			@PathVariable("boardNo") int boardNo,
			@PathVariable("boardCode") int boardCode,
			Model model,
			HttpServletRequest req, HttpServletResponse resp,
			@SessionAttribute(value="loginMember", required = false)Member loginMember) throws ParameterException {
	
		Board board = service.selectBoardDetail(boardNo);
		
		return "admin/manageBoard";
		
	}
		
	// 게시글 삭제
	
	// 게시글 수정화면 이동
	
	// 게시글 수정
	
	// 게시글 작성(공지사항(code=1), 업데이트(code=2) 이동
	
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
