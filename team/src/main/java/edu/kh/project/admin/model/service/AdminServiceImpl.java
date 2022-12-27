package edu.kh.project.admin.model.service;

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
	public List<Store> selectStoreList() {
		return dao.selectStoreList();
	}

	@Override
	public List<Member> selectMemberList() {
		return dao.selectMemberList();
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
	public List<Store> selectStoreList(String storeType) {
		return dao.selectStoreList(storeType);
	}

	// 식당 신청 조회
	@Override
	public List<Store> selectEnroll(char checkFl) {
		return dao.selectEnroll(checkFl);
	}

	// 공지사항 조회
	@Override
	public List<Board> selectBoardNotice(int boardCode) {
		return dao.selectBoardNotice(boardCode);
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public int register(Store store, License license, List<MultipartFile> imageList, MultipartFile licenseImg,
			String webPath, String webPath2, String folderPath, String folderPath2) throws Exception {

		store.setStoreName(Util.XSSHandling(store.getStoreName()));
		store.setStoreInfo(Util.XSSHandling(store.getStoreInfo()));
		
		store.setStoreInfo(Util.newLineHandling(store.getStoreInfo()));
		
		int result = dao.register(store);
				
		int storeNo = result;
		
		if(result > 0) {
			
			license.setStoreNo(result);
			
			String reName = null;	
			
			if(licenseImg.getSize() != 0) {
				reName = Util.fileRename(licenseImg.getOriginalFilename());
				license.setLicensePath(webPath + reName); 
				
			}
			int result1 = dao.insertLicense(license);
			
			if(result1 > 0) {
				if(reName != null) {
					licenseImg.transferTo(new File(folderPath + reName));
				} 
			}
			
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
					
					storeImageList.add(img);
				}
				
								
				if(!storeImageList.isEmpty()) {
					storeNo = result;
					int result2 = dao.insertStoreImageList(storeImageList);
					if(result2 == storeImageList.size()) {
						for(int i=0; i<storeImageList.size(); i++) {
							
							int index = storeImageList.get(i).getStoreImageOrder();
							
							imageList.get(index).transferTo(new File(folderPath2 + reNameList.get(i)));
							}
						}
					
					if(result2 > 0) {
						result = result2;
					}
				}
				
			} else {
				result = 0;
			}
			
			
		}
			return result;	
			
	}


	
	
	
}
