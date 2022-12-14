package edu.kh.project.admin.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.mail.Session;
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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;


import org.springframework.web.bind.annotation.ResponseBody;
import com.google.gson.Gson;
import edu.kh.project.admin.model.service.AdminService;
import edu.kh.project.admin.model.vo.License;
import edu.kh.project.admin.model.vo.Store;
import edu.kh.project.admin.model.vo.StoreImage;
import edu.kh.project.board.model.vo.Board;
import edu.kh.project.board.model.vo.Comment;
import edu.kh.project.common.Pagination;
import edu.kh.project.common.Util;
import edu.kh.project.member.model.vo.Member;




@Controller
public class AdminController {
	
	@Autowired
	private AdminService service;

	// 게시글 관리화면 이동
	@GetMapping("/admin/manageBoard")
	public String selectManageBoard() {
		return "admin/manageBoard";
	}
	
	
	
	
	// 회원 관리 화면 이동
	@GetMapping("/admin/manageMember")
	public String manageMember() {
		return "admin/manageMember";
	}
	
	// 식당 관리 화면 이동
	@GetMapping("/admin/manageStore")
	public String manageStore() {
		return "admin/manageStore";
	}
	
	
	// 게시글 목록 조회
	@GetMapping("/admin/board/{boardCode}")
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
			return "board/boardList";
	}

	// 게시글 상세 조회
	
	@GetMapping("/admin/board/{boardCode}/{boardNo}")
	public String boardDetail(
			@PathVariable("boardNo") int boardNo,
			@PathVariable("boardCode") int boardCode,
			Model model,
			HttpServletRequest req, HttpServletResponse resp,
			@SessionAttribute(value="loginMember", required = false)Member loginMember) throws ParameterException {
	
		Board board = service.selectBoardDetail(boardNo);
		
		return "admin/manageBoard";
		
	}
	
	// 게시판 리스트 조회
	@GetMapping("/admin/selectBoardList")
	@ResponseBody
	public String selectAdminBoard(int boardCode, Model model,
			@RequestParam(value="cp", required=false, defaultValue = "1") int cp, 
			@RequestParam Map<String, Object> boardMap) {
		
		// 검색 결과 없을 때
		if(boardMap.get("keyword") == null) {
			
			Map<String, Object> map = service.selectAdminBoard(boardCode, cp);
			
			map.put("boardCode", boardCode);
			
			model.addAttribute("map", map);
			
			return new Gson().toJson(map);
			
		// 검색 결과 있을 때	
		} else {
			
			boardMap.put("boardCode", boardCode);
			
			Map<String, Object> map = service.selectAdminBoard_search(boardMap, cp);

			map.put("boardCode", boardCode);
			
			model.addAttribute("map", map);
			
			return new Gson().toJson(map);
		}
		
		
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
			message = " 삭제 실패";
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
	@GetMapping("/admin/write/{boardCode}")
	public String boardWrite(@PathVariable("boardCode") int boardCode) {
		
		return "board/boardWrite";
	}
	
	// 게시글 작성
	@PostMapping("/admin/write/{boardCode}")
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
	

	// 회원 목록 조회
	@GetMapping("/admin/selectMemberList")
	@ResponseBody
	public String selectMemberList(Model model,
			@RequestParam(value="cp", required=false, defaultValue = "1") int cp, 
			@RequestParam Map<String, Object> searchMap) {
			
			
			
			if(searchMap.get("searchkey") == null) {
			
			Map<String, Object> map = service.selectMemberList(cp);
			
			model.addAttribute("map", map);
			
			
			
			return new Gson().toJson(map);
	
		} else {
			
			
			searchMap = service.searchKey(searchMap, cp); 
			
			return new Gson().toJson(searchMap);
		}
	}
	
	// 회원 관리 화면 조회
	@GetMapping("/admin/selectMember")
	@ResponseBody
	public Member selectMember(int memberNo) {
		
		Member member = new Member();
		
		member = service.selectMember(memberNo);
		
		
		return member;
	}
	
	
	// 회원 권한 변경
	@GetMapping("/admin/updateInfo")
	@ResponseBody
	public int updateInfo( int memberNo) {
		
		
		int result = service.updateInfo(memberNo);
		
		return result;
	}
	
	
	
	
	// 회원 탈퇴
	@GetMapping("/admin/deleteMember")
	@ResponseBody
	public int memberDelete (int memberNo) {
		
		int result = service.deleteMember(memberNo);
		
		return result;
	}

	
	// 수정 중
	// 식당 목록 조회
	@GetMapping("/admin/selectStoreList")
	@ResponseBody
	public String selectStoreList(Model model,
			@RequestParam(value="cp", required=false, defaultValue="1") int cp,
			@RequestParam Map<String, Object> searchMap) {
		
		
		
		if(searchMap.get("keyword") == null){ 
		
			Map<String, Object> map = service.selectStoreList(cp);
			
			model.addAttribute("map", map);
				
			
				
			return new Gson().toJson(map);
		
		} else {
			
			
			searchMap = service.searchStoreList(searchMap, cp);
			
			
			return new Gson().toJson(searchMap);			
		}
		
	}
	
	// 식당 selectBox 조회
	@GetMapping("/admin/selectType")
	@ResponseBody
	public String selectTypeList(Model model, String storeType,
			@RequestParam(value="cp", required=false, defaultValue="1") int cp,
			@RequestParam Map<String, Object> selectMap) {
		
		
		
		if(selectMap.get("keyword") == null) {
		
			Map<String, Object> typeMap = service.selectStoreList(storeType, cp);
	
			model.addAttribute("typeMap", typeMap);
		
		
			return new Gson().toJson(typeMap);
			
		} else {
			Map<String, Object> selectMap_search = service.selectStoreList_search(selectMap, cp);
			

			model.addAttribute("selectMap_search", selectMap_search);
			
			
			return new Gson().toJson(selectMap_search);
			
		}
		
	}
	
	// 식당관리 신청조회
	@GetMapping("/admin/enroll")
	@ResponseBody
	public String selectEnroll(char checkFl,
			@RequestParam(value="cp", required=false, defaultValue="1") int cp,
			@RequestParam Map<String, Object> enrollMap) {
		
		if(enrollMap.get("keyword") == null) {
			
			Map<String, Object> map = service.selectEnroll(checkFl, cp);
			
			
			return new Gson().toJson(map);
		
		} else {
			
			Map<String, Object> map = service.selectEnroll_search(enrollMap, cp);
			
			
			return new Gson().toJson(map);
		}
		
		
	}
	
	
	
	
	// 식당 등록 신청
	@PostMapping("/register")
	public String register(
			Store store,
			License license,
			@RequestParam(value="images", required=false) List<MultipartFile> imageList,
			@RequestParam(value="license") MultipartFile licenseImg, 
			@SessionAttribute("loginMember") Member loginMember,
			RedirectAttributes ra,
			HttpSession session, @RequestHeader("referer")String referer) throws Exception{
		
		
		// 로그인한 유저 번호
		store.setMemberNo(loginMember.getMemberNo());
		
		// 사업자 등록증
		String webPath = "/resources/images/license/";

		// 가맹점 이미지
		String webPath2 = "/resources/images/store/";
		
		// 사업자 등록증
		String folderPath = session.getServletContext().getRealPath(webPath);
		
		// 가맹점 이미지
		String folderPath2 = session.getServletContext().getRealPath(webPath2);
		
		int result = service.register(store, license, imageList, licenseImg, webPath, webPath2, folderPath, folderPath2);
		
		String path = null;
		String message = null;
		
		if(result > 0) {
			
			path = referer;
			message ="성공";
		} else {
			path = "/";
			message = "실패";
		}
		
		ra.addFlashAttribute("message", message);
		
		return "redirect:" + path;
	}

	
	// 식당 등록(조회 후 승인)
	@GetMapping("/admin/storeManage")
	@ResponseBody
	public Store selectStoreManage(int storeNo) {
		
		// 식당 상태 조회
		char storeCheck = service.storeCheck(storeNo);
		
		
		// 식당 등록 미확인일때 협의중으로 변경
		if(storeCheck == 'N') {
		
			service.storeChange(storeNo);
			
		}
		
		// 식당 정보 조회(이미지 제외)
		Store store = service.selectStoreManage(storeNo);


		// 식당 이미지 조회
		List<StoreImage> storeList = service.selectStoreManageImg(storeNo);
		
		
		if(!store.getImageList().isEmpty()) {
			store.setLicensePath(storeList.get(0).getLicensePath());
		}
		
		return store;
		
		
	}
	
	

	// 식당 등록
	@GetMapping("/admin/registerStore")
	@ResponseBody
	public int registerStore(int storeNo) {
		
		int result = service.registerStore(storeNo);
		
		return result;
		
	}
	

	// 식당 등록 취소
	@GetMapping("/admin/storeReturn")
	@ResponseBody
	public int storeReturn(int storeNo) {
		
		int result = service.storeReturn(storeNo);
		
		return result;
	}
	
	
	// 자유게시판 조회
	@GetMapping("/admin/selectFreeBoard")
	@ResponseBody
	public String selectFreeBoard(int boardNo, Model model) {
		
		List<Board> boardList = service.selectFreeBoard(boardNo);
		
		List<Comment> commentList = service.selectFreeBoard_comment(boardNo);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("boardList", boardList);
		map.put("commentList", commentList);
		
		model.addAttribute("map", map);
		
		
		return new Gson().toJson(map);
	}
	
	// 자유게시판 삭제
	@GetMapping("/admin/deleteFreeBoard")
	@ResponseBody
	public int deleteFreeBoard(int boardNo) {
		
		int result = service.deleteFreeBoard(boardNo);
		
		return result;
	}
	
	
	// 식당 정보 수정
	@GetMapping("/admin/updateStore")
	@ResponseBody
	public int updateStore(@RequestParam Map<String, Object> paramMap, int storeNo) {
		
	
		
		int result = service.updateStore(paramMap, storeNo);
		
		
		return result;
			
		
		
	}
	
}