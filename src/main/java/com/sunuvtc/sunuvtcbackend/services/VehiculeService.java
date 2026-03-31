package com.sunuvtc.sunuvtcbackend.services;


import com.sunuvtc.sunuvtcbackend.dtos.VehiculeDTO;

import java.util.List;

public interface VehiculeService {
    List<VehiculeDTO> getAllVehicules();
    VehiculeDTO getVehiculeById(Long id);
    VehiculeDTO createVehicule(VehiculeDTO dto);
    VehiculeDTO updateVehicule(Long id, VehiculeDTO dto);
    void deleteVehicule(Long id);
    VehiculeDTO assignerChauffeur(Long vehiculeId, Long chauffeurId);
}
