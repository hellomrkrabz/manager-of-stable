package dev.dominoot.services;

import dev.dominoot.models.RideModel;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.*;

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
}
