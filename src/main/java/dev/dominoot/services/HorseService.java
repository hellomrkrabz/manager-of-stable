package dev.dominoot.services;

import dev.dominoot.models.HorseModel;
import dev.dominoot.models.UserModel;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.sql.*;
import java.util.*;

import org.springframework.util.Base64Utils;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
@Service
public class HorseService {

    private static void saveBase64ImageToFile(String base64Image, String filePath) throws IOException {
        // Decode Base64 string to bytes
        byte[] imageBytes = Base64.getDecoder().decode(base64Image);

        // Write bytes to file
        Path path = Paths.get(filePath);
        Files.write(path, imageBytes);

        // If you want to write to a binary image file, you can use FileOutputStream instead
        // Uncomment the following lines if you want to write to a binary image file
        // try (FileOutputStream fos = new FileOutputStream(filePath)) {
        //     fos.write(imageBytes);
        // }
    }
    String saveImage(String image, Integer id) {
        try {
            String base64Image = image;


            // Remove the data:image/png;base64, prefix if it exists
            base64Image = base64Image.replace("data:image/jpeg;base64,", "");

            // Decode the base64 string to bytes
            //byte[] imageBytes = Base64Utils.decodeFromString(base64Image);
            base64Image = base64Image.replaceAll("\\s", "");
            byte[] imageBytes = Base64.getDecoder().decode(base64Image);
            // Specify the file path where you want to save the image
            System.out.println(System.getProperty("user.dir"));
            String filePath = "media" + File.separator + "id" + ".jpg";
            String filePath2 = "media" + File.separator + "id" + ".txt";

            // Write the bytes to a file
            Files.write(Paths.get(filePath), imageBytes, StandardOpenOption.CREATE);
            saveBase64ImageToFile(base64Image, filePath2);
            saveBase64toDisk(image, "halo");

            // Rest of your logic...
            return ("Image saved successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ("Error saving image");
        }
    }

    public void saveBase64toDisk(String image, String name) {
        try {
            String base64Image;
            if (image.contains(",")) {
                base64Image = image.split(",")[1];
            } else {
                base64Image = image;
            }
            byte[] imageBytes = javax.xml.bind.DatatypeConverter.parseBase64Binary(base64Image);

            String mediaPath = "D:\\code\\manager-of-stable\\media\\";
            FileOutputStream fileOutPutStream = new FileOutputStream(mediaPath + name + ".jpg");


            fileOutPutStream.write(imageBytes);
            fileOutPutStream.close();

        } catch (IOException e) {
            System.out.println(e.getMessage());
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

    public List<Map<String, Object>> readHorses() {
        Connection conn = null;
        List<Map<String, Object>> horses = new ArrayList<Map<String, Object>>();
        try {
            String url = "jdbc:sqlite:D:/code/manager-of-stable/db/stable.db";
            conn = DriverManager.getConnection(url);
            DatabaseMetaData databaseMetaData = conn.getMetaData();

            String readHorses = """
                    SELECT * FROM horses
            """;


            try (Statement stmt = conn.createStatement();
                 ResultSet rs = stmt.executeQuery(readHorses)) {
                ResultSetMetaData metaData = rs.getMetaData();
                int columnCount = metaData.getColumnCount();

                while (rs.next()) {
                    Map<String, Object> horse = new HashMap<>();

                    for (int i = 1; i <= columnCount; i++) {
                        String columnName = metaData.getColumnName(i);
                        Object columnValue = rs.getObject(i);
                        horse.put(columnName, columnValue);
                    }

                    horses.add(horse);
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
        return horses;
    }

    public HorseModel readHorse(Integer id) {
        Connection conn = null;
        ResultSet resultSet = null;
        HorseModel horse = new HorseModel();
        try {
            String url = "jdbc:sqlite:D:/code/manager-of-stable/db/stable.db";
            conn = DriverManager.getConnection(url);
            DatabaseMetaData databaseMetaData = conn.getMetaData();
            PreparedStatement preparedStatement = null;
            String sql = "SELECT * FROM horses WHERE id=?";
            preparedStatement = conn.prepareStatement(sql);
            System.out.println("id:" + id);
            preparedStatement.setInt(1, id);

            try (Statement stmt = conn.createStatement();
                 ResultSet rs = preparedStatement.executeQuery()) {

                horse.setId(rs.getInt("id"));
                horse.setName(rs.getString("name"));
                horse.setBirthDate(rs.getDate("birthday"));
                horse.setDietaryDescription(rs.getString("dietaryDescription"));
                horse.setTurnoutDescription(rs.getString("turnoutDescription"));
                horse.setOtherDetails(rs.getString("otherDetails"));
                horse.setImage(rs.getString("image"));
                horse.setOwnerId(rs.getInt("ownerId"));
                rs.close();
                return horse;

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

    public String updateHorse(HorseModel horse) {
        Connection conn = null;
        try {
            String url = "jdbc:sqlite:D:/code/manager-of-stable/db/stable.db";
            conn = DriverManager.getConnection(url);
            DatabaseMetaData databaseMetaData = conn.getMetaData();

            String updateHorse = """
                    UPDATE horses
                            SET dietaryDescription = ?, turnoutDescription = ?, otherDetails = ?
                            WHERE id = ?;
            """;


            try (PreparedStatement preparedStatement = conn.prepareStatement(updateHorse)) {

                if (horse != null) {
                    System.out.println("ten id: " + horse.getId());
                    System.out.println("ten diet: " + horse.getDietaryDescription());

                    preparedStatement.setString(1, horse.getDietaryDescription());
                    preparedStatement.setString(2, horse.getTurnoutDescription());
                    preparedStatement.setString(3, horse.getOtherDetails());
                    preparedStatement.setInt(4, horse.getId());
                    preparedStatement.executeUpdate();
                }
                else {
                    return ("Horse not found");
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
        return "Horse updated";
    }
}

