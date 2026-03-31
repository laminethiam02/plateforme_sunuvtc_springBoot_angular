package com.sunuvtc.sunuvtcbackend.entities;


import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "historique_position")
public class HistoriquePosition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chauffeur_id", nullable = false)
    private Chauffeur chauffeur;

    @Column(nullable = false, precision = 10, scale = 6)
    private BigDecimal latitude;

    @Column(nullable = false, precision = 10, scale = 6)
    private BigDecimal longitude;

    @Column(name = "statut_vehicule", length = 20)
    private String statutVehicule;

    @Column(name = "vitesse_kmh", precision = 5, scale = 2)
    private BigDecimal vitesseKmh;

    @Column(name = "timestamp_position", nullable = false)
    private LocalDateTime timestampPosition;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // Constructeurs, getters et setters
    public HistoriquePosition() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Chauffeur getChauffeur() { return chauffeur; }
    public void setChauffeur(Chauffeur chauffeur) { this.chauffeur = chauffeur; }
    public BigDecimal getLatitude() { return latitude; }
    public void setLatitude(BigDecimal latitude) { this.latitude = latitude; }
    public BigDecimal getLongitude() { return longitude; }
    public void setLongitude(BigDecimal longitude) { this.longitude = longitude; }
    public String getStatutVehicule() { return statutVehicule; }
    public void setStatutVehicule(String statutVehicule) { this.statutVehicule = statutVehicule; }
    public BigDecimal getVitesseKmh() { return vitesseKmh; }
    public void setVitesseKmh(BigDecimal vitesseKmh) { this.vitesseKmh = vitesseKmh; }
    public LocalDateTime getTimestampPosition() { return timestampPosition; }
    public void setTimestampPosition(LocalDateTime timestampPosition) { this.timestampPosition = timestampPosition; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
