package edu.kh.project.board.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.project.board.model.service.BoardService;
import edu.kh.project.board.model.vo.Board;
import edu.kh.project.member.model.vo.Member;

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
	
	/** 자유 게시물 리스트 조회
	 * @param boardCode
	 * @param model
	 * @param cp
	 * @param pm
	 * @return
	 */
	@GetMapping("/freeBoard/{boardCode}")
	public String selectFreeBoardList(@PathVariable("boardCode") int boardCode,
			Model model,
			@RequestParam(value="cp", required=false, defaultValue="1") int cp,
			@RequestParam Map<String, Object> pm
			) {
		
		Map<String, Object> map = service.selectFreeBoardList(boardCode,cp);
		model.addAttribute("map", map);
		
		
		return "board/freeBoardList";
	}
	
	
	/** 문의게시물 작성
	 * @param loginMember
	 * @param ra
	 * @param session
	 * @param fileList
	 * @param board
	 * @param referer
	 * @return
	 * @throws IOException 
	 */
	@PostMapping("/QAWrite/{boardCode}")
	public String QAWrite(
			@PathVariable("boardCode") int boardCode,
			@SessionAttribute(value="loginMember") Member loginMember,
			RedirectAttributes ra,
			HttpSession session,
			@RequestParam(value="inputFile") List<MultipartFile> fileList,
			Board board,
			@RequestHeader("referer") String referer
			
			) throws IOException {
		
		board.setBoardCode(boardCode);
		board.setMemberNo(loginMember.getMemberNo());
		
		
		String webPath = "/resources/images/board/";
		String folderPath = session.getServletContext().getRealPath(webPath);
		
		System.out.println(board);
		
		int result = service.QAWrite( board, fileList, webPath, folderPath);
		
		
		
		String path=null;
		if(result > 0) {
			path = referer;
		}else {
			path = referer; // **나중에 변경필요
		}
		return "redirect:"+path;
	}
	
	

}
