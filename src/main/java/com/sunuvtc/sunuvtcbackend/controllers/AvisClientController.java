package com.sunuvtc.sunuvtcbackend.controllers;


import com.sunuvtc.sunuvtcbackend.dtos.AvisClientDTO;
import com.sunuvtc.sunuvtcbackend.services.AvisClientService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/avis")
@CrossOrigin(origins = "http://localhost:4200")
public class AvisClientController {

    @Autowired private AvisClientService service;

    @GetMapping
    public ResponseEntity<List<AvisClientDTO>> getAll() {
        return ResponseEntity.ok(service.getAllAvis());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AvisClientDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getAvisById(id));
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<AvisClientDTO> getByCourse(@PathVariable Long courseId) {
        return ResponseEntity.ok(service.getAvisByCourse(courseId));
    }

    @GetMapping("/note/{note}")
    public ResponseEntity<List<AvisClientDTO>> getByNote(@PathVariable Integer note) {
        return ResponseEntity.ok(service.getAvisByNote(note));
    }

    @PostMapping
    public ResponseEntity<AvisClientDTO> create(@Valid @RequestBody AvisClientDTO dto) {
        return new ResponseEntity<>(service.createAvis(dto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AvisClientDTO> update(@PathVariable Long id, @Valid @RequestBody AvisClientDTO dto) {
        return ResponseEntity.ok(service.updateAvis(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteAvis(id);
        return ResponseEntity.noContent().build();
    }
}
