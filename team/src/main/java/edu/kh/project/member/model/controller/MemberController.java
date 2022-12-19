package edu.kh.project.member.model.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.project.member.model.service.MemberService;
import edu.kh.project.member.model.vo.Member;

@Controller
@SessionAttributes({"loginMember", "message", "test2"})
public class MemberController {
	
	@Autowired
	private MemberService service;
	
	// 로그인
	@PostMapping("/member/login")
	public String login(/* @ModelAttribute */ Member inputMember,
				Model model,
				RedirectAttributes ra,
				@RequestParam(value="saveId", required=false) String saveId, // 체크박스 값 얻어오기
				HttpServletResponse resp, // 쿠키 전달용
				@RequestHeader(value="referer") String referer // 요청 이전 주소
				) {
		
		Member loginMember = service.login(inputMember);
		
		String path = null;
		
		if(loginMember != null) {
			path = "/"; // 메인 페이지
			
			model.addAttribute("loginMember", loginMember);
			
			// 쿠키 생성
			Cookie cookie = new Cookie("saveId", loginMember.getMemberId());
			// 로그인된 회원의 아이디를 saveId에 저장
			
			if(saveId != null) {
				cookie.setMaxAge(60 * 60 * 24 * 365);
			} else {
				cookie.setMaxAge(0);
			}
			
			cookie.setPath("/");
			
			resp.addCookie(cookie);
			
		} else {
			path = referer;
			
			ra.addFlashAttribute("message", "아이디 또는 비밀번호가 일치하지 않습니다");
		}
		
		return "redirect:" + path;
	}
	

	
	
	
	
	
}