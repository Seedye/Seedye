package edu.kh.project.board.model.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import edu.kh.project.board.model.vo.Board;

public interface BoardService {

	
	/** 게시물 리스트 조회
	 * @param boardCode
	 * @param cp
	 * @return
	 */
	Map<String, Object> selectBoardList(int boardCode, int cp);

	/** 자유 게시물 리스트 조회
	 * @param boardCode
	 * @param cp
	 * @return
	 */
	Map<String, Object> selectFreeBoardList(int boardCode, int cp);

	/** 문의게시물 작성
	 * @param board
	 * @param fileList
	 * @param webPath
	 * @param folderPath
	 * @return
	 * @throws IOException 
	 */
	int QAWrite(Board board, List<MultipartFile> fileList, String webPath, String folderPath) throws IOException;

	/** 자유 게시판 상세조회
	 * @param boardNo
	 * @return
	 */
	List<Board> selectFreeBoardDetail(int boardNo);

	/** 문의 게시글 삭제
	 * @param boardNo
	 * @return
	 */
	int DeleteQABoard(int boardNo);

	/** 문의 게시글 수정
	 * @param boardNo
	 * @param board
	 * @param fileList 
	 * @param folderPath 
	 * @param webPath 
	 * @return
	 * @throws IOException 
	 */
//	int updateAQBoard(Board board, List<MultipartFile> fileList, String webPath, String folderPath) throws IOException;
	int updateAQBoard(Board board);

	/** 게시판 검색 목록 조회
	 * @param pm
	 * @param cp
	 * @return
	 */
	Map<String, Object> selectBoardList(Map<String, Object> pm, int cp);
	
	/** 게시판 검색 목록 조회
	 * @param pm
	 * @param cp
	 * @return
	 */
	Map<String, Object> selectFreeBoardList(Map<String, Object> pm, int cp);

	/** 자유 게시글 삭제
	 * @param boardNo
	 * @param board
	 * @return
	 */
	int freeBoardDelete(int boardNo);

	
	/** 게시글 카운트
	 * @param boardNo
	 * @return
	 */
	int updateReadCount(int boardNo);

	List<Board> selectBoardDetailImg(int boardNo); 
	

}
