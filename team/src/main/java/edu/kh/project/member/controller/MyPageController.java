package edu.kh.project.member.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.project.member.model.service.MyPageService;
import edu.kh.project.member.model.vo.Member;

@SessionAttributes("loginMember") // 탈퇴 성공 시 로그아웃에 사용

@Controller
public class MyPageController {
	
	@Autowired
	private MyPageService service;
	
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
		
		System.out.println(inputMember);
		System.out.println(paramMap.get("newPw"));
		System.out.println(paramMap.get("newPw") == null);
		System.out.println(paramMap.get("newPw") == "");
//		System.out.println(paramMap.get("memberId"));
		
		
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
				message = "회원 정보 수정 실패...";
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
	
	
	
	
	
	
	
}
