package com.sunuvtc.sunuvtcbackend.dtos;



import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class CourseDTO {
    private Long id;

    @NotNull
    private Long chauffeurId;
    private String chauffeurNom;
    private String chauffeurPrenom;

    @NotNull
    private LocalDateTime debut;

    private LocalDateTime fin;

    @NotNull
    private BigDecimal latDepart;

    @NotNull
    private BigDecimal lngDepart;

    private BigDecimal latArrivee;
    private BigDecimal lngArrivee;

    @Positive
    private BigDecimal distanceKm;

    @Positive
    private BigDecimal montant;

    private String statut;

    private String zonesTraversees;

    private LocalDateTime createdAt;

    // Constructors
    public CourseDTO() {}

    public CourseDTO(Long id, Long chauffeurId, String chauffeurNom, String chauffeurPrenom,
                     LocalDateTime debut, LocalDateTime fin, BigDecimal latDepart, BigDecimal lngDepart,
                     BigDecimal latArrivee, BigDecimal lngArrivee, BigDecimal distanceKm,
                     BigDecimal montant, String statut, String zonesTraversees, LocalDateTime createdAt) {
        this.id = id;
        this.chauffeurId = chauffeurId;
        this.chauffeurNom = chauffeurNom;
        this.chauffeurPrenom = chauffeurPrenom;
        this.debut = debut;
        this.fin = fin;
        this.latDepart = latDepart;
        this.lngDepart = lngDepart;
        this.latArrivee = latArrivee;
        this.lngArrivee = lngArrivee;
        this.distanceKm = distanceKm;
        this.montant = montant;
        this.statut = statut;
        this.zonesTraversees = zonesTraversees;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getChauffeurId() { return chauffeurId; }
    public void setChauffeurId(Long chauffeurId) { this.chauffeurId = chauffeurId; }
    public String getChauffeurNom() { return chauffeurNom; }
    public void setChauffeurNom(String chauffeurNom) { this.chauffeurNom = chauffeurNom; }
    public String getChauffeurPrenom() { return chauffeurPrenom; }
    public void setChauffeurPrenom(String chauffeurPrenom) { this.chauffeurPrenom = chauffeurPrenom; }
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
