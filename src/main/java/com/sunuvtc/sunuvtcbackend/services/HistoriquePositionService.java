package com.sunuvtc.sunuvtcbackend.services;


import com.sunuvtc.sunuvtcbackend.dtos.HistoriquePositionDTO;

import java.util.List;

public interface HistoriquePositionService {
    List<HistoriquePositionDTO> getAllHistoriquePositions();
    HistoriquePositionDTO getHistoriquePositionById(Long id);
    HistoriquePositionDTO createHistoriquePosition(HistoriquePositionDTO dto);
    void deleteHistoriquePosition(Long id);
    List<HistoriquePositionDTO> getHistoriqueByChauffeur(Long chauffeurId);
}
