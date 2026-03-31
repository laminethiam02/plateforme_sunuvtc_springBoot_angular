package com.sunuvtc.sunuvtcbackend.dtos;



import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;

public class ZoneDTO {
    private Long id;

    @NotBlank
    private String nom;

    @NotBlank @Pattern(regexp = "^#[0-9A-Fa-f]{6}$")
    private String couleur;

    @NotNull @Positive
    private BigDecimal tarif;

    private Boolean actif;

    @NotBlank
    private String geom; // WKT representation of polygon

    // Constructors
    public ZoneDTO() {}

    public ZoneDTO(Long id, String nom, String couleur, BigDecimal tarif, Boolean actif, String geom) {
        this.id = id;
        this.nom = nom;
        this.couleur = couleur;
        this.tarif = tarif;
        this.actif = actif;
        this.geom = geom;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    public String getCouleur() { return couleur; }
    public void setCouleur(String couleur) { this.couleur = couleur; }
    public BigDecimal getTarif() { return tarif; }
    public void setTarif(BigDecimal tarif) { this.tarif = tarif; }
    public Boolean getActif() { return actif; }
    public void setActif(Boolean actif) { this.actif = actif; }
    public String getGeom() { return geom; }
    public void setGeom(String geom) { this.geom = geom; }
}
