package com.sunuvtc.sunuvtcbackend.services;


import com.sunuvtc.sunuvtcbackend.dtos.ZoneDTO;

import java.util.List;

public interface ZoneService {
    List<ZoneDTO> getAllZones();
    ZoneDTO getZoneById(Long id);
    ZoneDTO createZone(ZoneDTO dto);
    ZoneDTO updateZone(Long id, ZoneDTO dto);
    void deleteZone(Long id);
    List<ZoneDTO> getActiveZones();
}
