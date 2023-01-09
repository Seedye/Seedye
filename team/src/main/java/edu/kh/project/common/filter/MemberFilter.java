package edu.kh.project.common.filter;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

// 필터 등록
@WebFilter(filterName = "memberFilter", // 필터 이름, 필터가 여러개 존재할 때 순서 지정
			urlPatterns = {"/find", "/signUp", "/login"}) // 필터링한 요청 주소(패턴 가능)
public class MemberFilter implements Filter {

    public void init(FilterConfig fConfig) throws ServletException {
    	// 필터 생성 시 수행
    	System.out.println("멤버 필터 생성");
    }
    
	public void destroy() {
		// 서버 실행 중 필터 내용 변경 시 수행 후 init() 다시 수행
		System.out.println("로그인 필터 파괴");
	}
	
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		// 필터는 클라이언트의 요청이 되자마자
		// 또는 응답이 되기 직전에 필터링 코드를 추가할 수 있는 기능
		
		// 다운캐스팅 진행
		HttpServletRequest req = (HttpServletRequest)request;
		HttpServletResponse resp = (HttpServletResponse)response;
		
		// 로그인 여부 확인
		// -> session에 loginMember가 있는지 확인
		HttpSession session = req.getSession(); // 세션 객체 얻어오기
		
		if(session.getAttribute("loginMember") != null) { // 세션에서 loginMember라는 값을 얻어오겠다.
			resp.sendRedirect("/"); // 메인페이지로 리다이렉트
			
		} else { // 로그인 X
			
			// 연결된 다음 필터로 이동(없으면 Servlet / JSP로 이동)
			chain.doFilter(request, response);
			}
	}


}
