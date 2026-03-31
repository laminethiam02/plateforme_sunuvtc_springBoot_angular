package com.sunuvtc.sunuvtcbackend.entities;


import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "vehicule")
public class Vehicule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 20)
    private String immatriculation;

    @Column(length = 50)
    private String marque;

    @Column(length = 50)
    private String modele;

    @Column(length = 30)
    private String couleur;

    private Integer annee;

    private Integer capacite = 4;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chauffeur_id", unique = true)
    private Chauffeur chauffeur;

    private Boolean actif = true;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // Constructeurs, getters et setters
    public Vehicule() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getImmatriculation() { return immatriculation; }
    public void setImmatriculation(String immatriculation) { this.immatriculation = immatriculation; }
    public String getMarque() { return marque; }
    public void setMarque(String marque) { this.marque = marque; }
    public String getModele() { return modele; }
    public void setModele(String modele) { this.modele = modele; }
    public String getCouleur() { return couleur; }
    public void setCouleur(String couleur) { this.couleur = couleur; }
    public Integer getAnnee() { return annee; }
    public void setAnnee(Integer annee) { this.annee = annee; }
    public Integer getCapacite() { return capacite; }
    public void setCapacite(Integer capacite) { this.capacite = capacite; }
    public Chauffeur getChauffeur() { return chauffeur; }
    public void setChauffeur(Chauffeur chauffeur) { this.chauffeur = chauffeur; }
    public Boolean getActif() { return actif; }
    public void setActif(Boolean actif) { this.actif = actif; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
