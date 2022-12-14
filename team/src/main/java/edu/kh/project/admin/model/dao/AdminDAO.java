package edu.kh.project.admin.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.project.admin.model.vo.License;
import edu.kh.project.admin.model.vo.Store;
import edu.kh.project.admin.model.vo.StoreImage;
import edu.kh.project.board.model.vo.Board;
import edu.kh.project.board.model.vo.Comment;
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
	 * @param pagination 
	 * @return storeList
	 */
	public List<Store> selectStoreList(Pagination pagination) {
		

		int offset = ( pagination.getCurrentPage() -1 ) * pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("adminMapper.selectStoreList", null, rowBounds);
		
	}

	/** 회원 리스트 조회
	 * @param pagination 
	 * @return memberList
	 */
	public List<Member> selectMemberList(Pagination pagination) {
		
		int offset = ( pagination.getCurrentPage() -1 ) * pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
				
		return sqlSession.selectList("adminMapper.selectMemberList", null, rowBounds);
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
		
		// 사업자 등록증 이미지 조회
		String result = sqlSession.selectOne("adminMapper.selectLicense", memberNo);
		
		// 회원 정보 조회
		Member member = sqlSession.selectOne("adminMapper.selectMember", memberNo);
		
		// 사업자 등록증 경로 
		member.setLicensePath(result);
		
		return member;
	}

	/** 식당 selectBox 조회
	 * @param storeType
	 * @return storeList
	 */
	public List<Store> selectStoreList(String storeType, Pagination pagination) {
		
		int offset = ( pagination.getCurrentPage() -1 ) * pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("adminMapper.selectList", storeType, rowBounds);

	}

	/** 게시글 수정
	 * @param board
	 * @return
	 */
	public int boardUpdate(Board board) {
		
		return sqlSession.update("adminMapper.boardUpdate",board);
	}

	/** 게시글 작성(공지,업데이트)
	 * @param board
	 * @return result
	 */
	public int boardWrite(Board board) {
		
		int result = sqlSession.insert("adminMapper.boardWrite", board);
		
		return result;
	
	}
	/** 식당 신청 조회(검색 X)
	 * @param checkFl
	 * @param pagination 
	 * @return storeList
	 */
	public List<Store> selectEnroll(char checkFl, Pagination pagination) {
		
		int offset = ( pagination.getCurrentPage() -1 ) * pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("adminMapper.selectEnroll", checkFl, rowBounds);
	}

	/** 게시판 리스트 조회
	 * @param boardCode
	 * @param pagination 
	 * @return boardList
	 */
	public List<Board> selectAdminBoard(int boardCode, Pagination pagination) {
		

		int offset = ( pagination.getCurrentPage() -1 ) * pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("adminMapper.selectAdminBoard", boardCode, rowBounds);
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

	/** 회원 탈퇴
	 * @param memberNo
	 * @return
	 */
	public int deleteMember(int memberNo) {
		
		return sqlSession.update("adminMapper.memberDelete", memberNo);
	}

	/** 식당 이미지 조회
	 * @param storeNo
	 * @return storeList
	 */
	public List<StoreImage> selectStoreManageImg(int storeNo) {
		List<StoreImage> storeList = sqlSession.selectList("adminMapper.selectImageList", storeNo);
		
		
		return storeList;
	}

	/** 식당 정보 조회
	 * @param storeNo
	 * @return store
	 */
	public Store selectStoreManage(int storeNo) {
				
			Store store = sqlSession.selectOne("adminMapper.selectStoreManage", storeNo);
		
		
			return store;
	}
	/** 식당 등록 상태 조회
	 * @param storeNo
	 * @return 
	 */
	public char storeCheck(int storeNo) {
		return sqlSession.selectOne("adminMapper.storeCheck", storeNo);
	}

	/** 식당 조회 클릭시 미확인-> 협의중 변경
	 * @param storeNo
	 */
	public void storeChange(int storeNo) {
		sqlSession.update("adminMapper.storeChange", storeNo);
	}

	
	
	/** 식당 등록 승인
	 * @param storeNo
	 * @return result
	 */
	public int registerStore(int storeNo) {
		return sqlSession.update("adminMapper.registerStore", storeNo);
	}

	/** 식당 전체 수
	 * @return
	 */
	public int selectCount() {
		return sqlSession.selectOne("adminMapper.selectCount");
	}

	public int memberListCount() {
		return sqlSession.selectOne("adminMapper.memberListCount");
	}

	
	
	/** 식당타입 리스트 수 
	 * @param storeType
	 * @return typeList
	 */
	public int typeList(String storeType) {
		return sqlSession.selectOne("adminMapper.typeList", storeType);
	}

	public int searchStoreListCount(Map<String, Object> searchMap) {
		return sqlSession.selectOne("adminMapper.searchStoreListCount", searchMap);
	}

	public List<Store> searchStoreList(Map<String, Object> searchMap, Pagination pagination) {
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("adminMapper.searchStoreList", searchMap, rowBounds);
	}

	public int searchStoreListCount_search(Map<String, Object> selectMap) {
		return sqlSession.selectOne("adminMapper.searchStoreListCount_search", selectMap);
	}

	public List<Store> selectStoreList_search(Map<String, Object> selectMap, Pagination pagination) {
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("adminMapper.selectStoreList_search", selectMap, rowBounds);
	}

	/** 검색으로 회원 목록 조회
	 * @param searchKey
	 * @return
	 */
	public int searchKey(Map<String, Object> searchKey) {
	
		return sqlSession.selectOne("adminMapper.searchKey", searchKey);
	}

	/** 검색으로 회원 조회  List로 가져오기
	 * @param searchKey
	 * @param pagination
	 * @return
	 */
	public List<Member> searchKey(Map<String, Object> searchMap, Pagination pagination) {
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("adminMapper.searchKeyList", searchMap, rowBounds);
	}

	/** 식당 등록 취소
	 * @param storeNo
	 * @return result
	 */
	public int storeReturn(int storeNo) {
		return sqlSession.update("adminMapper.storeReturn", storeNo);
	}

	/** 게시판 관리 총 리스트 수 
	 * @param boardCode
	 * @return listCount
	 */
	public int selectAdminBoardCount(int boardCode) {
		
		return sqlSession.selectOne("adminMapper.selectAdminBoardCount", boardCode);
	}

	/** 게시판 관리 검색 리스트 수 
	 * @param boardMap
	 * @return listCount
	 */
	public int selectAdminBoard_searchCount(Map<String, Object> boardMap) {
		return sqlSession.selectOne("adminMapper.selectAdminBoard_searchCount", boardMap);
	}

	/** 게시판 관리 검색 
	 * @param boardMap
	 * @param pagination
	 * @return boardList
	 */
	public List<Board> selectAdminBoard_search(Map<String, Object> boardMap, Pagination pagination) {

		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("adminMapper.selectAdminBoard_search", boardMap, rowBounds);
	}

	/** 검색 결과 없을 때 신청한 식당 수 조회
	 * @param checkFl
	 * @return listCount
	 */
	public int selectEnrollCount(char checkFl) {
		return sqlSession.selectOne("adminMapper.selectEnrollCount", checkFl);
	}

	public int selectEnrollCount_search(Map<String, Object> enrollMap) {
		return sqlSession.selectOne("adminMapper.selectEnrollCount_search", enrollMap);
	}

	public List<Store> selectEnroll_search(Map<String, Object> enrollMap, Pagination pagination) {
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("adminMapper.selectEnroll_search", enrollMap, rowBounds);
	}

	public List<Board> selectFreeBoard(int boardNo) {
		return sqlSession.selectList("adminMapper.selectFreeBoard", boardNo);
	}

	public List<Comment> selectFreeBoard_comment(int boardNo) {
		return sqlSession.selectList("adminMapper.selectFreeBoard_comment", boardNo);
	}

	public int deleteFreeBoard(int boardNo) {
		return sqlSession.update("adminMapper.deleteFreeBoard", boardNo);
	}



	public int updateStore(Map<String, Object> paramMap, int storeNo) {
		
		paramMap.put("storeNo", storeNo);
		
		
		return sqlSession.update("adminMapper.updateStore", paramMap);
		
	}







	


	

}
