package edu.kh.project.admin.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.core.tools.picocli.CommandLine.ParameterException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;


import org.springframework.web.bind.annotation.ResponseBody;
import com.google.gson.Gson;
import edu.kh.project.admin.model.service.AdminService;
import edu.kh.project.admin.model.vo.Store;
import org.springframework.web.bind.annotation.SessionAttribute;
import edu.kh.project.admin.model.service.AdminService;
import edu.kh.project.board.model.vo.Board;
import edu.kh.project.common.Util;
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
	@GetMapping("/board/{boardCode}/{boardNo}/delete")
	public String biardDelete(RedirectAttributes ra,
			@RequestHeader("referer")String referer,
			@PathVariable("boardNo")int boardNo,
			@PathVariable("boardCode")int boardCode) {
		
		int result = service.boardDelete(boardNo);
		
		String path = null;
		String message = null;
		
		if(result > 0) {
			
			path = "/board/" + boardCode;
			message = "삭제되었습니다";
		}else {
		
			path = referer;
			message = "게시글 삭제 실패";
		}
		
		
		ra.addFlashAttribute("message",message);
		return "redirect:" + path;
	}
	
	// 게시글 수정화면 이동
	@GetMapping("/board/{boardCode}/{boardNo}/update")
	public String boardUpdate(@PathVariable("boardCode")int boardCode,
			@PathVariable("boardNo")int boardNo,
			Model model) {
		
		Board board = service.selectBoardDetail(boardNo);
		
		board.setBoardContent(Util.newlineClear(board.getBoardContent()));
		
		model.addAttribute("board",board);
		
		return "board/boardUpdate";
	}
	
	// 게시글 수정
	@PostMapping("/board/{boardCode}/{boardNo}/update")
	public String boardUpdate( 
			Board board,
			@PathVariable("boardCode") int boardCode,
			@PathVariable("boardNo") int boardNo,
			@RequestParam(value="cp", required = false, defaultValue = "1")int cp,
			@RequestHeader("referer")String referer,
			RedirectAttributes ra) throws Exception {
		
		board.setBoardNo(boardNo);
		
		int result = service.boardUpdate(board);
		
		String path = null;
		String message = null;
		
		if (result > 0 ) {
			path = "/board/" + boardCode + "/" + boardNo + "?cp" + cp;
			message = "게시글이 수정되었습니다.";
		}else {
			path = referer;
			message = "게시글 수정에 실패하였습니다.";
		}
		
		ra.addFlashAttribute("message",message);
			
		return "redirect" + path;
	}
	
	
	// 게시글 작성(공지사항(code=1), 업데이트(code=2) 이동
	@GetMapping("/write/{boardCode}")
	public String boardWrite(@PathVariable("boardCode") int boardCode) {
		
		return "board/boardWrite";
	}
	
	// 게시글 작성
	@PostMapping("/write/{boardCode}")
	public String boardWrite(Board board,
			@SessionAttribute("loginMember") Member loginMember,
			@PathVariable("boardCode")int boardCode,
			RedirectAttributes ra, HttpSession session,
			@RequestHeader("referer") String referer) throws IOException {
		
		board.setBoardCode(boardCode);
		
		board.setMemberNo(loginMember.getMemberNo());
		
		int boardNo = service.boardWrite(board);
		
		String message = null;
		String path = null;
		
		if(boardNo > 0) {
			message = "등록되었습니다.";
			path = "/board/" + boardCode + "/" + boardNo;
		
		}else {
			message = "등록이 실패하였습니다.";
			path = referer;
		}
		
		ra.addFlashAttribute("message", message);
		
		return "redirect" + path;
	}
	
	
	// 댓글 작성(문의하기 게시판)
	
	// 댓글 조회
	
	// 댓글 수정
	
	// 댓글 삭제
	
	
	// -----------------------------------------------------------
	
	
	// 회원 목록 조회
	@GetMapping("selectMemberList")
	@ResponseBody
	public String selectMemberList() {
		
		List<Member> memberList = service.selectMemberList();
		
		return new Gson().toJson(memberList);
	}
	
	// 회원 관리 화면 조회
	@GetMapping("selectMember")
	@ResponseBody
	public Member selectMember(int memberNo) {
		
		Member member = new Member();
		
		member = service.selectMember(memberNo);
		
		return member;
	}
	
	
	// 회원 권한 변경
	@GetMapping("updateInfo")
	@ResponseBody
	public int updateInfo( int memberNo) {
		
		
		int result = service.updateInfo(memberNo);
		
		return result;
	}
	
	
	
	
	// 회원 탈퇴
	

	// 식당 목록 조회
	@GetMapping("selectStoreList")
	@ResponseBody
	public String selectStoreList() {

			List<Store> storeList = service.selectStoreList();
			
			
			return new Gson().toJson(storeList);
		
		
		
	}
	
	@GetMapping("selectType")
	@ResponseBody
	public String selectType(String storeType) {
		List<Store> storeList = service.selectStoreList(storeType);
	
		return new Gson().toJson(storeList);
	}
	
	
	
	
	// 식당 등록 신청
	
	
	// 식당 등록(조회 후 승인)
	
	
	
	
	
	
	
}
