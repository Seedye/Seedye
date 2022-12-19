package edu.kh.project.board.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import edu.kh.project.board.service.BoardService;

@Controller
public class BoardController {
	@Autowired
	private BoardService service;
	
	@GetMapping("/boardList")
	public String boardList() {
		return "board/boardList";
	}	

}
