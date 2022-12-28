package edu.kh.project.admin.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import edu.kh.project.admin.model.vo.License;
import edu.kh.project.admin.model.vo.Store;
import edu.kh.project.board.model.vo.Board;
import edu.kh.project.member.model.vo.Member;

public interface AdminService {

	
	/** 특정 게시판 목록 조회 + 페이징 처리
	 * @param boardCode
	 * @param cp
	 * @return map
	 */
	Map<String, Object> selectBoardList(int boardCode, int cp);
	
	

	/** 검색 조건이 일치하는 게시글 수 조회
	 * @param pm
	 * @param cp
	 * @return
	 */
	Map<String, Object> selectBoardList(Map<String, Object> pm, int cp);


	Board selectBoardDetail(int boardNo);

	/** 식당 목록 조회
	 * @return storeList
	 */
	List<Store> selectStoreList();


	int boardDelete(int boardNo);


	List<Member> selectMemberList();



	/** 회원 등급 수정
	 * @param memberNo
	 * @return
	 */
	int updateInfo(int memberNo);



	/** 회원 관리 화면
	 * @param memberNo
	 * @return member
	 */
	Member selectMember(int memberNo);



	/** selectBox 조회
	 * @param storeType
	 * @return storeList
	 */
	List<Store> selectStoreList(String storeType);



	/** 게시글 수정
	 * @param board
	 * @return
	 * @throws Exception
	 */
	int boardUpdate(Board board) throws Exception;



	/** 게시글 삽입(공지,업데이트)
	 * @param board
	 * @return
	 */
	int boardWrite(Board board);
	/** 식당 신청조회
	 * @param checkFl
	 * @return storeList
	 */
	List<Store> selectEnroll(char checkFl);



	/** 공지사항 조회
	 * @param boardCode
	 * @return boardList
	 */
	List<Board> selectBoardNotice(int boardCode);



	int register(Store store, License license, List<MultipartFile> imageList, MultipartFile licenseImg,
			String webPath, String webPath2, String folderPath, String folderPath2) throws Exception;





	
	

}
