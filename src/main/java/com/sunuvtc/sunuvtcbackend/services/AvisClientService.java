package com.sunuvtc.sunuvtcbackend.services;


import com.sunuvtc.sunuvtcbackend.dtos.AvisClientDTO;

import java.util.List;

public interface AvisClientService {
    List<AvisClientDTO> getAllAvis();
    AvisClientDTO getAvisById(Long id);
    AvisClientDTO createAvis(AvisClientDTO dto);
    AvisClientDTO updateAvis(Long id, AvisClientDTO dto);
    void deleteAvis(Long id);
    AvisClientDTO getAvisByCourse(Long courseId);
    List<AvisClientDTO> getAvisByNote(Integer note);
}
