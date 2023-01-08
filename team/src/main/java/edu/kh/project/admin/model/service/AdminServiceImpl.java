package edu.kh.project.admin.model.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


import edu.kh.project.admin.model.dao.AdminDAO;
import edu.kh.project.admin.model.vo.License;
import edu.kh.project.admin.model.vo.Store;
import edu.kh.project.admin.model.vo.StoreImage;
import edu.kh.project.board.model.vo.Board;
import edu.kh.project.common.Pagination;
import edu.kh.project.common.Util;
import edu.kh.project.member.model.vo.Member;


@Service
public class AdminServiceImpl implements AdminService{

	@Autowired
	private AdminDAO dao;

	/**
	 * 특정 게시판 목록 조회 및 페이징 처리
	 */
	@Override
	public Map<String, Object> selectBoardList(int boardCode, int cp) {
	
		int listCount = dao.getListCount(boardCode);
		
		Pagination pagination = new Pagination(listCount, cp);
		
		List<Board> boardList = dao.seleceBoardList(pagination, boardCode);
		
		Map<String, Object>map = new HashMap<String, Object>();
		map.put("pagination", pagination);
		map.put("boardList", boardList);
		
		
		return map;
	}

	/**
	 * 검색 조건이 일치하는 게시글 수 조회
	 */
	@Override
	public Map<String, Object> selectBoardList(Map<String, Object> pm, int cp) {
		
		int listCount = dao.getListCount(pm);
		
		Pagination pagination = new Pagination(listCount, cp);
		
		List<Board> boardList = dao.selectBoardList(pagination, pm);
		
		Map<String, Object>map = new HashMap<String, Object>();
		map.put("pagination", pagination);
		map.put("boardList", boardList);
		
	
		return map;
	}

	@Override
	public Board selectBoardDetail(int boardNo) {
		
		return dao.selectBoardDetail(boardNo);
	}

	/**
	 *게시글 삭제
	 */
	@Override
	public int boardDelete(int boardNo) {
		
		return dao.boardDelete(boardNo);
	}

	
	// 식당 목록 조회
	@Override
	public Map<String, Object> selectStoreList(int cp) {
		
		int listCount = dao.selectCount();
		
		Pagination pagination = new Pagination(listCount, cp);
		
		List<Store> storeList = dao.selectStoreList(pagination);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("pagination", pagination);
		map.put("storeList", storeList);
		
		return map;
				
		
	}

	/**
	 * 회원 목록 조회
	 */
	@Override
	public Map<String, Object> selectMemberList(int cp) {
		
		int listCount = dao.memberListCount();
		
		
		Pagination pagination = new Pagination(listCount, cp);
		
		
		List<Member> memberList= dao.selectMemberList(pagination);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("pagination", pagination);
		map.put("memberList", memberList);
		
		return map;
	}

	/**
	 * 회원 등급 수정
	 */
	@Override
	public int updateInfo(int memberNo) {
		
		return dao.updateInfo(memberNo);
	}

	
	// 회원 관리 화면 
	@Override
	public Member selectMember(int memberNo) {
		return dao.selectMember(memberNo);
	}

	// 식당 selectBox 조회
	@Override
	public Map<String, Object> selectStoreList(String storeType, int cp) {
		
		int typeList = dao.typeList(storeType);
		
		Pagination pagination = new Pagination(typeList, cp);
		
		List<Store> storeTypeList = dao.selectStoreList(storeType, pagination);
		
		Map<String, Object> typeMap = new HashMap<String, Object>();
		
		typeMap.put("storeTypeList", storeTypeList);
		typeMap.put("pagination", pagination);
		
		System.out.println(typeMap);
		
		return typeMap;
	}

	/** 게시글 수정
	 *
	 */
	@Override
	public int boardUpdate(Board board) throws Exception {
		
		board.setBoardTitle(Util.XSSHandling(board.getBoardTitle()));
		board.setBoardContent(Util.XSSHandling(board.getBoardContent()));
		board.setBoardContent(Util.newLineHandling(board.getBoardContent()));
		
		int result = dao.boardUpdate(board);
		
		return result;
	}

	/**
	 * 게시글 작성(공지, 업데이트)
	 */
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int boardWrite(Board board) {
		
		board.setBoardTitle(Util.XSSHandling(board.getBoardTitle()));
		board.setBoardContent(Util.XSSHandling(board.getBoardContent()));
		board.setBoardContent(Util.newLineHandling(board.getBoardContent()));
		
		int boardNo = dao.boardWrite(board);
		
		
		
		
		return boardNo;
		
	}
	// 식당 신청 조회
	@Override
	public List<Store> selectEnroll(char checkFl) {
		return dao.selectEnroll(checkFl);
	}

	// 게시판 리스트 조회(검색 X)
	@Override
	public Map<String, Object> selectAdminBoard(int boardCode, int cp) {
		
		int listCount = dao.selectAdminBoardCount(boardCode);
		
		Pagination pagination = new Pagination(listCount, cp);
		
		List<Board> boardList = dao.selectAdminBoard(boardCode, pagination);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("boardList",boardList);
		map.put("pagination", pagination);
		
		return map;
		
	}

