package com.sunuvtc.sunuvtcbackend.repositories;


import com.sunuvtc.sunuvtcbackend.entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByChauffeurId(Long chauffeurId);
    List<Course> findByStatut(String statut);
    List<Course> findByDebutBetween(LocalDateTime start, LocalDateTime end);
}
