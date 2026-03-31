package com.sunuvtc.sunuvtcbackend.services.impl;


import com.sunuvtc.sunuvtcbackend.dtos.ChauffeurDTO;
import com.sunuvtc.sunuvtcbackend.entities.Chauffeur;
import com.sunuvtc.sunuvtcbackend.entities.Zone;
import com.sunuvtc.sunuvtcbackend.repositories.ChauffeurRepository;
import com.sunuvtc.sunuvtcbackend.repositories.ZoneRepository;
import com.sunuvtc.sunuvtcbackend.services.ChauffeurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ChauffeurServiceImpl implements ChauffeurService {

    @Autowired
    private ChauffeurRepository chauffeurRepository;

    @Autowired
    private ZoneRepository zoneRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ChauffeurDTO> getAllChauffeurs() {
        return chauffeurRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ChauffeurDTO getChauffeurById(Long id) {
        Chauffeur chauffeur = chauffeurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Chauffeur non trouvé avec id : " + id));
        return convertToDTO(chauffeur);
    }



    @Override
    public ChauffeurDTO createChauffeur(ChauffeurDTO dto) {
        Chauffeur chauffeur = new Chauffeur();
        chauffeur.setEmail(dto.getEmail());
        chauffeur.setPassword(dto.getPassword()); // In a real app, encode password!
        chauffeur.setNom(dto.getNom());
        chauffeur.setPrenom(dto.getPrenom());
        chauffeur.setStatutVehicule(dto.getStatutVehicule() != null ? dto.getStatutVehicule() : "HORS_SERVICE");

        if (dto.getZoneAssigneeId() != null) {
            Zone zone = zoneRepository.findById(dto.getZoneAssigneeId())
                    .orElseThrow(() -> new RuntimeException("Zone non trouvée"));
            chauffeur.setZoneAssignee(zone);
        }

        Chauffeur saved = chauffeurRepository.save(chauffeur);
        return convertToDTO(saved);
    }

    @Override
    public ChauffeurDTO updateChauffeur(Long id, ChauffeurDTO dto) {
        Chauffeur chauffeur = chauffeurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Chauffeur non trouvé avec id : " + id));

        chauffeur.setEmail(dto.getEmail());
        if (dto.getPassword() != null) {
            chauffeur.setPassword(dto.getPassword());
        }
        chauffeur.setNom(dto.getNom());
        chauffeur.setPrenom(dto.getPrenom());
        chauffeur.setStatutVehicule(dto.getStatutVehicule());

        if (dto.getZoneAssigneeId() != null) {
            Zone zone = zoneRepository.findById(dto.getZoneAssigneeId())
                    .orElseThrow(() -> new RuntimeException("Zone non trouvée"));
            chauffeur.setZoneAssignee(zone);
        } else {
            chauffeur.setZoneAssignee(null);
        }

        Chauffeur updated = chauffeurRepository.save(chauffeur);
        return convertToDTO(updated);
    }

    @Override
    public void deleteChauffeur(Long id) {
        if (!chauffeurRepository.existsById(id)) {
            throw new RuntimeException("Chauffeur non trouvé avec id : " + id);
        }
        chauffeurRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ChauffeurDTO> getChauffeursByZone(Long zoneId) {
        return chauffeurRepository.findByZoneAssigneeId(zoneId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ChauffeurDTO> getChauffeursByStatut(String statut) {
        return chauffeurRepository.findByStatutVehicule(statut).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private ChauffeurDTO convertToDTO(Chauffeur chauffeur) {
        return new ChauffeurDTO(
                chauffeur.getId(),
                chauffeur.getEmail(),
                chauffeur.getNom(),
                chauffeur.getPrenom(),
                chauffeur.getStatutVehicule(),
                chauffeur.getZoneAssignee() != null ? chauffeur.getZoneAssignee().getId() : null,
                chauffeur.getZoneAssignee() != null ? chauffeur.getZoneAssignee().getNom() : null
        );
    }
}
