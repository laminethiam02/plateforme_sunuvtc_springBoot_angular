package com.sunuvtc.sunuvtcbackend.services.impl;


import com.sunuvtc.sunuvtcbackend.dtos.AvisClientDTO;
import com.sunuvtc.sunuvtcbackend.entities.AvisClient;
import com.sunuvtc.sunuvtcbackend.entities.Course;
import com.sunuvtc.sunuvtcbackend.repositories.AvisClientRepository;
import com.sunuvtc.sunuvtcbackend.repositories.CourseRepository;
import com.sunuvtc.sunuvtcbackend.services.AvisClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class AvisClientServiceImpl implements AvisClientService {

    @Autowired private AvisClientRepository avisRepository;
    @Autowired private CourseRepository courseRepository;

    @Override
    @Transactional(readOnly = true)
    public List<AvisClientDTO> getAllAvis() {
        return avisRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public AvisClientDTO getAvisById(Long id) {
        AvisClient a = avisRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Avis non trouvé"));
        return convertToDTO(a);
    }

    @Override
    public AvisClientDTO createAvis(AvisClientDTO dto) {
        Course course = courseRepository.findById(dto.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course non trouvée"));

        // Vérifier qu'un avis n'existe pas déjà pour cette course
        if (avisRepository.findByCourseId(dto.getCourseId()).isPresent()) {
            throw new RuntimeException("Un avis existe déjà pour cette course");
        }

        AvisClient a = new AvisClient();
        a.setCourse(course);
        a.setNote(dto.getNote());
        a.setCommentaire(dto.getCommentaire());

        AvisClient saved = avisRepository.save(a);
        return convertToDTO(saved);
    }

    @Override
    public AvisClientDTO updateAvis(Long id, AvisClientDTO dto) {
        AvisClient a = avisRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Avis non trouvé"));
        a.setNote(dto.getNote());
        a.setCommentaire(dto.getCommentaire());
        AvisClient updated = avisRepository.save(a);
        return convertToDTO(updated);
    }

    @Override
    public void deleteAvis(Long id) {
        if (!avisRepository.existsById(id))
            throw new RuntimeException("Avis non trouvé");
        avisRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public AvisClientDTO getAvisByCourse(Long courseId) {
        return avisRepository.findByCourseId(courseId)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Avis non trouvé pour cette course"));
    }

    @Override
    @Transactional(readOnly = true)
    public List<AvisClientDTO> getAvisByNote(Integer note) {
        // Cette méthode nécessite un findByNote dans le repository, sinon on peut filtrer manuellement
        return avisRepository.findAll().stream()
                .filter(a -> a.getNote().equals(note))
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private AvisClientDTO convertToDTO(AvisClient a) {
        return new AvisClientDTO(
                a.getId(),
                a.getCourse().getId(),
                a.getNote(),
                a.getCommentaire(),
                a.getDateAvis()
        );
    }
}
