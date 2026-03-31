package com.sunuvtc.sunuvtcbackend.controllers;


import com.sunuvtc.sunuvtcbackend.dtos.VehiculeDTO;
import com.sunuvtc.sunuvtcbackend.services.VehiculeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicules")
@CrossOrigin(origins = "http://localhost:4200")
public class VehiculeController {

    @Autowired private VehiculeService vehiculeService;

    @GetMapping
    public ResponseEntity<List<VehiculeDTO>> getAllVehicules() {
        return ResponseEntity.ok(vehiculeService.getAllVehicules());
    }

    @GetMapping("/{id}")
    public ResponseEntity<VehiculeDTO> getVehiculeById(@PathVariable Long id) {
        return ResponseEntity.ok(vehiculeService.getVehiculeById(id));
    }

    @PostMapping
    public ResponseEntity<VehiculeDTO> createVehicule(@Valid @RequestBody VehiculeDTO dto) {
        return new ResponseEntity<>(vehiculeService.createVehicule(dto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<VehiculeDTO> updateVehicule(@PathVariable Long id, @Valid @RequestBody VehiculeDTO dto) {
        return ResponseEntity.ok(vehiculeService.updateVehicule(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicule(@PathVariable Long id) {
        vehiculeService.deleteVehicule(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{vehiculeId}/assign/{chauffeurId}")
    public ResponseEntity<VehiculeDTO> assignerChauffeur(@PathVariable Long vehiculeId, @PathVariable Long chauffeurId) {
        return ResponseEntity.ok(vehiculeService.assignerChauffeur(vehiculeId, chauffeurId));
    }
}
