package com.sunuvtc.sunuvtcbackend.dtos;



import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

public class VehiculeDTO {
    private Long id;

    @NotBlank
    private String immatriculation;

    private String marque;
    private String modele;
    private String couleur;

    @PositiveOrZero
    private Integer annee;

    @Positive
    private Integer capacite;

    private Long chauffeurId;   // pour l'assignation
    private Boolean actif;

    // Constructeurs
    public VehiculeDTO() {}
    public VehiculeDTO(Long id, String immatriculation, String marque, String modele, String couleur,
                       Integer annee, Integer capacite, Long chauffeurId, Boolean actif) {
        this.id = id;
        this.immatriculation = immatriculation;
        this.marque = marque;
        this.modele = modele;
        this.couleur = couleur;
        this.annee = annee;
        this.capacite = capacite;
        this.chauffeurId = chauffeurId;
        this.actif = actif;
    }

    // Getters et setters
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
    public Long getChauffeurId() { return chauffeurId; }
    public void setChauffeurId(Long chauffeurId) { this.chauffeurId = chauffeurId; }
    public Boolean getActif() { return actif; }
    public void setActif(Boolean actif) { this.actif = actif; }
}
