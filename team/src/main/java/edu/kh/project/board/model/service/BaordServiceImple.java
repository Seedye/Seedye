package edu.kh.project.board.model.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.project.board.model.dao.BoardDAO;
import edu.kh.project.board.model.vo.Board;
import edu.kh.project.board.model.vo.Pagination;
import edu.kh.project.board.model.vo.BoardImg;
import edu.kh.project.common.Pagination2;
import edu.kh.project.common.Util;

@Service
public class BaordServiceImple implements BoardService {

	@Autowired
	private BoardDAO dao;

	
	// 게시물 리스트 조회
	@Override
	public Map<String, Object> selectBoardList(int boardCode, int cp) {

		// 특정 게시판 전체 게시글 수 조회
		int listCount = dao.getListCount(boardCode);

		// 페이징 처리 위해
		Pagination pagination = new Pagination(listCount, cp);

		// 게시글 목록조회
		List<Board> boardList = dao.selectBoardList(pagination, boardCode);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("pagination", pagination);
		map.put("boardList", boardList);

		return map;
	}

	// 자유 게시글 리스트 조회
	@Override
	public Map<String, Object> selectFreeBoardList(int boardCode, int cp) {

		// 특정 게시판 전체 게시글 수 조회
		int listCount = dao.getListCount(boardCode);

		// 페이징 처리 위해
		Pagination2 pagination = new Pagination2(listCount, cp);

		// 게시글 목록조회
		List<Board> freeBoardList = dao.selectFreeBoardList(pagination, boardCode);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("pagination", pagination);
		map.put("freeBoardList", freeBoardList);

		return map;
	}

	// 문의 게시물 작성
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int QAWrite(Board board, List<MultipartFile> fileList, String webPath, String folderPath)
			throws IOException {

//		board.setBoardTitle(Util.XSSHandling(board.getBoardTitle()));
//		board.setBoardContent(Util.XSSHandling(board.getBoardContent()));
		
		
//		board.setBoardTitle(Util.newLineHandling(board.setBoardTitle()));
//		board.setBoardContent(Util.newLineHandling(board.getBoardContent()));

		int boardNo = dao.QAWrite(board);

		if (boardNo > 0) {
			List<BoardImg> boardImgList = new ArrayList<BoardImg>();
			List<String> imgChangeNameList = new ArrayList<String>();

			for (int i = 0; i < fileList.size(); i++) {
				if (fileList.get(i).getSize() > 0) {
					BoardImg img = new BoardImg();
					img.setImgPath(webPath);

					String reName = Util.fileRename(fileList.get(i).getOriginalFilename());
					System.out.println(reName);
					img.setImgRename(reName);
					imgChangeNameList.add(reName);

					img.setImgOriginal(fileList.get(i).getOriginalFilename());
					img.setBoardNo(boardNo);
					img.setImgOrder(i);

					boardImgList.add(img);
				}
			}
			if (!boardImgList.isEmpty()) {
				int result = dao.QAWriteImg(boardImgList);

				if (result == boardImgList.size()) {
					for (int i = 0; i < boardImgList.size(); i++) {
						int index = boardImgList.get(i).getImgOrder();
						fileList.get(index).transferTo(new File(folderPath + imgChangeNameList.get(i)));
					}
				}
			}
		}
		return boardNo;
	}

	// 자유 게시판 상세조회
	@Override
	public List<Board> selectFreeBoardDetail(int boardNo) {
		
		return dao.selectFreeBoardDetail(boardNo);
	}

	
	// 문의 게시글 삭제
	@Override
	public int DeleteQABoard(int boardNo) {
		return dao.DeleteQABoard(boardNo);
	}

	// 문의 게시글 수정	
//	@Override
//	public int updateAQBoard(Board board, List<MultipartFile> fileList, String webPath, String folderPath) throws IOException  {
//		board.setBoardContent(Util.XSSHandling(board.getBoardContent()));
//		board.setBoardContent(Util.newLineHandling(board.getBoardContent()));
//		
//		
//		int boardNo = dao.updateAQBoard(board);
//
//		if (boardNo > 0) {
//			List<BoardImg> boardImgList = new ArrayList<BoardImg>();
//			List<String> imgChangeNameList = new ArrayList<String>();
//
//			for (int i = 0; i < fileList.size(); i++) {
//				if (fileList.get(i).getSize() > 0) {
//					BoardImg img = new BoardImg();
//					img.setImgPath(webPath);
//
//					String reName = Util.fileRename(fileList.get(i).getOriginalFilename());
//					System.out.println(reName);
//					img.setImgRename(reName);
//					imgChangeNameList.add(reName);
//
//					img.setImgOriginal(fileList.get(i).getOriginalFilename());
//					img.setBoardNo(boardNo);
//					img.setImgOrder(i);
//
//					boardImgList.add(img);
//				}
//			}
//			if (!boardImgList.isEmpty()) {
//				int result = dao.QAWriteImg(boardImgList);
//
//				if (result == boardImgList.size()) {
//					for (int i = 0; i < boardImgList.size(); i++) {
//						int index = boardImgList.get(i).getImgOrder();
//						fileList.get(index).transferTo(new File(folderPath + imgChangeNameList.get(i)));
//					}
//				}
//			}
//		}
////		int boardNo = dao.QAWrite(board);
//		return boardNo;
//	}
	@Override
	public int updateAQBoard(Board board) {
		
		board.setBoardContent(Util.XSSHandling(board.getBoardContent()));
		board.setBoardContent(Util.newLineHandling(board.getBoardContent()));
		
//		int boardNo = dao.QAWrite(board);
		return dao.updateAQBoard(board);
	}


	//게시판 검색 목록 조회
	@Override
	public Map<String, Object> selectBoardList(Map<String, Object> pm, int cp) {
		
		// 1. 검색 조건 일치하는 전체 게시글 수 조회
		int listCount = dao.getListCount(pm);
		
		// 2. 검색 조건 일치 게시글 수 + cp(현재 페이지) 이용해 페이징 처리 객체 생성
		Pagination pagination = new Pagination(listCount, cp);
		
		// 3. 페이징 처리 객체 이용헤 검색 조건 일치 게시글 목록 조회
		List<Board> boardList = dao.selectBoardList(pagination, pm);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("pagination", pagination);
		map.put("boardList", boardList);
		
		return map;
	}

	// 자유 게시글 삭제
	@Override
	public int freeBoardDelete(int boardNo) {
		return dao.freeBoardDelete(boardNo);
	}

	@Override
	public Map<String, Object> selectFreeBoardList(Map<String, Object> pm, int cp) {

		// 1. 검색 조건 일치하는 전체 게시글 수 조회
				int listCount = dao.getListCount(pm);
				
				// 2. 검색 조건 일치 게시글 수 + cp(현재 페이지) 이용해 페이징 처리 객체 생성
				Pagination pagination = new Pagination(listCount, cp);
				
				// 3. 페이징 처리 객체 이용헤 검색 조건 일치 게시글 목록 조회
				List<Board> freeBoardList = dao.selectFreeBoardList(pagination, pm);
				
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("pagination", pagination);
				map.put("freeBoardList", freeBoardList);
				
				return map;
	}

	// 조회수 카운트
	@Override
	public int updateReadCount(int boardNo) {
		return dao.updateReadCount(boardNo);
	}

	@Override
	public List<Board> selectBoardDetailImg(int boardNo) {
		// TODO Auto-generated method stub
		return null;
	}


}
