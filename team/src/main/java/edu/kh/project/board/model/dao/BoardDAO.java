package edu.kh.project.board.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.project.board.model.vo.Board;
import edu.kh.project.board.model.vo.BoardImg;
import edu.kh.project.board.model.vo.Pagination;
import edu.kh.project.common.Pagination2;

@Repository
public class BoardDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	

	/** 게시글 수 조회
	 * @param boardCode
	 * @return
	 */
	public int getListCount(int boardCode) {

		return sqlSession.selectOne("boardMapper.getListCount", boardCode);
	}

	/** 게시글 목록조회
	 * @param pagination
	 * @param boardCode
	 * @return
	 */
	public List<Board> selectBoardList(Pagination pagination, int boardCode) {
		
		int offset = (pagination.getCurrentPage() -1 )*pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("boardMapper.selectBoardList", boardCode, rowBounds);
	}
	
	
	/** 자유 게시글 목록 조회
	 * @param pagination
	 * @param pm
	 * @return
	 */
	public List<Board> selectFreeBoardList(Pagination2 pagination, int boardCode) {
		
		int offset = (pagination.getCurrentPage() -1 )*pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("boardMapper.selectFreeBoardList", boardCode, rowBounds);
	}

	/** 문의 게시물 작성
	 * @param board
	 * @return
	 */
	public int QAWrite(Board board) {
		
		int result = sqlSession.insert("boardMapper.QAWrite", board);
		if(result > 0) result = board.getBoardNo();
		return result;
	}

	/** 문의 게시판 게시물작성 이미지 삽입
	 * @param boardImgList
	 * @return
	 */
	public int QAWriteImg(List<BoardImg> boardImgList) {
		return sqlSession.insert("boardMapper.QAWriteImg",boardImgList);
	}

	
	/** 자유 게시판 상세조회
	 * @param boardNo
	 * @return
	 */
	public List<Board> selectFreeBoardDetail(int boardNo) {
		
		return sqlSession.selectList("boardMapper.selectFreeBoardDetail", boardNo);
	}

	/** 문의 게시글 삭제
	 * @param boardNo
	 * @return
	 */
	public int DeleteQABoard(int boardNo) {
		
		int result= sqlSession.update("boardMapper.DeleteQABoard", boardNo);
		
		System.out.println(result);
		return result;
	}

	/**문의 게시글 수정
	 * @param board
	 * @param boardNo 
	 * @return
	 */
	public int updateAQBoard(Board board) {
		return sqlSession.update("boardMapper.updateAQBoard", board);
	}

	/** 게시글 검색 조건 일치 게시글 수 조회
	 * @param pm
	 * @return listCount
	 */
	public int getListCount(Map<String, Object> pm) {
		return sqlSession.selectOne("boardMapper.getListCount_search", pm);
	}

	/** 게시글 : 검색 조건 일치 게시글 목록 조회
	 * @param pagination
	 * @param pm
	 * @return boardList
	 */
	public List<Board> selectBoardList(Pagination pagination, Map<String, Object> pm) {
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		return sqlSession.selectList("boardMapper.selectBoardList_search", pm, rowBounds);
	}

	public int freeBoardDelete(int boardNo) {
		
		int result= sqlSession.update("boardMapper.freeBoardDelete", boardNo);
		
		System.out.println(result);
		return result;
	}
	

	public List<Board> selectFreeBoardList(Pagination pagination, Map<String, Object> pm) {
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit2();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit2());
		return sqlSession.selectList("boardMapper.selectFreeBoardList_search", pm, rowBounds);
	}

	public int updateReadCount(int boardNo) {
		return sqlSession.update("boardMapper.updateReadcount", boardNo);
	}

	
	
	
	
}
