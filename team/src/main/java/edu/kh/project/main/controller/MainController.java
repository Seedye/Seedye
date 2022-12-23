package edu.kh.project.main.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.kh.project.admin.model.vo.Store;
import edu.kh.project.main.model.service.MainService;

@Controller
public class MainController {
	
	@Autowired
	private MainService service;

	// 메인페이지 이동
	@GetMapping("/")
	public String mainPage(Model model) {
		
		List<Store> resultList = service.resultList();
		
		model.addAttribute("resultList", resultList);
		
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
		
		System.out.println(saerchResult);
		
		List<Store> storeList = service.storeList(saerchResult);
		
		return storeList;
		
	}
	
	// 모달 팝업창 해당 가맹점 조회
	@GetMapping("/modalContent")
	@ResponseBody
	public List<Store> modalResult(
			@RequestParam("storeNo") int storeNo){
		
		List<Store> modalResult = service.modalResult(storeNo);
		
		System.out.println(storeNo);
		System.out.println(modalResult);
		
		return modalResult;
	}
}

