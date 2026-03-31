package com.sunuvtc.sunuvtcbackend.services;


import com.sunuvtc.sunuvtcbackend.dtos.AlerteDTO;

import java.util.List;

public interface AlerteService {
    List<AlerteDTO> getAllAlertes();
    AlerteDTO getAlerteById(Long id);
    AlerteDTO createAlerte(AlerteDTO dto);
    AlerteDTO updateAlerte(Long id, AlerteDTO dto);
    void deleteAlerte(Long id);
    List<AlerteDTO> getAlertesByChauffeur(Long chauffeurId);
    List<AlerteDTO> getAlertesNonLuesByChauffeur(Long chauffeurId);
    void marquerCommeLue(Long id);
}
