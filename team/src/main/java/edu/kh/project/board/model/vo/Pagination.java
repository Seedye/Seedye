package edu.kh.project.board.model.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Pagination {

	private int currentPage; // 현재 페이지 번호
	private int listCount; // 전체 게시글 수 
	private int limit = 10; // 한 페이지 목록 보여지는 게시글 수 
	private int pageSize = 10; // 보여질 페이지 번호 개수
	
	private int maxPage;	// 마지막 페이지 번호
	private int startPage;	// 보여지는 맨 앞 페이지 번호
	private int endPage;	// 보여지는 맨 뒤 페이지 번호
	
	private int prevPage; 	// 이전 페이지의 페이지 번호 맨 끝
	private int nextPage;	// 다음 페이지의 페이지 번호 맨 앞
	
	public Pagination(int listCount, int currentPage) {
		this.listCount = listCount;
		this.currentPage = currentPage;
		
		makePagination();
	}
	public Pagination(int listCount, int currentPage, int limit, int pageSize) {
		this.listCount = listCount;
		this.currentPage = currentPage;
		this.limit = limit;
		this.pageSize = pageSize;
		
		makePagination();
	}
	
	private void makePagination() {
		// 마지막 페이지 번호 구하기 = (전체 게시글 수)/(한페이지에 보여지는 게시글 수[10])
		maxPage = (int)Math.ceil((double)listCount / limit);
		
		// 목록 제일앞 보여지는 페이지 번호 =
		// (현재 페이지 번호-1) / 보여질 페이지 번호 개수[10]*보여질 페이지 번호 개수[10]+1
		startPage = (currentPage-1)/pageSize * pageSize +1;
		
		// 보여지는 맨뒤 체이지 번호 = 
		// (목록 제일앞 보여지는 페이지 번호) + (보여질 페이지 번호 개수[10])-1
		endPage = startPage + pageSize -1;
		
		// 계산된 endPage가 전체 페이지네이션 목록 수(maxPage)를 초과하는 경우
		if(endPage > maxPage) {
			endPage = maxPage;
		}
		if(currentPage <=10) prevPage = 1;
		else prevPage = startPage -1;
		if(endPage == maxPage) nextPage = maxPage;
		else nextPage = endPage +1;
		
	}
}
