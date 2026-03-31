package com.sunuvtc.sunuvtcbackend.entities;



import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "audit_log")
public class AuditLog {
    public enum UtilisateurType {
        CHAUFFEUR, ADMIN
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "utilisateur_type", nullable = false, length = 10)
    private UtilisateurType utilisateurType;

    @Column(name = "utilisateur_id", nullable = false)
    private Long utilisateurId;

    @Column(nullable = false, length = 100)
    private String action;

    @Column(columnDefinition = "JSON")
    private String details;

    @Column(name = "ip_address", length = 45)
    private String ipAddress;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // Constructeurs, getters et setters
    public AuditLog() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public UtilisateurType getUtilisateurType() { return utilisateurType; }
    public void setUtilisateurType(UtilisateurType utilisateurType) { this.utilisateurType = utilisateurType; }
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
