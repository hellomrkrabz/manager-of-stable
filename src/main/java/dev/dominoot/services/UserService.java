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
import org.json.JSONObject;

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

    public UserModel readUserId(Integer id) {
        Connection conn = null;
        ResultSet resultSet = null;
        UserModel user = new UserModel();
        try {
            String url = "jdbc:sqlite:D:/code/manager-of-stable/db/stable.db";
            conn = DriverManager.getConnection(url);
            DatabaseMetaData databaseMetaData = conn.getMetaData();
            PreparedStatement preparedStatement = null;
            String sql = "SELECT * FROM users WHERE id=?";
            preparedStatement = conn.prepareStatement(sql);
            System.out.println("id:" + id);
            preparedStatement.setInt(1, id);

            try (Statement stmt = conn.createStatement();
                 ResultSet rs = preparedStatement.executeQuery()) {

                user.setId(rs.getInt("id"));
                user.setEmail(rs.getString("email"));
                user.setUsername(rs.getString("username"));
                user.setPassword(rs.getString("password"));
                rs.close();
                return user;

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

    public JSONObject toJSON(String s, UserModel user) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("message", s);
        jsonObject.put("id", user.getId());
        jsonObject.put("username", user.getUsername());
        jsonObject.put("email", user.getEmail());
        jsonObject.put("password", user.getPassword());

        return jsonObject;
    }
    public JSONObject validateUser(String username, String password) {
        UserModel user = readUser(username);
        if (user != null && user.getUsername() != null) {
            String tempPassword = user.getPassword();
            if (tempPassword != null && tempPassword.equals(password)) {
                JSONObject json = toJSON("Logged in", user);
                System.out.println(json.toString());
                return json;
            } else {
                JSONObject json = toJSON("Wrong password", user);
                return json;
            }
        }else {
                JSONObject json = toJSON("User not found", user);
                return json;
            }
    }

    public String updateUser(UserModel user) {
        Connection conn = null;
        try {
            String url = "jdbc:sqlite:D:/code/manager-of-stable/db/stable.db";
            conn = DriverManager.getConnection(url);
            DatabaseMetaData databaseMetaData = conn.getMetaData();

            String updateUser = """
                    UPDATE users
                            SET username = ?, email = ?
                            WHERE id = ?;
            """;


            try (PreparedStatement preparedStatement = conn.prepareStatement(updateUser)) {

                System.out.println(user.getUsername());

                if (user != null) {
                    List<Map<String, Object>> users = this.readUsers();
                    System.out.println("ten id: " + user.getId());
                    UserModel tempUser = readUserId(user.getId());
                    if (!user.getPassword().equals(tempUser.getPassword()))
                    {
                        return ("Incorrect password");
                    }
                    for (int u = 0; u < users.size(); u++)
                    {
                        Map<String, Object> userInDB = users.get(u);
                        if (user.getUsername().equals(userInDB.get("username")) && !user.getId().equals(userInDB.get("id"))) {
                            return ("This username is taken");
                        } else if (user.getEmail().equals(userInDB.get("email")) && !user.getId().equals(userInDB.get("id"))) {
                            return ("This email is in use");
                        }
                    }
                    preparedStatement.setString(1, user.getUsername());
                    preparedStatement.setString(2, user.getEmail());
                    preparedStatement.setInt(3, user.getId());
                    preparedStatement.executeUpdate();
                }
                else {
                    return ("User not found");
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
        return "User updated";
    }}

//dokonczyc
//    public String updateUser(UserModel user) {
//        if (user != null) {
//            List<Map<String, Object>> users = this.readUsers();
//            UserModel tempUser = readUser(user.getUsername());
//            if (user.getPassword() != tempUser.getPassword())
//            {
//                return ("Incorrect password");
//            }
//            for (int u = 0; u < users.size(); u++)
//            {
//                Map<String, Object> userInDB = users.get(u);
//                if (user.getUsername().equals(userInDB.get("username")) && user.getId() != userInDB.get("id")) {
//                    return ("This username is taken");
//                } else if (user.getEmail().equals(userInDB.get("email")) && user.getId() != userInDB.get("id")) {
//                    return ("This email is in use");
//                }
//            }
//            return ("User updated");
//        }else {
//            return ("User not found");
//        }
//    }
//}
