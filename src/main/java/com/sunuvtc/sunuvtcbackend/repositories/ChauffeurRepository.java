package com.sunuvtc.sunuvtcbackend.repositories;


import com.sunuvtc.sunuvtcbackend.entities.Chauffeur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ChauffeurRepository extends JpaRepository<Chauffeur, Long> {
    Optional<Chauffeur> findByEmail(String email);
    List<Chauffeur> findByStatutVehicule(String statut);
    List<Chauffeur> findByZoneAssigneeId(Long zoneId);
}
