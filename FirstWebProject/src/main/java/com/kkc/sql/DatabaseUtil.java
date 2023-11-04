package com.kkc.sql;

import java.sql.Connection;
import java.sql.DriverManager;

public class DatabaseUtil {

	public static Connection getConnection( ) { // 데이터베이스 연결 하는 메소드
		try {
			String dbURL = "jdbc:mysql://180.64.38.151:3306/dongguk";
			String dbID = "dongguk";
			String dbPassword = "dongguk";
			Class.forName("com.mysql.jdbc.Driver");
			return DriverManager.getConnection(dbURL, dbID, dbPassword);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
