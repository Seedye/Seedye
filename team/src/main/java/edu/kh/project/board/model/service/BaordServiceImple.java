package edu.kh.project.board.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.project.board.model.dao.BoardDAO;

@Service
public class BaordServiceImple implements BoardService{

	@Autowired
	private BoardDAO dao;
	
}
