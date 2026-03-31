package com.sunuvtc.sunuvtcbackend.entities;


import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "chauffeur")
public class Chauffeur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(length = 50)
    private String nom;

    @Column(length = 50)
    private String prenom;

    @Column(name = "statut_vehicule", length = 20)
    private String statutVehicule = "HORS_SERVICE";

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "zone_assignee_id")
    private Zone zoneAssignee;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // Constructors
    public Chauffeur() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }
    public String getStatutVehicule() { return statutVehicule; }
    public void setStatutVehicule(String statutVehicule) { this.statutVehicule = statutVehicule; }
    public Zone getZoneAssignee() { return zoneAssignee; }
    public void setZoneAssignee(Zone zoneAssignee) { this.zoneAssignee = zoneAssignee; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
