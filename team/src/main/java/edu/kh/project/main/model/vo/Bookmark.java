package edu.kh.project.main.model.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Bookmark {

	private int memberNo;
	private int storeNo;
	private String bookmarkDate;
	
	private String StoreName;
}
