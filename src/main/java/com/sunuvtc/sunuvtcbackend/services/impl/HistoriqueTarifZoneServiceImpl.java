package com.sunuvtc.sunuvtcbackend.services.impl;


import com.sunuvtc.sunuvtcbackend.dtos.HistoriqueTarifZoneDTO;
import com.sunuvtc.sunuvtcbackend.entities.HistoriqueTarifZone;
import com.sunuvtc.sunuvtcbackend.entities.Zone;
import com.sunuvtc.sunuvtcbackend.repositories.HistoriqueTarifZoneRepository;
import com.sunuvtc.sunuvtcbackend.repositories.ZoneRepository;
import com.sunuvtc.sunuvtcbackend.services.HistoriqueTarifZoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class HistoriqueTarifZoneServiceImpl implements HistoriqueTarifZoneService {

    @Autowired private HistoriqueTarifZoneRepository historiqueRepository;
    @Autowired private ZoneRepository zoneRepository;

    @Override
    @Transactional(readOnly = true)
    public List<HistoriqueTarifZoneDTO> getAllHistoriques() {
        return historiqueRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public HistoriqueTarifZoneDTO getHistoriqueById(Long id) {
        HistoriqueTarifZone h = historiqueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Historique non trouvé"));
        return convertToDTO(h);
    }

    @Override
    public HistoriqueTarifZoneDTO createHistorique(HistoriqueTarifZoneDTO dto) {
        Zone zone = zoneRepository.findById(dto.getZoneId())
                .orElseThrow(() -> new RuntimeException("Zone non trouvée"));

        HistoriqueTarifZone h = new HistoriqueTarifZone();
        h.setZone(zone);
        h.setAncienTarif(dto.getAncienTarif());
        h.setNouveauTarif(dto.getNouveauTarif());
        h.setModifiePar(dto.getModifiePar());

        HistoriqueTarifZone saved = historiqueRepository.save(h);
        return convertToDTO(saved);
    }

    @Override
    public void deleteHistorique(Long id) {
        if (!historiqueRepository.existsById(id))
            throw new RuntimeException("Historique non trouvé");
        historiqueRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<HistoriqueTarifZoneDTO> getHistoriqueByZone(Long zoneId) {
        return historiqueRepository.findByZoneIdOrderByDateModificationDesc(zoneId)
                .stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private HistoriqueTarifZoneDTO convertToDTO(HistoriqueTarifZone h) {
        return new HistoriqueTarifZoneDTO(
                h.getId(),
                h.getZone().getId(),
                h.getAncienTarif(),
                h.getNouveauTarif(),
                h.getModifiePar(),
                h.getDateModification()
        );
    }
}