	// 식당 등록 문의
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int register(Store store, License license, List<MultipartFile> imageList, MultipartFile licenseImg,
			String webPath, String webPath2, String folderPath, String folderPath2) throws Exception {

		store.setStoreName(Util.XSSHandling(store.getStoreName()));
		store.setStoreInfo(Util.XSSHandling(store.getStoreInfo()));
		
		store.setStoreInfo(Util.newLineHandling(store.getStoreInfo()));
		
		// 이미지 제외 식당 정보 등록
		int result = dao.register(store);

		// 이미지 등록을 위해 storeNo 세팅
		int storeNo = result;
		
		// 이미지 제외 정보가 등록되었을 때
		if(result > 0) {
			
			license.setStoreNo(result);
			
			
			String reName = null;	
			
			license.setLicenseOriginal(licenseImg.getOriginalFilename());
			
			
			if(licenseImg.getSize() != 0) {
				reName = Util.fileRename(licenseImg.getOriginalFilename());
				license.setLicensePath(webPath + reName); 
				
			}
			license.setLicenseRename(reName);
			
			System.out.println(license);
			int result1 = dao.insertLicense(license);
			
			if(result1 > 0) {
				if(reName != null) {
					licenseImg.transferTo(new File(folderPath + reName));
				} 
			}
			
			// 사업자 등록증 이미지가 등록되었을 때
			if(result1 > 0) {
			
				List<StoreImage> storeImageList = new ArrayList<StoreImage>();
				List<String> reNameList = new ArrayList<String>();
				
				for(int i=0; i<imageList.size(); i++) {
					
					StoreImage img = new StoreImage();
					
					img.setStoreImagePath(webPath2);
					
					String reName2 = Util.fileRename(imageList.get(i).getOriginalFilename());
					
					
					img.setStoreImageRename(reName2);
					reNameList.add(reName2);
					
					
					img.setStoreImageOriginal(imageList.get(i).getOriginalFilename());
					
					img.setStoreNo(storeNo);
					
					img.setStoreImageOrder(i);
					
					System.out.println(img);
					storeImageList.add(img);
				}
				
				System.out.println(storeImageList);
								
				if(!storeImageList.isEmpty()) {
					storeNo = result;
					
					System.out.println(storeImageList);
					
					int result2 = dao.insertStoreImageList(storeImageList);
					if(result2 == storeImageList.size()) {
						for(int i=0; i<storeImageList.size(); i++) {
							
							int index = storeImageList.get(i).getStoreImageOrder();
							
							imageList.get(index).transferTo(new File(folderPath2 + reNameList.get(i)));
							}
						}
					
					// 가맹점 이미지 등록 성공시
					if(result2 > 0) {
						result = result2;
					}
				}
			
				// 사업자 등록증 이미지 등록 실패시
			} else {
				result = 0;
			}
			
			
		}
			return result;	
			
	}

	/**
	 * 회원 탈퇴
	 */
	@Override
	public int deleteMember(int memberNo) {
		
		return dao.deleteMember(memberNo);
	}

	// 식당 관리 이미지 조회
	@Override
	public List<StoreImage> selectStoreManageImg(int storeNo) {
		return dao.selectStoreManageImg(storeNo);
	}

	// 식당 관리 정보 조회
	@Override
	public Store selectStoreManage(int storeNo) {
		return dao.selectStoreManage(storeNo);
	}


	// 식당 상태 조회
	@Override
	public char storeCheck(int storeNo) {
		return dao.storeCheck(storeNo);
	}

	@Override
	public void storeChange(int storeNo) {
		dao.storeChange(storeNo);
		
	}

	// 식당 등록 승인
	@Override
	public int registerStore(int storeNo) {
		
		return dao.registerStore(storeNo);
	}

	@Override
	public Map<String, Object> searchStoreList(Map<String, Object> searchMap, int cp) {

		int listCount = dao.searchStoreListCount(searchMap);
		
		Pagination pagination = new Pagination(listCount, cp);
		
		List<Store> storeList = dao.searchStoreList(searchMap, pagination);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("storeList", storeList);
		map.put("pagination", pagination);
		
		System.out.println(map);
		return map;
		
		
	}

	@Override
	public Map<String, Object> selectStoreList_search(Map<String, Object> selectMap, int cp) {

		int listCount = dao.searchStoreListCount_search(selectMap);
		
		Pagination pagination = new Pagination(listCount, cp);
		
		System.out.println(selectMap);
		
		List<Store> storeList = dao.selectStoreList_search(selectMap, pagination);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("storeList", storeList);
		map.put("pagination", pagination);
		
		return map;
	}

	/**
	 * 회원 목록 조회  검색하기
	 */
	@Override
	public Map<String, Object> searchKey(Map<String, Object> searchKey, int cp) {
		
		int listCount = dao.searchKey(searchKey);
		
		
		Pagination pagination = new Pagination(listCount, cp);
		
		System.out.println(searchKey);
		
		
		List<Member> memberList = dao.searchKey(searchKey, pagination);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("memberList", memberList);
		map.put("pagination", pagination);
		
		return map;
	}

	// 등록 취소
	@Transactional
	@Override
	public int storeReturn(int storeNo) {
		return dao.storeReturn(storeNo);
	}

	@Override
	public Map<String, Object> selectAdminBoard_search(Map<String, Object> boardMap, int cp) {

		int listCount = dao.selectAdminBoard_searchCount(boardMap);
		
		Pagination pagination = new Pagination(listCount, cp);
		
		List<Board> boardList = dao.selectAdminBoard_search(boardMap, pagination);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("boardList", boardList);
		map.put("pagination", pagination);
		
		return map;
	}



	}





	
	
	

