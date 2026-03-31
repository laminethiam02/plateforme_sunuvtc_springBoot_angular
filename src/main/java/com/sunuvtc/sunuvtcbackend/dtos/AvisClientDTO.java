package com.sunuvtc.sunuvtcbackend.dtos;


import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class AvisClientDTO {
    private Long id;

    @NotNull
    private Long courseId;

    @NotNull @Min(1) @Max(5)
    private Integer note;

    private String commentaire;
    private LocalDateTime dateAvis;

    // Constructeurs
    public AvisClientDTO() {}
    public AvisClientDTO(Long id, Long courseId, Integer note, String commentaire, LocalDateTime dateAvis) {
        this.id = id;
        this.courseId = courseId;
        this.note = note;
        this.commentaire = commentaire;
        this.dateAvis = dateAvis;
    }

    // Getters et setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }
    public Integer getNote() { return note; }
    public void setNote(Integer note) { this.note = note; }
    public String getCommentaire() { return commentaire; }
    public void setCommentaire(String commentaire) { this.commentaire = commentaire; }
    public LocalDateTime getDateAvis() { return dateAvis; }
    public void setDateAvis(LocalDateTime dateAvis) { this.dateAvis = dateAvis; }
}
