import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculeService } from '../../../services/vehicule.service';
import {Chauffeur} from "../../../models/chauffeur.model";
import {ChauffeurService} from "../../../services/chauffeur.service";


@Component({
    selector: 'app-vehicule-edit',
    templateUrl: './vehicule-edit.component.html',
    styleUrls: ['./vehicule-edit.component.css']
})
export class VehiculeEditComponent implements OnInit {
    form: FormGroup;
    chauffeurs: Chauffeur[] = [];
    loading = false;
    error = '';
    id!: number;

    constructor(
        private fb: FormBuilder,
        private service: VehiculeService,
        private chauffeurService: ChauffeurService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.form = this.fb.group({
            immatriculation: ['', [Validators.required, Validators.maxLength(20)]],
            marque: ['', Validators.maxLength(50)],
            modele: ['', Validators.maxLength(50)],
            couleur: ['', Validators.maxLength(30)],
            annee: [null, [Validators.min(1900), Validators.max(new Date().getFullYear())]],
            capacite: [4, [Validators.required, Validators.min(1)]],
            chauffeurId: [null],
            actif: [true]
        });
    }

    ngOnInit(): void {
        this.id = +this.route.snapshot.paramMap.get('id')!;
        this.loading = true;
        this.chauffeurService.getAllChauffeurs().subscribe(data => this.chauffeurs = data);
        this.service.getById(this.id).subscribe({
            next: (data) => {
                this.form.patchValue(data);
                this.loading = false;
            },
            error: () => {
                this.error = 'Erreur chargement';
                this.loading = false;
            }
        });
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.loading = true;
            this.service.update(this.id, this.form.value).subscribe({
                next: () => this.router.navigate(['/vehicules']),
                error: (err) => {
                    this.error = err.error?.message || 'Erreur modification';
                    this.loading = false;
                }
            });
        }
    }

    onCancel(): void { this.router.navigate(['/vehicules']); }
}
