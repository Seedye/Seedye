package edu.kh.project.member.model.service;

import edu.kh.project.member.model.vo.Member;

public interface MemberService{

	/** 로그인 서비스
	 * @param inputMember
	 * @return loginMember
	 */
	Member login(Member inputMember);

	/** 회원가입 서비스
	 * @param inputMember
	 * @return result
	 */
	int signUp(Member inputMember);

	
	/** 아이디 중복 검사 서비스
	 * @param memberId
	 * @return result
	 */
	int idDupCheck(String memberId);

	
	/** 전화번호 중복 검사 서비스
	 * @param memberTel
	 * @return result
	 */
	int telDupCheck(String memberTel);

}
