package com.sunuvtc.sunuvtcbackend.services.impl;


import com.sunuvtc.sunuvtcbackend.dtos.ZoneDTO;
import com.sunuvtc.sunuvtcbackend.entities.Zone;
import com.sunuvtc.sunuvtcbackend.repositories.ZoneRepository;
import com.sunuvtc.sunuvtcbackend.services.ZoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ZoneServiceImpl implements ZoneService {

    @Autowired
    private ZoneRepository zoneRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ZoneDTO> getAllZones() {
        return zoneRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ZoneDTO getZoneById(Long id) {
        Zone zone = zoneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Zone non trouvée avec id : " + id));
        return convertToDTO(zone);
    }

    @Override
    public ZoneDTO createZone(ZoneDTO dto) {
        Zone zone = new Zone();
        zone.setNom(dto.getNom());
        zone.setCouleur(dto.getCouleur());
        zone.setTarif(dto.getTarif());
        zone.setActif(dto.getActif() != null ? dto.getActif() : true);
        zone.setGeom(dto.getGeom());

        Zone saved = zoneRepository.save(zone);
        return convertToDTO(saved);
    }

    @Override
    public ZoneDTO updateZone(Long id, ZoneDTO dto) {
        Zone zone = zoneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Zone non trouvée avec id : " + id));

        zone.setNom(dto.getNom());
        zone.setCouleur(dto.getCouleur());
        zone.setTarif(dto.getTarif());
        zone.setActif(dto.getActif());
        zone.setGeom(dto.getGeom());

        Zone updated = zoneRepository.save(zone);
        return convertToDTO(updated);
    }

    @Override
    public void deleteZone(Long id) {
        if (!zoneRepository.existsById(id)) {
            throw new RuntimeException("Zone non trouvée avec id : " + id);
        }
        zoneRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ZoneDTO> getActiveZones() {
        return zoneRepository.findByActifTrue().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private ZoneDTO convertToDTO(Zone zone) {
        return new ZoneDTO(
                zone.getId(),
                zone.getNom(),
                zone.getCouleur(),
                zone.getTarif(),
                zone.getActif(),
                zone.getGeom()
        );
    }
}
