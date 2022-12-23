package edu.kh.project.admin.model.vo;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString

public class Store {

	private int storeNo;
	private String storeType;
	private String storeName;
	private String roadnameAddress;
	private String landnumberAddress;
	private String storeTel;
	private String checkFl;
	private int memberNo;
	private String storeInfo;
	
	// 황석현 수정
	private int storeCount; // 통계화면에 사용할 컬럼
	private List<StoreImage> storeImgList;
	
}
