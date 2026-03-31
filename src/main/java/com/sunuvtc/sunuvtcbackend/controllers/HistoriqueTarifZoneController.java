package com.sunuvtc.sunuvtcbackend.controllers;



import com.sunuvtc.sunuvtcbackend.dtos.HistoriqueTarifZoneDTO;
import com.sunuvtc.sunuvtcbackend.services.HistoriqueTarifZoneService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/historique-tarifs")
@CrossOrigin(origins = "http://localhost:4200")
public class HistoriqueTarifZoneController {

    @Autowired private HistoriqueTarifZoneService service;

    @GetMapping
    public ResponseEntity<List<HistoriqueTarifZoneDTO>> getAll() {
        return ResponseEntity.ok(service.getAllHistoriques());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HistoriqueTarifZoneDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getHistoriqueById(id));
    }

    @GetMapping("/zone/{zoneId}")
    public ResponseEntity<List<HistoriqueTarifZoneDTO>> getByZone(@PathVariable Long zoneId) {
        return ResponseEntity.ok(service.getHistoriqueByZone(zoneId));
    }

    @PostMapping
    public ResponseEntity<HistoriqueTarifZoneDTO> create(@Valid @RequestBody HistoriqueTarifZoneDTO dto) {
        return new ResponseEntity<>(service.createHistorique(dto), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteHistorique(id);
        return ResponseEntity.noContent().build();
    }
}
