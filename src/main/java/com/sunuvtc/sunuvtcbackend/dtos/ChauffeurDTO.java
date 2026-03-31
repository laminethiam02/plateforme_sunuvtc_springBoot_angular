package com.sunuvtc.sunuvtcbackend.dtos;



import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ChauffeurDTO {
    private Long id;

    @NotBlank @Email @Size(max = 100)
    private String email;

    @NotBlank @Size(min = 6)
    private String password;

    @Size(max = 50)
    private String nom;

    @Size(max = 50)
    private String prenom;

    private String statutVehicule;

    private Long zoneAssigneeId;
    private String zoneAssigneeNom;

    // Constructors
    public ChauffeurDTO() {}

    public ChauffeurDTO(Long id, String email, String nom, String prenom,
                        String statutVehicule, Long zoneAssigneeId, String zoneAssigneeNom) {
        this.id = id;
        this.email = email;
        this.nom = nom;
        this.prenom = prenom;
        this.statutVehicule = statutVehicule;
        this.zoneAssigneeId = zoneAssigneeId;
        this.zoneAssigneeNom = zoneAssigneeNom;
    }

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
    public Long getZoneAssigneeId() { return zoneAssigneeId; }
    public void setZoneAssigneeId(Long zoneAssigneeId) { this.zoneAssigneeId = zoneAssigneeId; }
    public String getZoneAssigneeNom() { return zoneAssigneeNom; }
    public void setZoneAssigneeNom(String zoneAssigneeNom) { this.zoneAssigneeNom = zoneAssigneeNom; }
}
