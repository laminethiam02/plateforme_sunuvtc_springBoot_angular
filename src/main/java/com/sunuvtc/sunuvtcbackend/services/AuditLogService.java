package com.sunuvtc.sunuvtcbackend.services;


import com.sunuvtc.sunuvtcbackend.dtos.AuditLogDTO;

import java.util.List;

public interface AuditLogService {
    List<AuditLogDTO> getAllAuditLogs();
    AuditLogDTO getAuditLogById(Long id);
    AuditLogDTO createAuditLog(AuditLogDTO dto);
    void deleteAuditLog(Long id);
    List<AuditLogDTO> getAuditLogsByUtilisateur(String utilisateurType, Long utilisateurId);
}
