package dev.dominoot.database;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.*;

public class DBManager {

    public DBManager() {
    }

    public void connect() {
        Connection conn = null;
        try {
            // db parameters
            String url = "jdbc:sqlite:D:/code/manager-of-stable/db/stable.db";
            // create a connection to the database
            conn = DriverManager.getConnection(url);
            DatabaseMetaData databaseMetaData = conn.getMetaData();

            boolean schemaExists = false;

            ResultSet tables = databaseMetaData.getTables(null, null, null, new String[]{"TABLE"});
                while (tables.next()) {
                    schemaExists = true;
                }
            System.out.println(schemaExists);

            String createUserTable = """
                    CREATE TABLE 'users' (
                    'id' INTEGER UNIQUE PRIMARY KEY,
                    'username' STRING,
                    'avatar' STRING,
                    'password' STRING,
                    'email' STRING,
                    'role' INTEGER
            );""";
            String createHorseTable = """
                    CREATE TABLE 'horses' (
                    'id' INTEGER UNIQUE PRIMARY KEY,
                    'name' STRING,
                    'birthday' STRING,
                    'image' STRING,
                    'ownerId' INTEGER,
                    'dietaryDescription' STRING,
                    'turnoutDescription' STRING,
                    'otherDetails' STRING,
                    FOREIGN KEY (ownerId) REFERENCES 'users'(id)
            );
                    """;
            String createVisitTable = """
                    CREATE TABLE 'visits' (
                    'id' INTEGER UNIQUE PRIMARY KEY,
                    'date' STRING,
                    'description' STRING,
                    'horseId' INTEGER,
                    'visitType' INTEGER,
                    FOREIGN KEY (horseId) REFERENCES 'horses'(id)
            );""";
            String createRideTable = """
                    CREATE TABLE 'rides' (
                    'id' INTEGER UNIQUE PRIMARY KEY,
                    'clientName' STRING,
                    'trainerId' INTEGER,
                    'group' BOOLEAN,
                    'dateBegin' DATE,
                    'dateEnd' DATE,
                    FOREIGN KEY (trainerId) REFERENCES 'users'(id)
            );""";
            String createCostTable = """
                    CREATE TABLE 'costs' (
                    'id' INTEGER UNIQUE PRIMARY KEY,
                    'amount' INTEGER,
                    'title' STRING,
                    'description' STRING,
                    'managerId' INTEGER,
                    FOREIGN KEY (managerId) REFERENCES 'users'(id)
            );""";

            try (Statement stmt = conn.createStatement()) {
                System.out.println(schemaExists);
                stmt.execute(createUserTable);
                stmt.execute(createHorseTable);
                stmt.execute(createVisitTable);
                stmt.execute(createCostTable);
                stmt.execute(createRideTable);
            } catch (SQLException e) {
                System.out.println(e.getMessage());
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
