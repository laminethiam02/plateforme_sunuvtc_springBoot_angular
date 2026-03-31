package com.sunuvtc.sunuvtcbackend.entities;



import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "historique_tarif_zone")
public class HistoriqueTarifZone {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "zone_id", nullable = false)
    private Zone zone;

    @Column(name = "ancien_tarif", nullable = false, precision = 10, scale = 2)
    private BigDecimal ancienTarif;

    @Column(name = "nouveau_tarif", nullable = false, precision = 10, scale = 2)
    private BigDecimal nouveauTarif;

    @Column(name = "modifie_par")
    private Long modifiePar; // id du chauffeur ou admin

    @Column(name = "date_modification")
    private LocalDateTime dateModification = LocalDateTime.now();

    // Constructeurs, getters et setters
    public HistoriqueTarifZone() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Zone getZone() { return zone; }
    public void setZone(Zone zone) { this.zone = zone; }
    public BigDecimal getAncienTarif() { return ancienTarif; }
    public void setAncienTarif(BigDecimal ancienTarif) { this.ancienTarif = ancienTarif; }
    public BigDecimal getNouveauTarif() { return nouveauTarif; }
    public void setNouveauTarif(BigDecimal nouveauTarif) { this.nouveauTarif = nouveauTarif; }
    public Long getModifiePar() { return modifiePar; }
    public void setModifiePar(Long modifiePar) { this.modifiePar = modifiePar; }
    public LocalDateTime getDateModification() { return dateModification; }
    public void setDateModification(LocalDateTime dateModification) { this.dateModification = dateModification; }
}
