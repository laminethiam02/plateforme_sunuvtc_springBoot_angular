package com.sunuvtc.sunuvtcbackend.services.impl;


import com.sunuvtc.sunuvtcbackend.dtos.VehiculeDTO;
import com.sunuvtc.sunuvtcbackend.entities.Chauffeur;
import com.sunuvtc.sunuvtcbackend.entities.Vehicule;
import com.sunuvtc.sunuvtcbackend.repositories.ChauffeurRepository;
import com.sunuvtc.sunuvtcbackend.repositories.VehiculeRepository;
import com.sunuvtc.sunuvtcbackend.services.VehiculeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class VehiculeServiceImpl implements VehiculeService {

    @Autowired private VehiculeRepository vehiculeRepository;
    @Autowired private ChauffeurRepository chauffeurRepository;

    @Override
    @Transactional(readOnly = true)
    public List<VehiculeDTO> getAllVehicules() {
        return vehiculeRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public VehiculeDTO getVehiculeById(Long id) {
        Vehicule v = vehiculeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Véhicule non trouvé"));
        return convertToDTO(v);
    }

    @Override
    public VehiculeDTO createVehicule(VehiculeDTO dto) {
        Vehicule v = new Vehicule();
        v.setImmatriculation(dto.getImmatriculation());
        v.setMarque(dto.getMarque());
        v.setModele(dto.getModele());
        v.setCouleur(dto.getCouleur());
        v.setAnnee(dto.getAnnee());
        v.setCapacite(dto.getCapacite());
        v.setActif(dto.getActif() != null ? dto.getActif() : true);
        if (dto.getChauffeurId() != null) {
            Chauffeur c = chauffeurRepository.findById(dto.getChauffeurId())
                    .orElseThrow(() -> new RuntimeException("Chauffeur non trouvé"));
            v.setChauffeur(c);
        }
        return convertToDTO(vehiculeRepository.save(v));
    }

    @Override
    public VehiculeDTO updateVehicule(Long id, VehiculeDTO dto) {
        Vehicule v = vehiculeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Véhicule non trouvé"));
        v.setImmatriculation(dto.getImmatriculation());
        v.setMarque(dto.getMarque());
        v.setModele(dto.getModele());
        v.setCouleur(dto.getCouleur());
        v.setAnnee(dto.getAnnee());
        v.setCapacite(dto.getCapacite());
        v.setActif(dto.getActif());
        if (dto.getChauffeurId() != null) {
            Chauffeur c = chauffeurRepository.findById(dto.getChauffeurId())
                    .orElseThrow(() -> new RuntimeException("Chauffeur non trouvé"));
            v.setChauffeur(c);
        } else {
            v.setChauffeur(null);
        }
        return convertToDTO(vehiculeRepository.save(v));
    }

    @Override
    public void deleteVehicule(Long id) {
        if (!vehiculeRepository.existsById(id))
            throw new RuntimeException("Véhicule non trouvé");
        vehiculeRepository.deleteById(id);
    }

    @Override
    public VehiculeDTO assignerChauffeur(Long vehiculeId, Long chauffeurId) {
        Vehicule v = vehiculeRepository.findById(vehiculeId)
                .orElseThrow(() -> new RuntimeException("Véhicule non trouvé"));
        Chauffeur c = chauffeurRepository.findById(chauffeurId)
                .orElseThrow(() -> new RuntimeException("Chauffeur non trouvé"));
        v.setChauffeur(c);
        return convertToDTO(vehiculeRepository.save(v));
    }

    private VehiculeDTO convertToDTO(Vehicule v) {
        return new VehiculeDTO(
                v.getId(),
                v.getImmatriculation(),
                v.getMarque(),
                v.getModele(),
                v.getCouleur(),
                v.getAnnee(),
                v.getCapacite(),
                v.getChauffeur() != null ? v.getChauffeur().getId() : null,
                v.getActif()
        );
    }
}
