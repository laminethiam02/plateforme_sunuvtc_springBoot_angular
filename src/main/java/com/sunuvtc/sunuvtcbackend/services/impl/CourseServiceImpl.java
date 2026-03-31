package com.sunuvtc.sunuvtcbackend.services.impl;


import com.sunuvtc.sunuvtcbackend.dtos.CourseDTO;
import com.sunuvtc.sunuvtcbackend.entities.Chauffeur;
import com.sunuvtc.sunuvtcbackend.entities.Course;
import com.sunuvtc.sunuvtcbackend.repositories.ChauffeurRepository;
import com.sunuvtc.sunuvtcbackend.repositories.CourseRepository;
import com.sunuvtc.sunuvtcbackend.services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private ChauffeurRepository chauffeurRepository;

    @Override
    @Transactional(readOnly = true)
    public List<CourseDTO> getAllCourses() {
        return courseRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public CourseDTO getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course non trouvée avec id : " + id));
        return convertToDTO(course);
    }

    @Override
    public CourseDTO createCourse(CourseDTO dto) {
        Chauffeur chauffeur = chauffeurRepository.findById(dto.getChauffeurId())
                .orElseThrow(() -> new RuntimeException("Chauffeur non trouvé avec id : " + dto.getChauffeurId()));

        Course course = new Course();
        course.setChauffeur(chauffeur);
        course.setDebut(dto.getDebut());
        course.setFin(dto.getFin());
        course.setLatDepart(dto.getLatDepart());
        course.setLngDepart(dto.getLngDepart());
        course.setLatArrivee(dto.getLatArrivee());
        course.setLngArrivee(dto.getLngArrivee());
        course.setDistanceKm(dto.getDistanceKm());
        course.setMontant(dto.getMontant());
        course.setStatut(dto.getStatut() != null ? dto.getStatut() : "EN_COURSE");
        course.setZonesTraversees(dto.getZonesTraversees());

        Course saved = courseRepository.save(course);
        return convertToDTO(saved);
    }

    @Override
    public CourseDTO updateCourse(Long id, CourseDTO dto) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course non trouvée avec id : " + id));

        if (dto.getChauffeurId() != null) {
            Chauffeur chauffeur = chauffeurRepository.findById(dto.getChauffeurId())
                    .orElseThrow(() -> new RuntimeException("Chauffeur non trouvé"));
            course.setChauffeur(chauffeur);
        }

        course.setDebut(dto.getDebut());
        course.setFin(dto.getFin());
        course.setLatDepart(dto.getLatDepart());
        course.setLngDepart(dto.getLngDepart());
        course.setLatArrivee(dto.getLatArrivee());
        course.setLngArrivee(dto.getLngArrivee());
        course.setDistanceKm(dto.getDistanceKm());
        course.setMontant(dto.getMontant());
        course.setStatut(dto.getStatut());
        course.setZonesTraversees(dto.getZonesTraversees());

        Course updated = courseRepository.save(course);
        return convertToDTO(updated);
    }

    @Override
    public void deleteCourse(Long id) {
        if (!courseRepository.existsById(id)) {
            throw new RuntimeException("Course non trouvée avec id : " + id);
        }
        courseRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CourseDTO> getCoursesByChauffeur(Long chauffeurId) {
        return courseRepository.findByChauffeurId(chauffeurId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<CourseDTO> getCoursesByStatut(String statut) {
        return courseRepository.findByStatut(statut).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<CourseDTO> getCoursesByDateRange(LocalDateTime start, LocalDateTime end) {
        return courseRepository.findByDebutBetween(start, end).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private CourseDTO convertToDTO(Course course) {
        return new CourseDTO(
                course.getId(),
                course.getChauffeur().getId(),
                course.getChauffeur().getNom(),
                course.getChauffeur().getPrenom(),
                course.getDebut(),
                course.getFin(),
                course.getLatDepart(),
                course.getLngDepart(),
                course.getLatArrivee(),
                course.getLngArrivee(),
                course.getDistanceKm(),
                course.getMontant(),
                course.getStatut(),
                course.getZonesTraversees(),
                course.getCreatedAt()
        );
    }
}
