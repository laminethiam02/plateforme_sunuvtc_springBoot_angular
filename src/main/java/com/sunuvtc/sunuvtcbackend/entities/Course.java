package com.sunuvtc.sunuvtcbackend.entities;



import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chauffeur_id", nullable = false)
    private Chauffeur chauffeur;

    @Column(name = "debut", nullable = false)
    private LocalDateTime debut;

    @Column(name = "fin")
    private LocalDateTime fin;

    @Column(name = "lat_depart", nullable = false, precision = 10, scale = 6)
    private BigDecimal latDepart;

    @Column(name = "lng_depart", nullable = false, precision = 10, scale = 6)
    private BigDecimal lngDepart;

    @Column(name = "lat_arrivee", precision = 10, scale = 6)
    private BigDecimal latArrivee;

    @Column(name = "lng_arrivee", precision = 10, scale = 6)
    private BigDecimal lngArrivee;

    @Column(name = "distance_km", precision = 10, scale = 2)
    private BigDecimal distanceKm;

    @Column(precision = 10, scale = 2)
    private BigDecimal montant;

    @Column(length = 20)
    private String statut = "EN_COURSE";

    @Column(name = "zones_traversees", columnDefinition = "TEXT")
    private String zonesTraversees;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // Constructors
    public Course() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Chauffeur getChauffeur() { return chauffeur; }
    public void setChauffeur(Chauffeur chauffeur) { this.chauffeur = chauffeur; }
    public LocalDateTime getDebut() { return debut; }
    public void setDebut(LocalDateTime debut) { this.debut = debut; }
    public LocalDateTime getFin() { return fin; }
    public void setFin(LocalDateTime fin) { this.fin = fin; }
    public BigDecimal getLatDepart() { return latDepart; }
    public void setLatDepart(BigDecimal latDepart) { this.latDepart = latDepart; }
    public BigDecimal getLngDepart() { return lngDepart; }
    public void setLngDepart(BigDecimal lngDepart) { this.lngDepart = lngDepart; }
    public BigDecimal getLatArrivee() { return latArrivee; }
    public void setLatArrivee(BigDecimal latArrivee) { this.latArrivee = latArrivee; }
    public BigDecimal getLngArrivee() { return lngArrivee; }
    public void setLngArrivee(BigDecimal lngArrivee) { this.lngArrivee = lngArrivee; }
    public BigDecimal getDistanceKm() { return distanceKm; }
    public void setDistanceKm(BigDecimal distanceKm) { this.distanceKm = distanceKm; }
    public BigDecimal getMontant() { return montant; }
    public void setMontant(BigDecimal montant) { this.montant = montant; }
    public String getStatut() { return statut; }
    public void setStatut(String statut) { this.statut = statut; }
    public String getZonesTraversees() { return zonesTraversees; }
    public void setZonesTraversees(String zonesTraversees) { this.zonesTraversees = zonesTraversees; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
