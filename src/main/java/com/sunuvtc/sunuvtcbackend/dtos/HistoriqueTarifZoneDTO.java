package com.sunuvtc.sunuvtcbackend.dtos;



import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class HistoriqueTarifZoneDTO {
    private Long id;

    @NotNull
    private Long zoneId;

    @NotNull
    private BigDecimal ancienTarif;

    @NotNull
    private BigDecimal nouveauTarif;

    private Long modifiePar;
    private LocalDateTime dateModification;

    // Constructeurs
    public HistoriqueTarifZoneDTO() {}
    public HistoriqueTarifZoneDTO(Long id, Long zoneId, BigDecimal ancienTarif, BigDecimal nouveauTarif,
                                  Long modifiePar, LocalDateTime dateModification) {
        this.id = id;
        this.zoneId = zoneId;
        this.ancienTarif = ancienTarif;
        this.nouveauTarif = nouveauTarif;
        this.modifiePar = modifiePar;
        this.dateModification = dateModification;
    }

    // Getters et setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getZoneId() { return zoneId; }
    public void setZoneId(Long zoneId) { this.zoneId = zoneId; }
    public BigDecimal getAncienTarif() { return ancienTarif; }
    public void setAncienTarif(BigDecimal ancienTarif) { this.ancienTarif = ancienTarif; }
    public BigDecimal getNouveauTarif() { return nouveauTarif; }
    public void setNouveauTarif(BigDecimal nouveauTarif) { this.nouveauTarif = nouveauTarif; }
    public Long getModifiePar() { return modifiePar; }
    public void setModifiePar(Long modifiePar) { this.modifiePar = modifiePar; }
    public LocalDateTime getDateModification() { return dateModification; }
    public void setDateModification(LocalDateTime dateModification) { this.dateModification = dateModification; }
}
