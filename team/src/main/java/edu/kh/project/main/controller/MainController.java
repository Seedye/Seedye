package edu.kh.project.main.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import edu.kh.project.admin.model.vo.Store;
import edu.kh.project.main.model.service.MainService;
import edu.kh.project.main.model.vo.Bookmark;
import edu.kh.project.member.model.vo.Member;

@Controller
public class MainController {
	
	@Autowired
	private MainService service;

	// 메인페이지 이동
	@GetMapping("/")
	public String mainPage(Model model,
			@SessionAttribute(name = "loginMember", required = false) Member loginMember) {
		
		Map<String, Object> mainPageMap = new HashMap<String, Object>();
		
		// 가맹점 수 조회
		List<Store> resultList = service.resultList();
		
		// 신규 추가된 가맹점 조회(위에서 10개)
		List<Store> newInsertList = service.newInsertList();
		
		// 로그인한 회원의 즐겨찾기 조회
		if (loginMember != null) {
			
			List<Bookmark> bookmarkList = service.selectBookmarkList(loginMember.getMemberNo());
			
			System.out.println(bookmarkList);
			
			mainPageMap.put("bookmarkList" ,bookmarkList);
		}
		
		mainPageMap.put("resultList" ,resultList);
		mainPageMap.put("newInsertList" ,newInsertList);
		
		model.addAttribute("mainPageMap", mainPageMap);
		
		return "main/mainPage";
	}

	// 검색어 + 카테고리 검색 결과 출력하기
	@GetMapping("/storeList")
	@ResponseBody
	public List<Store> storeList(
			@RequestParam("searchValue") String searchValue,
			@RequestParam("categoryArr") String[] categoryArr){
		
		Map<String, Object> saerchResult = new HashMap<String, Object>();
		
		saerchResult.put("searchValue", searchValue);
		saerchResult.put("categoryArr", categoryArr);
		
		List<Store> storeList = service.storeList(saerchResult);
		
		return storeList;
		
	}
	
	// 모달 팝업창 해당 가맹점 조회
	@GetMapping("/modalContent")
	@ResponseBody
	public List<Store> modalResult(
			@RequestParam("storeNo") int storeNo){
		
		List<Store> modalResult = service.modalResult(storeNo);
		
		return modalResult;
	}
	
	@GetMapping("/selectBookmarkList")
	@ResponseBody
	public List<Bookmark> selectBookmarkList(
			@RequestParam("loginMemberNo") int memberNo) {
		
		List<Bookmark> memberBookmarkList = service.selectBookmarkList(memberNo);
		
		return memberBookmarkList;
		
	}
	
	// 즐겨찾기 삭제
	@GetMapping("/modalContent/delete")
	@ResponseBody
	public int modalDelete(
			@RequestParam("loginMemberNo") int memberNo,
			@RequestParam("bookmarkStoreNo") int storeNo) {
		
		Map<String, Integer> deleteMap = new HashMap<String, Integer>();
		
		deleteMap.put("memberNo", memberNo);
		deleteMap.put("storeNo", storeNo);
		
		int result = service.modalDelete(deleteMap);
		
		return result;
		
	}
	
	// 즐겨찾기 등록
	@GetMapping("/modalContent/insert")
	@ResponseBody
	public int modalInsert(
			@RequestParam("loginMemberNo") int memberNo,
			@RequestParam("bookmarkStoreNo") int storeNo) {
		
		Map<String, Integer> insertMap = new HashMap<String, Integer>();
		
		insertMap.put("memberNo", memberNo);
		insertMap.put("storeNo", storeNo);
		
		int result = service.modalInsert(insertMap);
		
		return result;
		
	}
}

