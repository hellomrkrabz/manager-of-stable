package dev.dominoot.services;

import dev.dominoot.models.UserModel;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
@Service
public class UserService {

    public String saveUser(UserModel user) {
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

                List<Map<String, Object>> users = this.readUsers();
                for (int u = 0; u < users.size(); u++) {
                    Map<String, Object> userInDB = users.get(u);
                    if (user.getUsername().equals(userInDB.get("username"))) {
                        return ("This username is taken");
                    } else if (user.getEmail().equals(userInDB.get("email"))) {
                        return ("This email is in use");
                    }
                }
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
        return "User created";
    }

    public List<Map<String, Object>> readUsers() {
        Connection conn = null;
        List<Map<String, Object>> users = new ArrayList<Map<String, Object>>();
        try {
            String url = "jdbc:sqlite:D:/code/manager-of-stable/db/stable.db";
            conn = DriverManager.getConnection(url);
            DatabaseMetaData databaseMetaData = conn.getMetaData();

            String readUsers = """
                    SELECT * FROM users
            """;


            try (Statement stmt = conn.createStatement();
                 ResultSet rs = stmt.executeQuery(readUsers)) {
                ResultSetMetaData metaData = rs.getMetaData();
                int columnCount = metaData.getColumnCount();

                while (rs.next()) {
                    Map<String, Object> user = new HashMap<>();

                    for (int i = 1; i <= columnCount; i++) {
                        String columnName = metaData.getColumnName(i);
                        Object columnValue = rs.getObject(i);
                        user.put(columnName, columnValue);
                    }

                    users.add(user);
                }
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
        return users;
    }

    public UserModel readUser(String username) {
        Connection conn = null;
        ResultSet resultSet = null;
        UserModel user = new UserModel();
        try {
            String url = "jdbc:sqlite:D:/code/manager-of-stable/db/stable.db";
            conn = DriverManager.getConnection(url);
            DatabaseMetaData databaseMetaData = conn.getMetaData();
            PreparedStatement preparedStatement = null;
            String sql = "SELECT * FROM users WHERE username=?";
            preparedStatement = conn.prepareStatement(sql);
            preparedStatement.setString(1, username);

            try (Statement stmt = conn.createStatement();
                 ResultSet rs = preparedStatement.executeQuery()) {

                    user.setId(rs.getInt("id"));
                    user.setEmail(rs.getString("email"));
                    user.setUsername(rs.getString("username"));
                    user.setPassword(rs.getString("password"));
                    rs.close();
                    return user;
                //test

            } catch (SQLException e) {
                System.out.println(e.getMessage());
                return null;
            } finally {
                try {
                    if (conn != null) {
                        conn.close();
                    }
                } catch (SQLException ex) {
                    System.out.println(ex.getMessage());
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public String validateUser(String username, String password) {
        UserModel user = readUser(username);
        if (user != null && user.getUsername() != null) {
            String tempPassword = user.getPassword();
            if (tempPassword != null && tempPassword.equals(password)) {
                return ("Logged in");
            } else {
                return ("Wrong password");
            }
        }else {
                return ("User not found");
            }
    }
}
