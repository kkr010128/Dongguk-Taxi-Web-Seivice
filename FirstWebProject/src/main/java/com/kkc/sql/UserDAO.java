package com.kkc.sql;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import com.mysql.jdbc.Statement;

public class UserDAO {

	public int join(String userID, String userPassword) { //데이터베이스 서버에서 컬럼 추가하는 메소드
		String SQL = "INSERT INTO dongguk_test VALUES (?, ?, ?, ?)";
		try {
			Connection conn = DatabaseUtil.getConnection();
			PreparedStatement pstmt = conn.prepareStatement(SQL);
			pstmt.setString(1, userID);
			pstmt.setString(2, userPassword);
			pstmt.setString(3, "test");
			pstmt.setInt(4, 1);
			return pstmt.executeUpdate();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return -1;
	}
	
	public void getData() { // 데이트베이스 서버에서 컬럼 정보 가지고 오는 메소드
		String SQL = "SELECT * FROM dongguk_test";
		try {
			Connection conn = DatabaseUtil.getConnection();
			Statement stm = (Statement) conn.createStatement();
			ResultSet rs = stm.executeQuery(SQL);
			while(rs.next())
				System.out.println(rs.getString(1));
			
		}
		catch(Exception e) {
			e.printStackTrace();
		}
	}
}
