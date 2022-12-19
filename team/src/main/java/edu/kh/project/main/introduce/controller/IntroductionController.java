package edu.kh.project.main.introduce.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IntroductionController {
	
	@GetMapping("/introduction")
	public String introductionPage() {
		return "introduction/introductionPage";
	}
}
