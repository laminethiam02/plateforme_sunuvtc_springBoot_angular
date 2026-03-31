import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../../../models/course.model';
import { CourseService } from '../../../services/course.service';

@Component({
    selector: 'app-course-list',
    templateUrl: './course-list.component.html',
    styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
    courses: Course[] = [];
    loading = false;
    error = '';
    searchTerm = '';

    constructor(
        private courseService: CourseService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.loadCourses();
    }

    loadCourses(): void {
        this.loading = true;
        this.courseService.getAllCourses().subscribe({
            next: (data) => {
                this.courses = data;
                this.loading = false;
            },
            error: () => {
                this.error = 'Erreur lors du chargement des courses';
                this.loading = false;
            }
        });
    }

    onSearch(): void {
        if (this.searchTerm.trim()) {
            const term = this.searchTerm.toLowerCase();
            this.courses = this.courses.filter(c =>
                c.chauffeurNom?.toLowerCase().includes(term) ||
                c.chauffeurPrenom?.toLowerCase().includes(term) ||
                c.statut.toLowerCase().includes(term)
            );
        } else {
            this.loadCourses();
        }
    }

    onAdd(): void {
        this.router.navigate(['/courses/add']);
    }

    onEdit(id: number): void {
        this.router.navigate(['/courses/edit', id]);
    }

    onDelete(id: number): void {
        if (confirm('Supprimer cette course ?')) {
            this.courseService.deleteCourse(id).subscribe({
                next: () => {
                    this.courses = this.courses.filter(c => c.id !== id);
                },
                error: () => {
                    this.error = 'Erreur lors de la suppression';
                }
            });
        }
    }

    getStatutClass(statut: string): string {
        switch (statut) {
            case 'EN_COURSE': return 'badge-warning';
            case 'TERMINEE': return 'badge-success';
            case 'ANNULEE': return 'badge-danger';
            default: return 'badge-secondary';
        }
    }

    formatDate(date?: Date): string {
        if (!date) return '';
        return new Date(date).toLocaleString('fr-FR');
    }
}
