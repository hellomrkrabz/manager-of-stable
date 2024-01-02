package dev.dominoot.services;

import dev.dominoot.models.HorseModel;
import dev.dominoot.models.RideModel;
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
public class RideService {
    public String saveRide(RideModel ride) {
        Connection conn = null;
        try {
            String url = "jdbc:sqlite:D:/code/manager-of-stable/db/stable.db";
            conn = DriverManager.getConnection(url);
            DatabaseMetaData databaseMetaData = conn.getMetaData();
            System.out.println("grupa tu: " + ride.getGroupRide());
            String insertRide = """
                    INSERT INTO rides (clientName, trainerId, groupRide, dateBegin, dateEnd, dateDay) VALUES (?, ?, ?, ?, ?, ?)
            """;

            try (PreparedStatement preparedStatement = conn.prepareStatement(insertRide)) {
                preparedStatement.setString(1, ride.getClientName());
                preparedStatement.setInt(2, ride.getTrainerId());
                preparedStatement.setInt(3, ride.getGroupRide());
                preparedStatement.setString(4, ride.getDateBegin());
                preparedStatement.setString(5, ride.getDateEnd());
                preparedStatement.setString(6, ride.getDateDay());

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
        return "Ride added";
    }

    public List<Map<String, Object>> readRides(String date) {
        Connection conn = null;
        List<Map<String, Object>> rides = new ArrayList<Map<String, Object>>();
        try {
            String url = "jdbc:sqlite:D:/code/manager-of-stable/db/stable.db";
            conn = DriverManager.getConnection(url);
            DatabaseMetaData databaseMetaData = conn.getMetaData();

            PreparedStatement preparedStatement = null;
            String readVisits = """
                    SELECT * FROM rides WHERE dateDay=?
            """;
            preparedStatement = conn.prepareStatement(readVisits);

            preparedStatement.setString(1, date);

            try (Statement stmt = conn.createStatement();
                 ResultSet rs = preparedStatement.executeQuery()) {
                ResultSetMetaData metaData = rs.getMetaData();
                int columnCount = metaData.getColumnCount();

                while (rs.next()) {
                    Map<String, Object> ride = new HashMap<>();

                    for (int i = 1; i <= columnCount; i++) {
                        String columnName = metaData.getColumnName(i);
                        Object columnValue = rs.getObject(i);
                        ride.put(columnName, columnValue);
                    }

                    rides.add(ride);
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
        return rides;
    }
}
