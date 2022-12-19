package edu.kh.project.board.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.project.board.dao.BoardDAO;

@Service
public class BaordServiceImple implements BoardService{

	@Autowired
	private BoardDAO dao;
	
}
