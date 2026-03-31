package com.sunuvtc.sunuvtcbackend.dtos;



import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class AuditLogDTO {
    private Long id;

    @NotNull
    private String utilisateurType; // "CHAUFFEUR" ou "ADMIN"

    @NotNull
    private Long utilisateurId;

    @NotBlank
    private String action;

    private String details; // JSON en String
    private String ipAddress;
    private LocalDateTime createdAt;

    // Constructeurs
    public AuditLogDTO() {}
    public AuditLogDTO(Long id, String utilisateurType, Long utilisateurId, String action,
                       String details, String ipAddress, LocalDateTime createdAt) {
        this.id = id;
        this.utilisateurType = utilisateurType;
        this.utilisateurId = utilisateurId;
        this.action = action;
        this.details = details;
        this.ipAddress = ipAddress;
        this.createdAt = createdAt;
    }

    // Getters et setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUtilisateurType() { return utilisateurType; }
    public void setUtilisateurType(String utilisateurType) { this.utilisateurType = utilisateurType; }
    public Long getUtilisateurId() { return utilisateurId; }
    public void setUtilisateurId(Long utilisateurId) { this.utilisateurId = utilisateurId; }
    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }
    public String getIpAddress() { return ipAddress; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
