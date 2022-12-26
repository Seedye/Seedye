package edu.kh.project.member.model.service;

import java.util.Map;

import edu.kh.project.member.model.vo.Member;

public interface MyPageService {

	/** 회원 정보 수정 서비스
	 * @param inputMember
	 * @return result
	 */
	int updateInfo(Member inputMember);

	/** 회원 정보 (비밀번호 포함) 수정 서비스
	 * @param inputMember
	 * @param paramMap
	 * @return allResult
	 */
	int updateAllInfo(Member inputMember, Map<String, Object> paramMap);

	/** 회원 탈퇴 서비스
	 * @param memberNo
	 * @param memberPw
	 * @return result
	 */
//	int memberDelete(int memberNo, String memberPw);

}
