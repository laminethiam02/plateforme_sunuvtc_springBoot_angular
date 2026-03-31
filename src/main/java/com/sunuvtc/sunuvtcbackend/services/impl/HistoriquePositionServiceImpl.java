package com.sunuvtc.sunuvtcbackend.services.impl;


import com.sunuvtc.sunuvtcbackend.dtos.HistoriquePositionDTO;
import com.sunuvtc.sunuvtcbackend.entities.Chauffeur;
import com.sunuvtc.sunuvtcbackend.entities.HistoriquePosition;
import com.sunuvtc.sunuvtcbackend.repositories.ChauffeurRepository;
import com.sunuvtc.sunuvtcbackend.repositories.HistoriquePositionRepository;
import com.sunuvtc.sunuvtcbackend.services.HistoriquePositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class HistoriquePositionServiceImpl implements HistoriquePositionService {

    @Autowired private HistoriquePositionRepository positionRepository;
    @Autowired private ChauffeurRepository chauffeurRepository;

    @Override
    @Transactional(readOnly = true)
    public List<HistoriquePositionDTO> getAllHistoriquePositions() {
        return positionRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public HistoriquePositionDTO getHistoriquePositionById(Long id) {
        HistoriquePosition p = positionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Position non trouvée"));
        return convertToDTO(p);
    }

    @Override
    public HistoriquePositionDTO createHistoriquePosition(HistoriquePositionDTO dto) {
        Chauffeur chauffeur = chauffeurRepository.findById(dto.getChauffeurId())
                .orElseThrow(() -> new RuntimeException("Chauffeur non trouvé"));

        HistoriquePosition p = new HistoriquePosition();
        p.setChauffeur(chauffeur);
        p.setLatitude(dto.getLatitude());
        p.setLongitude(dto.getLongitude());
        p.setStatutVehicule(dto.getStatutVehicule());
        p.setVitesseKmh(dto.getVitesseKmh());
        p.setTimestampPosition(dto.getTimestampPosition());

        HistoriquePosition saved = positionRepository.save(p);
        return convertToDTO(saved);
    }

    @Override
    public void deleteHistoriquePosition(Long id) {
        if (!positionRepository.existsById(id))
            throw new RuntimeException("Position non trouvée");
        positionRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<HistoriquePositionDTO> getHistoriqueByChauffeur(Long chauffeurId) {
        return positionRepository.findByChauffeurIdOrderByTimestampPositionDesc(chauffeurId)
                .stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private HistoriquePositionDTO convertToDTO(HistoriquePosition p) {
        return new HistoriquePositionDTO(
                p.getId(),
                p.getChauffeur().getId(),
                p.getLatitude(),
                p.getLongitude(),
                p.getStatutVehicule(),
                p.getVitesseKmh(),
                p.getTimestampPosition(),
                p.getCreatedAt()
        );
    }
}
