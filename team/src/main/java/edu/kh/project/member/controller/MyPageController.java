package edu.kh.project.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import edu.kh.project.member.model.service.MyPageService;

@Controller
public class MyPageController {
	
	@Autowired
	private MyPageService service;
	
	// 내 정보 페이지 이동
	@GetMapping("/info")
	public String info() {
		return "member/myPage-info";
	}
	

}
