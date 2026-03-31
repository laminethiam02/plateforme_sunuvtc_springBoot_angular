package com.sunuvtc.sunuvtcbackend.controllers;


import com.sunuvtc.sunuvtcbackend.dtos.ChauffeurDTO;
import com.sunuvtc.sunuvtcbackend.services.ChauffeurService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chauffeurs")
@CrossOrigin(origins = "http://localhost:4200")
public class ChauffeurController {

    @Autowired
    private ChauffeurService chauffeurService;

    @GetMapping
    public ResponseEntity<List<ChauffeurDTO>> getAllChauffeurs() {
        return ResponseEntity.ok(chauffeurService.getAllChauffeurs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChauffeurDTO> getChauffeurById(@PathVariable Long id) {
        return ResponseEntity.ok(chauffeurService.getChauffeurById(id));
    }

    @GetMapping("/by-zone/{zoneId}")
    public ResponseEntity<List<ChauffeurDTO>> getChauffeursByZone(@PathVariable Long zoneId) {
        return ResponseEntity.ok(chauffeurService.getChauffeursByZone(zoneId));
    }

    @GetMapping("/by-statut/{statut}")
    public ResponseEntity<List<ChauffeurDTO>> getChauffeursByStatut(@PathVariable String statut) {
        return ResponseEntity.ok(chauffeurService.getChauffeursByStatut(statut));
    }

    @PostMapping
    public ResponseEntity<ChauffeurDTO> createChauffeur(@Valid @RequestBody ChauffeurDTO dto) {
        ChauffeurDTO created = chauffeurService.createChauffeur(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ChauffeurDTO> updateChauffeur(@PathVariable Long id, @Valid @RequestBody ChauffeurDTO dto) {
        ChauffeurDTO updated = chauffeurService.updateChauffeur(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChauffeur(@PathVariable Long id) {
        chauffeurService.deleteChauffeur(id);
        return ResponseEntity.noContent().build();
    }
}
