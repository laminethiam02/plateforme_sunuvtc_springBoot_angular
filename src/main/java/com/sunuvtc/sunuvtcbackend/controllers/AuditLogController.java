package com.sunuvtc.sunuvtcbackend.controllers;


import com.sunuvtc.sunuvtcbackend.dtos.AuditLogDTO;
import com.sunuvtc.sunuvtcbackend.services.AuditLogService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/audit-logs")
@CrossOrigin(origins = "http://localhost:4200")
public class AuditLogController {

    @Autowired private AuditLogService service;

    @GetMapping
    public ResponseEntity<List<AuditLogDTO>> getAll() {
        return ResponseEntity.ok(service.getAllAuditLogs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AuditLogDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getAuditLogById(id));
    }

    @GetMapping("/utilisateur")
    public ResponseEntity<List<AuditLogDTO>> getByUtilisateur(
            @RequestParam String type,
            @RequestParam Long id) {
        return ResponseEntity.ok(service.getAuditLogsByUtilisateur(type, id));
    }

    @PostMapping
    public ResponseEntity<AuditLogDTO> create(@Valid @RequestBody AuditLogDTO dto) {
        return new ResponseEntity<>(service.createAuditLog(dto), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteAuditLog(id);
        return ResponseEntity.noContent().build();
    }
}
