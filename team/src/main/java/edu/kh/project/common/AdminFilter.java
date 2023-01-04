package edu.kh.project.common;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import edu.kh.project.member.model.vo.Member;

// 관리자가 아니면 사용할 수 없는 기능 제한
@WebFilter(filterName = "adminFilter",
urlPatterns = {"/admin/*"}) // 필터링한 요청 주소(패턴 가능))
public class AdminFilter extends HttpFilter implements Filter{
	


	@Override
	public void init(FilterConfig fConfig) throws ServletException {
	}

	@Override
	public void destroy() {
		
		
	}
	
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		
		// 로그인 상태를 검사하는 방법
		// == session에 loginMember가 null이 아닌지 검사
		
		// Session 객체는 HttpServletRequest에서만 얻어올 수 있다
		// ->다운캐스팅 필요
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse resp = (HttpServletResponse) response;
		
		HttpSession session = req.getSession();
		
		if(session.getAttribute("loginMember") == null) { // 로그인	X
			session.setAttribute("message", "관리자 로그인시 이용 가능합니다.");
			resp.sendRedirect("/"); // 메인페이지로 리다이렉트
			
		}else { // 로그인 O
			
			if(((Member)session.getAttribute("loginMember")).getAuthority() == 1) { // 일반 회원
				session.setAttribute("message", "관리자만 이용할 수 있는 기능입니다");
				resp.sendRedirect("/");
			} else if(((Member)session.getAttribute("loginMember")).getAuthority() == 3) { 
				// 업주 회원
				
				session.setAttribute("message", "관리자만 이용할 수 있는 기능입니다");
				resp.sendRedirect("/");
			}else {
				chain.doFilter(request, response);
			}
			
		}
		
		
		

	}

}
