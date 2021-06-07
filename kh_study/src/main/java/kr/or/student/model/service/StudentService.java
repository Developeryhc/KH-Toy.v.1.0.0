package kr.or.student.model.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.cla.model.vo.cla;
import kr.or.student.model.dao.StudentDao;
import kr.or.student.model.vo.Student;

@Service
public class StudentService {
	@Autowired
	private StudentDao dao;
	
	//회원 id중복 찾기 selectOneStudent
	public Student selectOneStudent(Student s) {
		List list = dao.selectOneStudent(s);
		Student stu = null;
		if(!list.isEmpty()) {
			stu = (Student)list.get(0);
		}
		return stu;
	}
	//개강되어있는 반 전부 가져오기
	public ArrayList<cla> selectOpenCla() {
		return (ArrayList<cla>)dao.selectOpenCla();
	}
	//회원가입 insert
	@Transactional
	public int insertStudent(Student s) {
		return dao.insertStudent(s);
	}
}
