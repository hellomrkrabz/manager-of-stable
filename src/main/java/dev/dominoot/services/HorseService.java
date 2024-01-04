package dev.dominoot.services;

import dev.dominoot.models.HorseModel;
import dev.dominoot.models.UserModel;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileNotFoundException;
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

    private void saveBase64ImageToFile(String base64Image, String filePath, String name) throws IOException {
        byte[] imageBytes = Base64.getDecoder().decode(base64Image);
        Path path = Paths.get(filePath);
        Files.write(path, imageBytes);
        updateHorseImage(Integer.parseInt(name), filePath);
    }
    String saveImage(String image, Integer id) throws IOException {
        String base64Image = image;
        base64Image = base64Image.replace("data:image/jpeg;base64,", "");
        base64Image = base64Image.replaceAll("\\s", "");

        System.out.println(System.getProperty("user.dir"));
        String filePath = "media" + File.separator + id.toString() + ".jpg";

        saveBase64ImageToFile(base64Image, filePath, id.toString());

        return ("Image saved successfully");
    }

    public void updateHorseImage(Integer id, String filePath) {
        Connection conn = null;
        try {
            String url = "jdbc:sqlite:D:/code/manager-of-stable/db/stable.db";
            conn = DriverManager.getConnection(url);
            DatabaseMetaData databaseMetaData = conn.getMetaData();

            String updateHorse = """
                                        UPDATE horses
                            SET image = ?
                            WHERE id = ?;
            """;

            try (PreparedStatement preparedStatement = conn.prepareStatement(updateHorse)) {
                preparedStatement.setString(1, filePath);
                preparedStatement.setInt(2, id);
                preparedStatement.executeUpdate();

            } catch (SQLException e) {
                e.printStackTrace();
            }

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

    public String saveHorse(HorseModel horse) {
        Connection conn = null;
        try {
            String url = "jdbc:sqlite:D:/code/manager-of-stable/db/stable.db";
            conn = DriverManager.getConnection(url);
            DatabaseMetaData databaseMetaData = conn.getMetaData();

            String insertUser = """
                    INSERT INTO horses (name, birthday, ownerId, dietaryDescription, turnoutDescription, otherDetails) VALUES (?, ?, ?, ?, ?, ?)
            """;
            System.out.println("data urodzenia konia: "+ horse.getBirthDate());

            try (PreparedStatement preparedStatement = conn.prepareStatement(insertUser)) {

                System.out.println(horse.getName());
                preparedStatement.setString(1, horse.getName());
                preparedStatement.setString(2, horse.getBirthDate());
                preparedStatement.setInt(3, horse.getOwnerId());
                preparedStatement.setString(4, horse.getDietaryDescription());
                preparedStatement.setString(5, horse.getTurnoutDescription());
                preparedStatement.setString(6, horse.getOtherDetails());

                preparedStatement.executeUpdate();

                ResultSet generatedKeys = preparedStatement.getGeneratedKeys();

                if (generatedKeys.next()) {
                    // Retrieve the auto-generated ID
                    Integer lastInsertedId = generatedKeys.getInt(1);
                    String avatar = saveImage(horse.getImage(), lastInsertedId);
                    // Use lastInsertedId as needed
                    System.out.println("Last Inserted ID: " + lastInsertedId);
                } else {
                    System.err.println("Failed to retrieve last inserted ID.");
                }

            } catch (SQLException e) {
                // Handle SQLException, log or rethrow as needed
                e.printStackTrace();
            } catch (IOException e) {
                throw new RuntimeException(e);
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

    public List<Map<String, Object>> readHorsesFromOwner(Integer ownerId) {
        Connection conn = null;
        List<Map<String, Object>> horses = new ArrayList<Map<String, Object>>();
        try {

            PreparedStatement preparedStatement = null;


            String url = "jdbc:sqlite:D:/code/manager-of-stable/db/stable.db";
            conn = DriverManager.getConnection(url);
            DatabaseMetaData databaseMetaData = conn.getMetaData();

            String readHorses = """
                    SELECT * FROM horses WHERE ownerId = ?
            """;

            preparedStatement = conn.prepareStatement(readHorses);

            preparedStatement.setInt(1, ownerId);

            try (Statement stmt = conn.createStatement();
                 ResultSet rs = preparedStatement.executeQuery()) {
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

    public static String getImage64(Integer id) {
        String filePath = "media" + File.separator + id.toString() + ".jpg";
        String base64String = "";
        try {
            byte[] fileContent = Files.readAllBytes(Paths.get(filePath));

            base64String = Base64.getEncoder().encodeToString(fileContent);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return base64String;
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
                horse.setBirthDate(rs.getString("birthday"));
                horse.setDietaryDescription(rs.getString("dietaryDescription"));
                horse.setTurnoutDescription(rs.getString("turnoutDescription"));
                horse.setOtherDetails(rs.getString("otherDetails"));
                horse.setImage(getImage64(horse.getId()));
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
                    preparedStatement.setString(1, horse.getDietaryDescription());
                    preparedStatement.setString(2, horse.getTurnoutDescription());
                    preparedStatement.setString(3, horse.getOtherDetails());
                    preparedStatement.setInt(4, horse.getId());
                    preparedStatement.executeUpdate();
                    saveImage(horse.getImage(), horse.getId());
                }
                else {
                    return ("Horse not found");
                }
            } catch (SQLException e) {
                // Handle SQLException, log or rethrow as needed
                e.printStackTrace();
            } catch (IOException e) {
                throw new RuntimeException(e);
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

