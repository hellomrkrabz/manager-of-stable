package dev.dominoot.services;

import dev.dominoot.models.HorseModel;
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

import org.springframework.util.Base64Utils;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
@Service
public class HorseService {

    String saveImage(String image, Integer id) {
        try {
            String base64Image = image;

            // Remove the data:image/png;base64, prefix if it exists
            base64Image = base64Image.replace("data:image/png;base64,", "");

            // Decode the base64 string to bytes
            byte[] imageBytes = Base64Utils.decodeFromString(base64Image);

            // Specify the file path where you want to save the image
            System.out.println(System.getProperty("user.dir"));
            String filePath = "media" + File.separator + "id" + ".jpg";

            // Write the bytes to a file
            Files.write(Paths.get(filePath), imageBytes, StandardOpenOption.CREATE);

            // Rest of your logic...
            return ("Image saved successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ("Error saving image");
        }
    }
    public String saveHorse(HorseModel horse) {
        String avatar = saveImage(horse.getImage(), horse.getId());
        Connection conn = null;
        try {
            String url = "jdbc:sqlite:D:/code/manager-of-stable/db/stable.db";
            conn = DriverManager.getConnection(url);
            DatabaseMetaData databaseMetaData = conn.getMetaData();

            String insertUser = """
                    INSERT INTO horses (name, birthday, image, ownerId, dietaryDescription, turnoutDescription, otherDetails) VALUES (?, ?, ?, ?, ?, ?, ?)
            """;


            try (PreparedStatement preparedStatement = conn.prepareStatement(insertUser)) {

                System.out.println(horse.getName());
                preparedStatement.setString(1, horse.getName());
                preparedStatement.setDate(2, horse.getBirthDate());
                preparedStatement.setString(3, avatar);
                preparedStatement.setInt(4, horse.getOwnerId());
                preparedStatement.setString(5, horse.getDietaryDescription());
                preparedStatement.setString(6, horse.getTurnoutDescription());
                preparedStatement.setString(7, horse.getOtherDetails());

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
        return "Horse added";
    }

   }

