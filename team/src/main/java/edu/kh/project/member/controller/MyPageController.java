package edu.kh.project.member.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.project.member.model.service.MyPageService;
import edu.kh.project.member.model.vo.Member;
import net.nurigo.java_sdk.Coolsms;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;

@SessionAttributes("loginMember") // 탈퇴 성공 시 로그아웃에 사용

@Controller
public class MyPageController {
	
	@Autowired
	private MyPageService service;
	
	// coolsms 사용시 필요
	final DefaultMessageService messageService;
	   
	// coolsms 사용시 필요
    public MyPageController() {
      this.messageService = NurigoApp.INSTANCE.initialize("NCSGKH1S9GUXAXCF", "ZOGVLRXYFLYRSETGK5QLDPKFKN1U0NC6", "https://api.coolsms.co.kr");
    } 
	
	// 내 정보 페이지 이동
	@GetMapping("/info")
	public String info() {
		return "member/myPage-info";
	}
	

	// 내 정보 수정
	@PostMapping("/info")
	public String updateInfo(Member inputMember, String[] memberAddress,
			@SessionAttribute("loginMember") Member loginMember,
			@RequestParam Map<String, Object> paramMap,
			RedirectAttributes ra) {
		
		inputMember.setMemberNo(loginMember.getMemberNo());
		
		// loginMember에서 회원 번호를 얻어와 paramMap에 추가
		paramMap.put("memberNo", loginMember.getMemberNo());
		
		if(inputMember.getMemberAddress().equals(",,") ) {
			inputMember.setMemberAddress(null);
		} else {
			String address = String.join(",,", memberAddress);
			inputMember.setMemberAddress(address);
		}

				
		String message = null;
		
		if(paramMap.get("newPw") == "") {
			
			// 회원 정보 수정 서비스 호출 결과 반환 받기
			int result = service.updateInfo(inputMember);
			
			if (result > 0) {
				message = "회원 정보가 수정되었습니다.";
				
				// DB - session 동기화 작업
				loginMember.setMemberId(inputMember.getMemberId());
				loginMember.setMemberTel(inputMember.getMemberTel());
				loginMember.setMemberAddress(inputMember.getMemberAddress());
				
				
			} else {
				message = "회원 정보 수정 실패...";
			}
			
		} else {
			
			// 비밀번호를 입력 했을때 정보와 비밀번호 변경하기
			int allResult = service.updateAllInfo(inputMember, paramMap);
			
			if(allResult > 1) {
				message = "회원 정보와 비밀번호가 수정되었습니다.";
				
				// DB - session 동기화 작업
				loginMember.setMemberId(inputMember.getMemberId());
				loginMember.setMemberTel(inputMember.getMemberTel());
				loginMember.setMemberAddress(inputMember.getMemberAddress());
			} else {
				message = "현재 비밀번호가 일치하지 않습니다.";
			}
			
		}
		
	
		
		ra.addFlashAttribute("message", message);
		
		return "redirect:info"; // 내 정보 재요청
	}
	
	
	// 회원 탈퇴 페이지 이동
	@GetMapping("/delete")
	public String memberDelete() {
		return "member/myPage-delete";
	}
	
	// 회원 탈퇴
//	@PostMapping("/delete")
//	public String memberDelete(
//			@SessionAttribute("loginMember") Member loginMember,
//			String memberPw,
//			SessionStatus status,
//			RedirectAttributes ra
//			) {
//		
//		int result = service.memberDelete(loginMember.getMemberNo(), memberPw);
//		
//		String message = null;
//		
//		String path = null;
//		
//		if(result > 0) {
//			
//			message = "탈퇴 되었습니다.";
//			
//			path = "/"; // 메인 페이지로 이동
//			
//			status.setComplete(); // 로그아웃 코드 추가
//		} else {
//			message = "비밀번호가 일치하지 않습니다.";
//			
//			path = "delete"; // 탈퇴 페이지로 이동
//		}
//		
//		ra.addFlashAttribute("message", message);
//		
//		return "redirect:" + path;
//		
//	}
	
	@PostMapping("/info/confirmTel")
	@ResponseBody
	public int confirmTel(
			@RequestParam("toPhone") String toPhone) {
		
	  Message sendMsg = new Message();
	      
      sendMsg.setFrom("01055888974");
      sendMsg.setTo(toPhone);
      
      int randomNumber = (int)((Math.random()*(9999-1000+1))+1000);
      sendMsg.setText("새싹이 본인확인 인증번호[" + randomNumber + "]입니다. -타인 노출 금지-");
      
      this.messageService.sendOne(new SingleMessageSendingRequest(sendMsg));
      
      return randomNumber;
	}
	
	// 아이디 비밀번호 찾기 화면에서 인증 완료 시 휴대폰 번호로 맴버 조회
	@PostMapping("/find/findConfirm")
	@ResponseBody
	public String findConfirm(
			@RequestParam("toPhone") String toPhone,
			HttpSession session
			) {
		
		// 전달 받은 전화번호로 회원 조회
		String selectPhoneMemberId = service.selectPhoneMemberId(toPhone);
		
//		Message sendMsg = new Message();
//		
//		sendMsg.setFrom("01055888974");
//		sendMsg.setTo(toPhone);
//		
//		int randomNumber = (int)((Math.random()*(9999-1000+1))+1000);
//		sendMsg.setText("새싹이 본인확인 인증번호[" + randomNumber + "]입니다. -타인 노출 금지-");
//		
//		this.messageService.sendOne(new SingleMessageSendingRequest(sendMsg));
//		
//		session.setAttribute("randomNumber", randomNumber);
		
		return selectPhoneMemberId;
	}
	
	@PostMapping("/find/confirmCheck")
	@ResponseBody
	public int confirmCheck(
			@RequestParam("inputConfirmNo") int inputConfirmNo,
			HttpSession session) {
		
//		int confirmNo = (int)session.getAttribute("randomNumber");
//		
//		if (confirmNo == inputConfirmNo) {
//			session.removeAttribute("randomNumber");
//			
//			return 1;
//		}
//		
//		return 0;
		
		return 1;
		
	}
	
	// 아이디 / 비밀번호 찾기 페이지에서 비밀번호 변경
	@PostMapping("/find")
	public String pwChange(Member inputContent,
			RedirectAttributes ra,
			@RequestHeader("referer") String referer) {
		
		int result = service.pwChange(inputContent);
		
		String path = null;
		String message = null;
		
		if (result > 0) {
			
			path = "/login";
			message = "비밀번호 변경이 완료되었습니다.";
			
		} else {
			
			path = referer;
			message = "비밀번호 변경이 실패했습니다.";
			
		}
		
		ra.addFlashAttribute("message", message);
		
		return "redirect:" + path;
	}
	
}
