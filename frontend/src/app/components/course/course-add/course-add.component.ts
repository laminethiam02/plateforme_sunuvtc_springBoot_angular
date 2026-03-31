import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../../services/course.service';
import { ChauffeurService } from '../../../services/chauffeur.service';
import { Chauffeur } from '../../../models/chauffeur.model';

@Component({
    selector: 'app-course-add',
    templateUrl: './course-add.component.html',
    styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {
    form: FormGroup;
    chauffeurs: Chauffeur[] = [];
    loading = false;
    error = '';

    constructor(
        private fb: FormBuilder,
        private courseService: CourseService,
        private chauffeurService: ChauffeurService,
        private router: Router
    ) {
        this.form = this.fb.group({
            chauffeurId: ['', Validators.required],
            debut: [new Date().toISOString().slice(0, 16), Validators.required],
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
        this.chauffeurService.getAllChauffeurs().subscribe(data => this.chauffeurs = data);
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.loading = true;
            // Convertir les valeurs vides en null pour éviter des envois indésirables
            const data = { ...this.form.value };
            if (data.fin === '') delete data.fin;
            if (data.latArrivee === '') delete data.latArrivee;
            if (data.lngArrivee === '') delete data.lngArrivee;
            if (data.distanceKm === '') delete data.distanceKm;
            if (data.montant === '') delete data.montant;
            if (data.zonesTraversees === '') delete data.zonesTraversees;

            this.courseService.createCourse(data).subscribe({
                next: () => this.router.navigate(['/courses']),
                error: (err) => {
                    this.error = err.error?.message || 'Erreur lors de la création';
                    this.loading = false;
                }
            });
        }
    }

    onCancel(): void {
        this.router.navigate(['/courses']);
    }
}
