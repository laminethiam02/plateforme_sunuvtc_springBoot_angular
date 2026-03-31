package com.sunuvtc.sunuvtcbackend.services;


import com.sunuvtc.sunuvtcbackend.dtos.CourseDTO;

import java.time.LocalDateTime;
import java.util.List;

public interface CourseService {
    List<CourseDTO> getAllCourses();
    CourseDTO getCourseById(Long id);
    CourseDTO createCourse(CourseDTO dto);
    CourseDTO updateCourse(Long id, CourseDTO dto);
    void deleteCourse(Long id);
    List<CourseDTO> getCoursesByChauffeur(Long chauffeurId);
    List<CourseDTO> getCoursesByStatut(String statut);
    List<CourseDTO> getCoursesByDateRange(LocalDateTime start, LocalDateTime end);
}
