package com.sunuvtc.sunuvtcbackend.services.impl;


import com.sunuvtc.sunuvtcbackend.dtos.AlerteDTO;
import com.sunuvtc.sunuvtcbackend.entities.Alerte;
import com.sunuvtc.sunuvtcbackend.entities.Chauffeur;
import com.sunuvtc.sunuvtcbackend.entities.Zone;
import com.sunuvtc.sunuvtcbackend.repositories.AlerteRepository;
import com.sunuvtc.sunuvtcbackend.repositories.ChauffeurRepository;
import com.sunuvtc.sunuvtcbackend.repositories.ZoneRepository;
import com.sunuvtc.sunuvtcbackend.services.AlerteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class AlerteServiceImpl implements AlerteService {

    @Autowired private AlerteRepository alerteRepository;
    @Autowired private ChauffeurRepository chauffeurRepository;
    @Autowired private ZoneRepository zoneRepository;

    @Override
    @Transactional(readOnly = true)
    public List<AlerteDTO> getAllAlertes() {
        return alerteRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public AlerteDTO getAlerteById(Long id) {
        Alerte a = alerteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Alerte non trouvée"));
        return convertToDTO(a);
    }

    @Override
    public AlerteDTO createAlerte(AlerteDTO dto) {
        Chauffeur chauffeur = chauffeurRepository.findById(dto.getChauffeurId())
                .orElseThrow(() -> new RuntimeException("Chauffeur non trouvé"));

        Alerte a = new Alerte();
        a.setChauffeur(chauffeur);
        a.setTypeAlerte(dto.getTypeAlerte());
        a.setMessage(dto.getMessage());
        a.setLatitude(dto.getLatitude());
        a.setLongitude(dto.getLongitude());
        if (dto.getZoneConcerneeId() != null) {
            Zone zone = zoneRepository.findById(dto.getZoneConcerneeId())
                    .orElseThrow(() -> new RuntimeException("Zone non trouvée"));
            a.setZoneConcernee(zone);
        }
        a.setEstLue(dto.getEstLue() != null ? dto.getEstLue() : false);

        Alerte saved = alerteRepository.save(a);
        return convertToDTO(saved);
    }

    @Override
    public AlerteDTO updateAlerte(Long id, AlerteDTO dto) {
        Alerte a = alerteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Alerte non trouvée"));
        a.setTypeAlerte(dto.getTypeAlerte());
        a.setMessage(dto.getMessage());
        a.setLatitude(dto.getLatitude());
        a.setLongitude(dto.getLongitude());
        if (dto.getZoneConcerneeId() != null) {
            Zone zone = zoneRepository.findById(dto.getZoneConcerneeId())
                    .orElseThrow(() -> new RuntimeException("Zone non trouvée"));
            a.setZoneConcernee(zone);
        } else {
            a.setZoneConcernee(null);
        }
        a.setEstLue(dto.getEstLue());
        Alerte updated = alerteRepository.save(a);
        return convertToDTO(updated);
    }

    @Override
    public void deleteAlerte(Long id) {
        if (!alerteRepository.existsById(id))
            throw new RuntimeException("Alerte non trouvée");
        alerteRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AlerteDTO> getAlertesByChauffeur(Long chauffeurId) {
        return alerteRepository.findByChauffeurIdOrderByCreatedAtDesc(chauffeurId)
                .stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<AlerteDTO> getAlertesNonLuesByChauffeur(Long chauffeurId) {
        return alerteRepository.findByChauffeurIdAndEstLueFalse(chauffeurId)
                .stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public void marquerCommeLue(Long id) {
        Alerte a = alerteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Alerte non trouvée"));
        a.setEstLue(true);
        alerteRepository.save(a);
    }

    private AlerteDTO convertToDTO(Alerte a) {
        return new AlerteDTO(
                a.getId(),
                a.getChauffeur().getId(),
                a.getTypeAlerte(),
                a.getMessage(),
                a.getLatitude(),
                a.getLongitude(),
                a.getZoneConcernee() != null ? a.getZoneConcernee().getId() : null,
                a.getEstLue(),
                a.getCreatedAt()
        );
    }
}
