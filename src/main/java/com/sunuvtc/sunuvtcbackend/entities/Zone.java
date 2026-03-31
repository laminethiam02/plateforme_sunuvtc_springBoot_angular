package com.sunuvtc.sunuvtcbackend.entities;



import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "zone")
public class Zone {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String nom;

    @Column(nullable = false, length = 7)
    private String couleur;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal tarif;

    @Column(nullable = false)
    private Boolean actif = true;

    // Geometry field stored as TEXT (WKT format)
    @Column(columnDefinition = "TEXT", nullable = false)
    private String geom;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // Constructors
    public Zone() {}

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
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
