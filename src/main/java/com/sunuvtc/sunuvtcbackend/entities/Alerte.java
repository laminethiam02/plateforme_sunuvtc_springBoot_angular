package com.sunuvtc.sunuvtcbackend.entities;



import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "alerte")
public class Alerte {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chauffeur_id", nullable = false)
    private Chauffeur chauffeur;

    @Column(name = "type_alerte", nullable = false, length = 50)
    private String typeAlerte;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    @Column(precision = 10, scale = 6)
    private BigDecimal latitude;

    @Column(precision = 10, scale = 6)
    private BigDecimal longitude;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "zone_concernee_id")
    private Zone zoneConcernee;

    @Column(name = "est_lue")
    private Boolean estLue = false;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // Constructeurs, getters et setters
    public Alerte() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Chauffeur getChauffeur() { return chauffeur; }
    public void setChauffeur(Chauffeur chauffeur) { this.chauffeur = chauffeur; }
    public String getTypeAlerte() { return typeAlerte; }
    public void setTypeAlerte(String typeAlerte) { this.typeAlerte = typeAlerte; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public BigDecimal getLatitude() { return latitude; }
    public void setLatitude(BigDecimal latitude) { this.latitude = latitude; }
    public BigDecimal getLongitude() { return longitude; }
    public void setLongitude(BigDecimal longitude) { this.longitude = longitude; }
    public Zone getZoneConcernee() { return zoneConcernee; }
    public void setZoneConcernee(Zone zoneConcernee) { this.zoneConcernee = zoneConcernee; }
    public Boolean getEstLue() { return estLue; }
    public void setEstLue(Boolean estLue) { this.estLue = estLue; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
