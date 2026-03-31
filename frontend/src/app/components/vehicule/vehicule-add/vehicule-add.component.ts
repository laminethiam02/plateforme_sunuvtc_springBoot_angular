import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculeService } from '../../../services/vehicule.service';
import {Chauffeur} from "../../../models/chauffeur.model";
import {ChauffeurService} from "../../../services/chauffeur.service";


@Component({
    selector: 'app-vehicule-add',
    templateUrl: './vehicule-add.component.html',
    styleUrls: ['./vehicule-add.component.css']
})
export class VehiculeAddComponent implements OnInit {
    form: FormGroup;
    chauffeurs: Chauffeur[] = [];
    loading = false;
    error = '';

    constructor(
        private fb: FormBuilder,
        private service: VehiculeService,
        private chauffeurService: ChauffeurService,
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
        this.chauffeurService.getAllChauffeurs().subscribe(data => this.chauffeurs = data);
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.loading = true;
            this.service.create(this.form.value).subscribe({
                next: () => this.router.navigate(['/vehicules']),
                error: (err) => {
                    this.error = err.error?.message || 'Erreur création';
                    this.loading = false;
                }
            });
        }
    }

    onCancel(): void { this.router.navigate(['/vehicules']); }
}
