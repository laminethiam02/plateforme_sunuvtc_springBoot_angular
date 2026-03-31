import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../../services/course.service';
import { ChauffeurService } from '../../../services/chauffeur.service';
import { Chauffeur } from '../../../models/chauffeur.model';

@Component({
    selector: 'app-course-edit',
    templateUrl: './course-edit.component.html',
    styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {
    form: FormGroup;
    chauffeurs: Chauffeur[] = [];
    loading = false;
    error = '';
    id!: number;

    constructor(
        private fb: FormBuilder,
        private courseService: CourseService,
        private chauffeurService: ChauffeurService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.form = this.fb.group({
            chauffeurId: ['', Validators.required],
            debut: ['', Validators.required],
            fin: [''],
            latDepart: ['', [Validators.required]],
            lngDepart: ['', [Validators.required]],
            latArrivee: [''],
            lngArrivee: [''],
            distanceKm: ['', [Validators.min(0)]],
            montant: ['', [Validators.min(0)]],
            statut: ['EN_COURSE', Validators.required],
            zonesTraversees: ['']
        });
    }

    ngOnInit(): void {
        this.id = +this.route.snapshot.paramMap.get('id')!;
        this.loading = true;
        this.courseService.getCourseById(this.id).subscribe({
            next: (data) => {
                // Convertir les dates au format datetime-local
                const debut = data.debut ? new Date(data.debut).toISOString().slice(0, 16) : '';
                const fin = data.fin ? new Date(data.fin).toISOString().slice(0, 16) : '';
                this.form.patchValue({
                    chauffeurId: data.chauffeurId,
                    debut: debut,
                    fin: fin,
                    latDepart: data.latDepart,
                    lngDepart: data.lngDepart,
                    latArrivee: data.latArrivee,
                    lngArrivee: data.lngArrivee,
                    distanceKm: data.distanceKm,
                    montant: data.montant,
                    statut: data.statut,
                    zonesTraversees: data.zonesTraversees
                });
                this.loading = false;
            },
            error: () => {
                this.error = 'Erreur lors du chargement de la course';
                this.loading = false;
            }
        });
        this.chauffeurService.getAllChauffeurs().subscribe(data => this.chauffeurs = data);
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.loading = true;
            const data = { ...this.form.value };
            if (data.fin === '') delete data.fin;
            if (data.latArrivee === '') delete data.latArrivee;
            if (data.lngArrivee === '') delete data.lngArrivee;
            if (data.distanceKm === '') delete data.distanceKm;
            if (data.montant === '') delete data.montant;
            if (data.zonesTraversees === '') delete data.zonesTraversees;

            this.courseService.updateCourse(this.id, data).subscribe({
                next: () => this.router.navigate(['/courses']),
                error: (err) => {
                    this.error = err.error?.message || 'Erreur lors de la modification';
                    this.loading = false;
                }
            });
        }
    }

    onCancel(): void {
        this.router.navigate(['/courses']);
    }
}
