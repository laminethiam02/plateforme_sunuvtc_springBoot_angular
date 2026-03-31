package com.sunuvtc.sunuvtcbackend.services;


import com.sunuvtc.sunuvtcbackend.dtos.HistoriqueTarifZoneDTO;

import java.util.List;

public interface HistoriqueTarifZoneService {
    List<HistoriqueTarifZoneDTO> getAllHistoriques();
    HistoriqueTarifZoneDTO getHistoriqueById(Long id);
    HistoriqueTarifZoneDTO createHistorique(HistoriqueTarifZoneDTO dto);
    void deleteHistorique(Long id);
    List<HistoriqueTarifZoneDTO> getHistoriqueByZone(Long zoneId);
}
