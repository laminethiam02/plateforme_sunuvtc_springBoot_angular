package com.sunuvtc.sunuvtcbackend.entities;



import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "avis_client")
public class AvisClient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false, unique = true)
    private Course course;

    @Column(nullable = false)
    private Integer note; // entre 1 et 5

    @Column(columnDefinition = "TEXT")
    private String commentaire;

    @Column(name = "date_avis")
    private LocalDateTime dateAvis = LocalDateTime.now();

    // Constructeurs, getters et setters
    public AvisClient() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }
    public Integer getNote() { return note; }
    public void setNote(Integer note) { this.note = note; }
    public String getCommentaire() { return commentaire; }
    public void setCommentaire(String commentaire) { this.commentaire = commentaire; }
    public LocalDateTime getDateAvis() { return dateAvis; }
    public void setDateAvis(LocalDateTime dateAvis) { this.dateAvis = dateAvis; }
}
