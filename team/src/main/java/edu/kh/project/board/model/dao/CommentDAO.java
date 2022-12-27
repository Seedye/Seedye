package edu.kh.project.board.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.project.board.model.vo.Comment;

@Repository
public class CommentDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;


	public List<Comment> selectCommentList(int boardNo) {
		return sqlSession.selectList("boardMapper.selectCommentList", boardNo);
	}


	public int insertComment(Comment comment) {
		return sqlSession.insert("commentMapper.insertComment", comment);
	}


	}


