package com.sunuvtc.sunuvtcbackend.repositories;


import com.sunuvtc.sunuvtcbackend.entities.Alerte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AlerteRepository extends JpaRepository<Alerte, Long> {
    List<Alerte> findByChauffeurIdOrderByCreatedAtDesc(Long chauffeurId);
    List<Alerte> findByChauffeurIdAndEstLueFalse(Long chauffeurId);
}
