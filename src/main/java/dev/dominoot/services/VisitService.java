package dev.dominoot.services;

import dev.dominoot.models.VisitModel;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.util.Base64Utils;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
@Service
public class VisitService {

    public String saveVisit(VisitModel visit) {
        Connection conn = null;
        try {
            String url = "jdbc:sqlite:db/stable.db";
            conn = DriverManager.getConnection(url);
            DatabaseMetaData databaseMetaData = conn.getMetaData();

            String insertVisit = """
                    INSERT INTO visits (date, description, horseId, visitType) VALUES (?, ?, ?, ?)
            """;

            System.out.println("visit date: "+visit.getDate());
            try (PreparedStatement preparedStatement = conn.prepareStatement(insertVisit)) {
                preparedStatement.setString(1, visit.getDate());
                preparedStatement.setString(2, visit.getDescription());
                preparedStatement.setInt(3, visit.getHorseId());
                preparedStatement.setInt(4, visit.getVisitType());

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
        return "Visit added";
    }

    public List<Map<String, Object>> readVisits() {
        Connection conn = null;
        List<Map<String, Object>> visits = new ArrayList<Map<String, Object>>();
        try {
            String url = "jdbc:sqlite:db/stable.db";
            conn = DriverManager.getConnection(url);
            DatabaseMetaData databaseMetaData = conn.getMetaData();

            String readVisits = """
                    SELECT * FROM visits
            """;


            try (Statement stmt = conn.createStatement();
                 ResultSet rs = stmt.executeQuery(readVisits)) {
                ResultSetMetaData metaData = rs.getMetaData();
                int columnCount = metaData.getColumnCount();

                while (rs.next()) {
                    Map<String, Object> visit = new HashMap<>();

                    for (int i = 1; i <= columnCount; i++) {
                        String columnName = metaData.getColumnName(i);
                        Object columnValue = rs.getObject(i);
                        visit.put(columnName, columnValue);
                    }

                    visits.add(visit);
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
        return visits;
    }

    public VisitModel readVisit(Integer id) {
        Connection conn = null;
        ResultSet resultSet = null;
        VisitModel visit = new VisitModel();
        try {
            String url = "jdbc:sqlite:db/stable.db";
            conn = DriverManager.getConnection(url);
            DatabaseMetaData databaseMetaData = conn.getMetaData();
            PreparedStatement preparedStatement = null;
            String sql = "SELECT * FROM visits WHERE horseId=?";
            preparedStatement = conn.prepareStatement(sql);
            System.out.println("id:" + id);
            preparedStatement.setInt(1, id);

            try (Statement stmt = conn.createStatement();
                 ResultSet rs = preparedStatement.executeQuery()) {

                visit.setId(rs.getInt("id"));
                visit.setDate(rs.getString("date"));
                visit.setVisitType(rs.getInt("visitType"));
                visit.setDescription(rs.getString("description"));
                visit.setHorseId(rs.getInt("horseId"));
                rs.close();
                return visit;

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

    public List<Map<String, Object>> readVisitsForHorse(Integer id) {
        Connection conn = null;
        List<Map<String, Object>> visits = new ArrayList<Map<String, Object>>();
        try {
            String url = "jdbc:sqlite:db/stable.db";
            conn = DriverManager.getConnection(url);
            DatabaseMetaData databaseMetaData = conn.getMetaData();

            PreparedStatement preparedStatement = null;
            String readVisits = """
                    SELECT * FROM visits WHERE horseId=?
            """;
            preparedStatement = conn.prepareStatement(readVisits);
            System.out.println("id:" + id);
            preparedStatement.setInt(1, id);

            try (Statement stmt = conn.createStatement();
                 ResultSet rs = preparedStatement.executeQuery()) {
                ResultSetMetaData metaData = rs.getMetaData();
                int columnCount = metaData.getColumnCount();

                while (rs.next()) {
                    Map<String, Object> visit = new HashMap<>();

                    for (int i = 1; i <= columnCount; i++) {
                        String columnName = metaData.getColumnName(i);
                        Object columnValue = rs.getObject(i);
                        visit.put(columnName, columnValue);
                    }

                    visits.add(visit);
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
        return visits;
    }
}

