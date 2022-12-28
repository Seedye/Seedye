package edu.kh.project.admin.model.vo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class License {

	private int storeNo;
	private String licensePath;
	private String licenseOriginal;
	private String licenseRename;
}
