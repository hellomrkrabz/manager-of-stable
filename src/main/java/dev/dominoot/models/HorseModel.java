package dev.dominoot.models;

import java.sql.Date;

public class HorseModel {
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Integer getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Integer ownerId) {
        this.ownerId = ownerId;
    }

    public String getDietaryDescription() {
        return dietaryDescription;
    }

    public void setDietaryDescription(String dietaryDescription) {
        this.dietaryDescription = dietaryDescription;
    }

    public String getTurnoutDescription() {
        return turnoutDescription;
    }

    public void setTurnoutDescription(String turnoutDescription) {
        this.turnoutDescription = turnoutDescription;
    }

    public String getOtherDetails() {
        return otherDetails;
    }

    public void setOtherDetails(String otherDetails) {
        this.otherDetails = otherDetails;
    }

    private Integer id;
    private String name;
    private String birthDate;
    private String image;
    private Integer ownerId;
    private String dietaryDescription;
    private String turnoutDescription;
    private String otherDetails;
}
