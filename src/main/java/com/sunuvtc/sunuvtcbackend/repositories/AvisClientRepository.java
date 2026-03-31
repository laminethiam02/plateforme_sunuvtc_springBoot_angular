package com.sunuvtc.sunuvtcbackend.repositories;


import com.sunuvtc.sunuvtcbackend.entities.AvisClient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface AvisClientRepository extends JpaRepository<AvisClient, Long> {
    Optional<AvisClient> findByCourseId(Long courseId);
}
