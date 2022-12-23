package edu.kh.project.board.model.dao;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.project.board.model.vo.Board;
import edu.kh.project.board.model.vo.BoardImg;
import edu.kh.project.board.model.vo.Pagination;

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
	
	
	public List<Board> selectFreeBoardList(Pagination pagination, int boardCode) {
		
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

	
	
	
	
}
