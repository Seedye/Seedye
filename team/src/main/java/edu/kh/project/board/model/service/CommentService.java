package edu.kh.project.board.model.service;

import java.util.List;

import edu.kh.project.board.model.vo.Comment;

public interface CommentService {

	List<Comment> selectCommentList(int boardNo);

	int insertComment(Comment comment);

	


}
