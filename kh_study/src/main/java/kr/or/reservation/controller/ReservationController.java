package kr.or.reservation.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class reservationController {
	
	@RequestMapping(value="/reservationFrm.do")
	public String reservationFrm() {
		return "member/reservation";
	}
}