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
import edu.kh.project.common.Util;

@Service
public class BaordServiceImple implements BoardService{

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
		Pagination pagination = new Pagination(listCount, cp);
		
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
	public int QAWrite(Board board, List<MultipartFile> fileList, String webPath, String folderPath) throws IOException {

		board.setBoardContent(Util.XSSHandling(board.getBoardContent()));
		board.setBoardContent(Util.newLineHandling(board.getBoardContent()));
		
		int boardNo = dao.QAWrite(board);
		
		if(boardNo > 0) {
			List<BoardImg> boardImgList = new ArrayList<BoardImg>();
			List<String> imgChangeNameList = new ArrayList<String>();
			
			for(int i=0; i<fileList.size(); i++) {
				if(fileList.get(i).getSize() > 0) {
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
				if(!boardImgList.isEmpty()) {
					int result = dao.QAWriteImg(boardImgList);
					
					if(result == boardImgList.size()) {
						for(int j=0; j < boardImgList.size(); j++) {
							int index = boardImgList.get(j).getImgOrder();
							fileList.get(index).transferTo(new File(folderPath+imgChangeNameList.get(j)));						}
					}
				}
			}
		}
		return boardNo;
	}

	@Override
	public List<Board> selectFreeBoardDetail(int boardNo) {
		
		return dao.selectFreeBoardDetail(boardNo);
	}

	
	
}
