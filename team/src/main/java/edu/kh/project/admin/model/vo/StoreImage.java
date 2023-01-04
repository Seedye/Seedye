package edu.kh.project.admin.model.vo;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString


public class StoreImage {

	private int storeNo;
	private String storeImagePath;
	private String storeImageRename;
	private int storeImageOrder;
	private String storeImageOriginal;
	private int storeImageNo;
	
	private List<StoreImage> storeList;
	private String licensePath;
	private String allPath;
	
}