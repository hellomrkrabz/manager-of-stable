package dev.dominoot.services;

import dev.dominoot.models.CostModel;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
@Service
public class CostService {
    public String saveCost(CostModel cost) {
        Connection conn = null;
        try {
            String url = "jdbc:sqlite:db/stable.db";
            conn = DriverManager.getConnection(url);
            DatabaseMetaData databaseMetaData = conn.getMetaData();
            String insertCost = """
                    INSERT INTO costs (amount, title, description, managerId, dateDay) VALUES (?, ?, ?, ?, ?)
            """;

            try (PreparedStatement preparedStatement = conn.prepareStatement(insertCost)) {
                preparedStatement.setInt(1, cost.getAmount());
                preparedStatement.setString(2, cost.getTitle());
                preparedStatement.setString(3, cost.getDescription());
                preparedStatement.setInt(4, cost.getManagerId());
                preparedStatement.setString(5, cost.getDateDay());

                preparedStatement.executeUpdate();


            } catch (SQLException e) {
                // Handle SQLException, log or rethrow as needed
                e.printStackTrace();
            }

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
        return "Cost added";
    }

    public List<Map<String, Object>> readCosts(String date) {
        Connection conn = null;
        List<Map<String, Object>> costs = new ArrayList<Map<String, Object>>();
        try {
            String url = "jdbc:sqlite:db/stable.db";
            conn = DriverManager.getConnection(url);
            DatabaseMetaData databaseMetaData = conn.getMetaData();

            PreparedStatement preparedStatement = null;
            String readCosts = """
                    SELECT * FROM costs WHERE dateDay=?
            """;
            preparedStatement = conn.prepareStatement(readCosts);

            preparedStatement.setString(1, date);

            try (Statement stmt = conn.createStatement();
                 ResultSet rs = preparedStatement.executeQuery()) {
                ResultSetMetaData metaData = rs.getMetaData();
                int columnCount = metaData.getColumnCount();

                while (rs.next()) {
                    Map<String, Object> cost = new HashMap<>();

                    for (int i = 1; i <= columnCount; i++) {
                        String columnName = metaData.getColumnName(i);
                        Object columnValue = rs.getObject(i);
                        cost.put(columnName, columnValue);
                    }

                    costs.add(cost);
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
        return costs;
    }
}
