package com.sunuvtc.sunuvtcbackend.dtos;



import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class HistoriquePositionDTO {
    private Long id;

    @NotNull
    private Long chauffeurId;

    @NotNull
    private BigDecimal latitude;

    @NotNull
    private BigDecimal longitude;

    private String statutVehicule;
    private BigDecimal vitesseKmh;

    @NotNull
    private LocalDateTime timestampPosition;

    private LocalDateTime createdAt;

    // Constructeurs
    public HistoriquePositionDTO() {}
    public HistoriquePositionDTO(Long id, Long chauffeurId, BigDecimal latitude, BigDecimal longitude,
                                 String statutVehicule, BigDecimal vitesseKmh,
                                 LocalDateTime timestampPosition, LocalDateTime createdAt) {
        this.id = id;
        this.chauffeurId = chauffeurId;
        this.latitude = latitude;
        this.longitude = longitude;
        this.statutVehicule = statutVehicule;
        this.vitesseKmh = vitesseKmh;
        this.timestampPosition = timestampPosition;
        this.createdAt = createdAt;
    }

    // Getters et setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getChauffeurId() { return chauffeurId; }
    public void setChauffeurId(Long chauffeurId) { this.chauffeurId = chauffeurId; }
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
