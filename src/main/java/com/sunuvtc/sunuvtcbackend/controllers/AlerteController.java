package com.sunuvtc.sunuvtcbackend.controllers;


import com.sunuvtc.sunuvtcbackend.dtos.AlerteDTO;
import com.sunuvtc.sunuvtcbackend.services.AlerteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alertes")
@CrossOrigin(origins = "http://localhost:4200")
public class AlerteController {

    @Autowired private AlerteService service;

    @GetMapping
    public ResponseEntity<List<AlerteDTO>> getAll() {
        return ResponseEntity.ok(service.getAllAlertes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlerteDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getAlerteById(id));
    }

    @GetMapping("/chauffeur/{chauffeurId}")
    public ResponseEntity<List<AlerteDTO>> getByChauffeur(@PathVariable Long chauffeurId) {
        return ResponseEntity.ok(service.getAlertesByChauffeur(chauffeurId));
    }

    @GetMapping("/chauffeur/{chauffeurId}/non-lues")
    public ResponseEntity<List<AlerteDTO>> getNonLues(@PathVariable Long chauffeurId) {
        return ResponseEntity.ok(service.getAlertesNonLuesByChauffeur(chauffeurId));
    }

    @PostMapping
    public ResponseEntity<AlerteDTO> create(@Valid @RequestBody AlerteDTO dto) {
        return new ResponseEntity<>(service.createAlerte(dto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AlerteDTO> update(@PathVariable Long id, @Valid @RequestBody AlerteDTO dto) {
        return ResponseEntity.ok(service.updateAlerte(id, dto));
    }

    @PatchMapping("/{id}/lue")
    public ResponseEntity<Void> marquerLue(@PathVariable Long id) {
        service.marquerCommeLue(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteAlerte(id);
        return ResponseEntity.noContent().build();
    }
}
