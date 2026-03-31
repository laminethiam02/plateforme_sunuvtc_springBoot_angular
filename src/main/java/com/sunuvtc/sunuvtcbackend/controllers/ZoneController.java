package com.sunuvtc.sunuvtcbackend.controllers;


import com.sunuvtc.sunuvtcbackend.dtos.ZoneDTO;
import com.sunuvtc.sunuvtcbackend.services.ZoneService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/zones")
@CrossOrigin(origins = "http://localhost:4200")
public class ZoneController {

    @Autowired
    private ZoneService zoneService;

    @GetMapping
    public ResponseEntity<List<ZoneDTO>> getAllZones() {
        return ResponseEntity.ok(zoneService.getAllZones());
    }

    @GetMapping("/active")
    public ResponseEntity<List<ZoneDTO>> getActiveZones() {
        return ResponseEntity.ok(zoneService.getActiveZones());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ZoneDTO> getZoneById(@PathVariable Long id) {
        return ResponseEntity.ok(zoneService.getZoneById(id));
    }

    @PostMapping
    public ResponseEntity<ZoneDTO> createZone(@Valid @RequestBody ZoneDTO dto) {
        ZoneDTO created = zoneService.createZone(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ZoneDTO> updateZone(@PathVariable Long id, @Valid @RequestBody ZoneDTO dto) {
        ZoneDTO updated = zoneService.updateZone(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteZone(@PathVariable Long id) {
        zoneService.deleteZone(id);
        return ResponseEntity.noContent().build();
    }
}
