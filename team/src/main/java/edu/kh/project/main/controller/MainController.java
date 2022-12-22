package edu.kh.project.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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
	public String mainPage() {
		
		return "main/mainPage";
	}
	
	// 메인페이지 통계표 비동기 ajax 목록 불러오기
	@GetMapping("/result")
	@ResponseBody
	public List<Store> resultList(){
	
		List<Store> resultList = service.resultList();
		
		return resultList;
	}
	
	@GetMapping("/storeList")
	@ResponseBody
	public List<Store> storeList(
			@RequestParam("searchValue") String searchValue,
			@RequestParam("categoryArr") String[] categoryArr){
		
		
		System.out.println(searchValue);
		System.out.println(categoryArr);
		
		return null;
		
	}
}

