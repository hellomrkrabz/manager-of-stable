package dev.dominoot.services;

import dev.dominoot.models.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.sql.*;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
@Service
public class UserService {

    public void saveUser(UserModel user) {
        Connection conn = null;
        try {
            String url = "jdbc:sqlite:D:/code/manager-of-stable/db/stable.db";
            conn = DriverManager.getConnection(url);
            DatabaseMetaData databaseMetaData = conn.getMetaData();

            String insertUser = """
                    INSERT INTO users (username, password, email) VALUES (?, ?, ?)
            """;


            try (PreparedStatement preparedStatement = conn.prepareStatement(insertUser)) {

                System.out.println(user.getUsername());
                preparedStatement.setString(1, user.getUsername());
                preparedStatement.setString(2, user.getPassword());
                preparedStatement.setString(3, user.getEmail());


                preparedStatement.executeUpdate();
            } catch (SQLException e) {
                // Handle SQLException, log or rethrow as needed
                e.printStackTrace();
            }
            //test
            System.out.println("Connection to SQLite has been established.");

        } catch (SQLException e) {
            System.out.println(e.getMessage());
        } finally {
            try {
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                System.out.println(ex.getMessage());
            }
        }
    }

}
