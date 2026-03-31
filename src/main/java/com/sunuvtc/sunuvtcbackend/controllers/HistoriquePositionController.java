package com.sunuvtc.sunuvtcbackend.controllers;


import com.sunuvtc.sunuvtcbackend.dtos.HistoriquePositionDTO;
import com.sunuvtc.sunuvtcbackend.services.HistoriquePositionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/historique-positions")
@CrossOrigin(origins = "http://localhost:4200")
public class HistoriquePositionController {

    @Autowired private HistoriquePositionService service;

    @GetMapping
    public ResponseEntity<List<HistoriquePositionDTO>> getAll() {
        return ResponseEntity.ok(service.getAllHistoriquePositions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HistoriquePositionDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getHistoriquePositionById(id));
    }

    @GetMapping("/chauffeur/{chauffeurId}")
    public ResponseEntity<List<HistoriquePositionDTO>> getByChauffeur(@PathVariable Long chauffeurId) {
        return ResponseEntity.ok(service.getHistoriqueByChauffeur(chauffeurId));
    }

    @PostMapping
    public ResponseEntity<HistoriquePositionDTO> create(@Valid @RequestBody HistoriquePositionDTO dto) {
        return new ResponseEntity<>(service.createHistoriquePosition(dto), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteHistoriquePosition(id);
        return ResponseEntity.noContent().build();
    }
}
