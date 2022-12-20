package edu.kh.project.main;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

	// 메인페이지 이동
	@GetMapping("/")
	public String mainPage() {
		
		return "main/mainPage";
	}
}

