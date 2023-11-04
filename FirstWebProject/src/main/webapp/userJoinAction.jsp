<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.kkc.sql.UserDAO" %>
<%@ page import="java.io.PrintWriter" %>
<%
	request.setCharacterEncoding("UTF-8");
	String userID = null;
	String userPassword = null;
	if(request.getParameter("userID") != null) {
		userID = (String) request.getParameter("userID");
	}
	if(request.getParameter("userPassword") != null) {
		userPassword = (String) request.getParameter("userPassword");
	}
	if(userID == null || userPassword == null) {
		PrintWriter script = response.getWriter();
		script.println("<script>");
		script.println("alert('입력이 안된 게 있습니다')");
		script.println("</script>");
		script.close();
		return;
	}
	UserDAO userDAO = new UserDAO();
	userDAO.getData();
	int result = userDAO.join(userID, userPassword);
	if(result == 1) {
		PrintWriter script = response.getWriter();
		script.println("<script>");
		script.println("alert('회원가입 성공')");
		script.println("</script>");
		script.close();
		return;
	}
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

</body>
</html>