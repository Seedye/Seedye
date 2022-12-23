package edu.kh.project.member.model.vo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class Member {
	
	private int memberNo; // 회원번호
	private String memberId; // 아이디
	private String memberPw; // 비밀번호
	private String memberTel; // 전화번호
	private String memberAddress; // 주소
	private String enrollDate; // 가입일
	private String memberDeleteFlag; // 탈퇴여부
	private int authority; // 권한 (2:관리자 / 1:일반 / 3: 식당 업주)
	
}