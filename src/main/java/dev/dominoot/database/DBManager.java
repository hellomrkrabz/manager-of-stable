package dev.dominoot.database;

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

            String schema = """
                    CREATE TABLE 'horsies' (
                    'id' INTEGER UNIQUE PRIMARY KEY,
            'horse_name' STRING,
                    'age' INTEGER);""";
            String bal = "INSERT INTO horsies(horse_name, age) VALUES ('balbina', 200);";
            String bi = "INSERT INTO horsies(horse_name, age) VALUES ('lewandowski', 2);";
            String nka = "INSERT INTO horsies(horse_name, age) VALUES ('kopytko', 3); ";

            try (Statement stmt = conn.createStatement()) {
                // create a new table
                stmt.execute(schema);
                stmt.execute(bal);
                stmt.execute(bi);
                stmt.execute(nka);
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
