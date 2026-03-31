package com.sunuvtc.sunuvtcbackend.repositories;


import com.sunuvtc.sunuvtcbackend.entities.HistoriqueTarifZone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HistoriqueTarifZoneRepository extends JpaRepository<HistoriqueTarifZone, Long> {
    List<HistoriqueTarifZone> findByZoneIdOrderByDateModificationDesc(Long zoneId);
}
