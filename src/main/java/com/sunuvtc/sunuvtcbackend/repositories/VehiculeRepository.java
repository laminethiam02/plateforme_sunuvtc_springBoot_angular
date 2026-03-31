package com.sunuvtc.sunuvtcbackend.repositories;


import com.sunuvtc.sunuvtcbackend.entities.Vehicule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface VehiculeRepository extends JpaRepository<Vehicule, Long> {
    Optional<Vehicule> findByImmatriculation(String immatriculation);
    Optional<Vehicule> findByChauffeurId(Long chauffeurId);
}
