package com.sunuvtc.sunuvtcbackend.dtos;



import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class AlerteDTO {
    private Long id;

    @NotNull
    private Long chauffeurId;

    @NotBlank
    private String typeAlerte;

    @NotBlank
    private String message;

    private BigDecimal latitude;
    private BigDecimal longitude;
    private Long zoneConcerneeId;

    private Boolean estLue;
    private LocalDateTime createdAt;

    // Constructeurs
    public AlerteDTO() {}
    public AlerteDTO(Long id, Long chauffeurId, String typeAlerte, String message,
                     BigDecimal latitude, BigDecimal longitude, Long zoneConcerneeId,
                     Boolean estLue, LocalDateTime createdAt) {
        this.id = id;
        this.chauffeurId = chauffeurId;
        this.typeAlerte = typeAlerte;
        this.message = message;
        this.latitude = latitude;
        this.longitude = longitude;
        this.zoneConcerneeId = zoneConcerneeId;
        this.estLue = estLue;
        this.createdAt = createdAt;
    }

    // Getters et setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getChauffeurId() { return chauffeurId; }
    public void setChauffeurId(Long chauffeurId) { this.chauffeurId = chauffeurId; }
    public String getTypeAlerte() { return typeAlerte; }
    public void setTypeAlerte(String typeAlerte) { this.typeAlerte = typeAlerte; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public BigDecimal getLatitude() { return latitude; }
    public void setLatitude(BigDecimal latitude) { this.latitude = latitude; }
    public BigDecimal getLongitude() { return longitude; }
    public void setLongitude(BigDecimal longitude) { this.longitude = longitude; }
    public Long getZoneConcerneeId() { return zoneConcerneeId; }
    public void setZoneConcerneeId(Long zoneConcerneeId) { this.zoneConcerneeId = zoneConcerneeId; }
    public Boolean getEstLue() { return estLue; }
    public void setEstLue(Boolean estLue) { this.estLue = estLue; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
