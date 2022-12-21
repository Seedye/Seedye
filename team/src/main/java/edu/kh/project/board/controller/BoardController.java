package edu.kh.project.board.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import edu.kh.project.board.model.service.BoardService;

@Controller
public class BoardController {
	@Autowired
	private BoardService service;
	
	
	/** 게시물 리스트 조회
	 * @param boardCode
	 * @param model
	 * @param cp
	 * @param pm
	 * @return
	 */
	@GetMapping("/boardList/{boardCode}")
	public String selectBoardList(@PathVariable("boardCode") int boardCode,
			Model model,
			@RequestParam(value="cp", required=false, defaultValue="1") int cp,
			@RequestParam Map<String, Object> pm
			) {
		
		
		Map<String, Object> map = service.selectBoardList(boardCode,cp);
		model.addAttribute("map", map);
		
		
		return "board/boardList";
	}
	
	
	

}
