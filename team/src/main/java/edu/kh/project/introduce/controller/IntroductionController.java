package edu.kh.project.introduce.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IntroductionController {

	@GetMapping("/introduction")
	public String introductionPage() {
		
		return "introduction/introductionPage";

	}
	@GetMapping("/support")
	public String supportPage() {
		
		return "support/supportPage";
		
	}
}