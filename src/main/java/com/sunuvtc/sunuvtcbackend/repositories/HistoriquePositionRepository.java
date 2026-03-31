package com.sunuvtc.sunuvtcbackend.repositories;


import com.sunuvtc.sunuvtcbackend.entities.HistoriquePosition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HistoriquePositionRepository extends JpaRepository<HistoriquePosition, Long> {
    List<HistoriquePosition> findByChauffeurIdOrderByTimestampPositionDesc(Long chauffeurId);
}
