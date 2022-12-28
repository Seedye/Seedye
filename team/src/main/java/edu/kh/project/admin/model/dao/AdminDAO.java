package edu.kh.project.admin.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.project.admin.model.vo.License;
import edu.kh.project.admin.model.vo.Store;
import edu.kh.project.admin.model.vo.StoreImage;
import edu.kh.project.board.model.vo.Board;
import edu.kh.project.common.Pagination;
import edu.kh.project.member.model.vo.Member;

@Repository
public class AdminDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	/** 게시글 수 조회
	 * @param boardCode
	 * @return
	 */
	public int getListCount(int boardCode) {
		
		return sqlSession.selectOne("adminMapper.getListCount", boardCode);
	}

	public int getListCount(Map<String, Object> pm) {
	
		return sqlSession.selectOne("adminMapper.getListCount", pm);
	}

	/** 특정 게시판 목록 조회
	 * @param pagination
	 * @param boardCode
	 * @return boardList
	 */
	public List<Board> seleceBoardList(Pagination pagination, int boardCode) {
		
		int offset = (pagination.getCurrentPage()-1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("adminMapper.selectBoardList", boardCode, rowBounds);
	}

	public List<Board> selectBoardList(Pagination pagination, Map<String, Object> pm) {
		
		int offset = (pagination.getCurrentPage()-1) * pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("adminMapper.selectBoardList_search",pm, rowBounds);
	}

	public Board selectBoardDetail(int boardNo) {
	
		return sqlSession.selectOne("adminMapper.selectBoardDetail", boardNo);
	}

	/** 게시글 삭제
	 * @param boardNo
	 * @return
	 */
	public int boardDelete(int boardNo) {
		
		return sqlSession.update("adminMapper.boardDelete",boardNo);
	}

	
	
	/** 식당 리스트 조회
	 * @return storeList
	 */
	public List<Store> selectStoreList() {
		return sqlSession.selectList("adminMapper.selectStoreList");

	}

	/** 회원 리스트 조회
	 * @return memberList
	 */
	public List<Member> selectMemberList() {
		
		return sqlSession.selectList("adminMapper.selectMemberList");
	}

	/** 회원 등급 수정
	 * @param memberNo
	 * @return
	 */
	public int updateInfo(int memberNo) {
		
		return sqlSession.update("adminMapper.updateInfo", memberNo);
	}

	/** 회원 관리 화면 조회
	 * @param memberNo
	 * @return member
	 */
	public Member selectMember(int memberNo) {
		return sqlSession.selectOne("adminMapper.selectMember", memberNo);
	}

	/** 식당 selectBox 조회
	 * @param storeType
	 * @return storeList
	 */
	public List<Store> selectStoreList(String storeType) {
		return sqlSession.selectList("adminMapper.selectType", storeType);
	}

	/** 식당 신청 조회
	 * @param checkFl
	 * @return storeList
	 */
	public List<Store> selectEnroll(char checkFl) {
		return sqlSession.selectList("adminMapper.selectEnroll", checkFl);
	}

	/** 공지사항 조회
	 * @param boardCode
	 * @return boardList
	 */
	public List<Board> selectBoardNotice(int boardCode) {
		return sqlSession.selectList("adminMapper.selectBoardNotice", boardCode);
	}

	/** 식당 정보 먼저 등록
	 * @param store
	 * @return result
	 */
	public int register(Store store) {
		int result = sqlSession.insert("adminMapper.register", store);
		
		if(result > 0) {
			
			// 이미지 등록을 위해 storeNo 세팅
			result = store.getStoreNo();
		} 
		return result;
	}

	

	/** 사업자 등록증 등록
	 * @param license
	 * @return result
	 */
	public int insertLicense(License license) {
		return sqlSession.insert("adminMapper.insertLicense", license);
	}

	

	/** 가맹점 이미지 등록
	 * @param storeImageList
	 * @return result
	 */
	public int insertStoreImageList(List<StoreImage> storeImageList) {
		return sqlSession.insert("adminMapper.insertStoreImageList", storeImageList);
	}

	


	

}
