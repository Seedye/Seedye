package edu.kh.project.member.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.project.member.model.service.MemberService;
import edu.kh.project.member.model.vo.Member;
import net.nurigo.java_sdk.Coolsms;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;

@Controller
@SessionAttributes({"loginMember", "message", "test2"})
public class MemberController {
	
	@Autowired
	private MemberService service;
	
	// coolsms 사용 시 필요
	final DefaultMessageService messageService;
	
	public MemberController() {
		this.messageService = NurigoApp.INSTANCE.initialize("NCSGKH1S9GUXAXCF", "ZOGVLRXYFLYRSETGK5QLDPKFKN1U0NC6", "https://api.coolsms.co.kr");
	}
	
	// 로그인
	@PostMapping("/login")
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
	
	// 로그인
	@GetMapping("/login")
	public String loginPage() {
		return "/member/login";
	}	
	
	// 로그아웃
	@GetMapping("/logout")
	public String logout(SessionStatus status) {
		
		// 기존 :
		//	HttpServletRequest req;
		//	HttpSession session = req.getSession();
		//	session.invalidate();
		// -> 안됨 ...
		
		// 왜? @SessionAttributes로 session scope에 등록된 값을 무효화 시키려면
		// SessionStatus 라는 별도의 객체를 이용해야 한다.
		
		status.setComplete(); // 세션 무효화
		
		return "redirect:/";
	}
	
	// 회원가입 페이지 이동
	@GetMapping("/signUp")
	public String signUpPage() {
		return "/member/signUp";
	}	
	
	// 회원가입
	@PostMapping("/signUp")
	public String signUp(/* @ModelAttribute 생략 */
			Member inputMember /* 커맨드 객체 */,
//			String[] memberTel,
			String[] memberAddress, /* name 속성 값이 memberAddress인 값을 배열로 반환 */
			RedirectAttributes ra,
			@RequestHeader("referer") String referer) {
		
		// 주소가 작성되지 않은 경우 -> null
		if (inputMember.getMemberAddress().equals(",,")) {
			inputMember.setMemberAddress(null);
		} else { // 주소가 작성된 경우 -> 주소,,주소,,주소
			
			inputMember.setMemberAddress(String.join(",,", memberAddress));
			
		}
		
		// 서비스 호출 후 결과 반환 받기
		int result = service.signUp(inputMember);
		
		String path = null; // 리다이렉트 경로 지정
		String message = null; // 전달할 메세지 저장 변수
		
		if(result > 0) { // 성공 시
			path = "/";
			message = "회원 가입 성공!";
			
		} else { // 실패 시
			path = referer;
			message = "회원 가입 실패...";
			
			// 이전 페이지로 돌아갔을 때 입력했던 값을 같이 전달
			inputMember.setMemberPw(null); // 비밀번호 삭제
			ra.addFlashAttribute("tempMember", inputMember);
		}
		
		ra.addFlashAttribute("message", message);
		
		return "redirect:" + path;
	}
	
	// 아이디 중복 검사
	@GetMapping("/idDupCheck") // url
	@ResponseBody // 반환된 값을 jsp 경로가 아닌 값 자체로 인식
	public int idDupCheck(String memberId) {
		int result = service.idDupCheck(memberId);
		return result;
	}
	
	// 전화번호 중복 검사
	@GetMapping("/telDupCheck") // url
	@ResponseBody // 반환된 값을 jsp 경로가 아닌 값 자체로 인식
	public int telDupCheck(String memberTel) {
		int result = service.telDupCheck(memberTel);
		return result;
	}
	
	//  비밀번호 찾기 페이지 이동
	@GetMapping("/find")
	public String findPage() {
		return "/member/find";
	}
	
	// 회원 가입 휴대전화 인증
	@PostMapping("/signUp/phoneCheck")
	@ResponseBody
	public int phoneCheck(@RequestParam("toPhone") String toPhone,
			HttpSession session) {
		
		Message sendMsg = new Message();
		
		sendMsg.setFrom("01055888974");
		sendMsg.setTo(toPhone);
		
		int randomNumber = (int)((Math.random()*(9999-1000+1))+1000);
		sendMsg.setText("새싹이 회원가입 본인확인 인증번호[" + randomNumber + "]입니다. -타인 노출 금지-");
		
		this.messageService.sendOne(new SingleMessageSendingRequest(sendMsg));
		
		session.setAttribute("randomNumber", randomNumber);
		
		return 0;
		
	}
	
	@PostMapping("/signUp/confirmCheck")
	@ResponseBody
	public int confirmCheck(
			@RequestParam("phoneCheck") int phoneCheck,
			HttpSession session) {
		
		int confirmNo = (int)session.getAttribute("randomNumber");
		
		if (confirmNo == phoneCheck) {
			session.removeAttribute("randomNumber");
			
			return 1;
		}
		
		return 0;
		
	}
}