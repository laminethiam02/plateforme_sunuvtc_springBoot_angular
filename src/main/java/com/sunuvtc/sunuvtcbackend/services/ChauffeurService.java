package com.sunuvtc.sunuvtcbackend.services;


import com.sunuvtc.sunuvtcbackend.dtos.ChauffeurDTO;

import java.util.List;

public interface ChauffeurService {
    List<ChauffeurDTO> getAllChauffeurs();
    ChauffeurDTO getChauffeurById(Long id);
    ChauffeurDTO createChauffeur(ChauffeurDTO dto);
    ChauffeurDTO updateChauffeur(Long id, ChauffeurDTO dto);
    void deleteChauffeur(Long id);
    List<ChauffeurDTO> getChauffeursByZone(Long zoneId);
    List<ChauffeurDTO> getChauffeursByStatut(String statut);
}
