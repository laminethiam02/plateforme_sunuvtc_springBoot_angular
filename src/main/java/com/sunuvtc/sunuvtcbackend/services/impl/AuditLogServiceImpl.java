package com.sunuvtc.sunuvtcbackend.services.impl;


import com.sunuvtc.sunuvtcbackend.dtos.AuditLogDTO;
import com.sunuvtc.sunuvtcbackend.entities.AuditLog;
import com.sunuvtc.sunuvtcbackend.repositories.AuditLogRepository;
import com.sunuvtc.sunuvtcbackend.services.AuditLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class AuditLogServiceImpl implements AuditLogService {

    @Autowired private AuditLogRepository auditLogRepository;

    @Override
    @Transactional(readOnly = true)
    public List<AuditLogDTO> getAllAuditLogs() {
        return auditLogRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public AuditLogDTO getAuditLogById(Long id) {
        AuditLog log = auditLogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Log non trouvé"));
        return convertToDTO(log);
    }

    @Override
    public AuditLogDTO createAuditLog(AuditLogDTO dto) {
        AuditLog log = new AuditLog();
        log.setUtilisateurType(AuditLog.UtilisateurType.valueOf(dto.getUtilisateurType()));
        log.setUtilisateurId(dto.getUtilisateurId());
        log.setAction(dto.getAction());
        log.setDetails(dto.getDetails());
        log.setIpAddress(dto.getIpAddress());
        AuditLog saved = auditLogRepository.save(log);
        return convertToDTO(saved);
    }

    @Override
    public void deleteAuditLog(Long id) {
        if (!auditLogRepository.existsById(id))
            throw new RuntimeException("Log non trouvé");
        auditLogRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AuditLogDTO> getAuditLogsByUtilisateur(String utilisateurType, Long utilisateurId) {
        AuditLog.UtilisateurType type = AuditLog.UtilisateurType.valueOf(utilisateurType);
        return auditLogRepository.findByUtilisateurTypeAndUtilisateurIdOrderByCreatedAtDesc(type, utilisateurId)
                .stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private AuditLogDTO convertToDTO(AuditLog log) {
        return new AuditLogDTO(
                log.getId(),
                log.getUtilisateurType().name(),
                log.getUtilisateurId(),
                log.getAction(),
                log.getDetails(),
                log.getIpAddress(),
                log.getCreatedAt()
        );
    }
}
