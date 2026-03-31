import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HistoriquePositionService } from '../../../services/historique-position.service';
import {Chauffeur} from "../../../models/chauffeur.model";
import {ChauffeurService} from "../../../services/chauffeur.service";


@Component({
    selector: 'app-historique-position-add',
    templateUrl: './historique-position-add.component.html',
    styleUrls: ['./historique-position-add.component.css']
})
export class HistoriquePositionAddComponent implements OnInit {
    form: FormGroup;
    chauffeurs: Chauffeur[] = [];
    loading = false;
    error = '';

    constructor(
        private fb: FormBuilder,
        private service: HistoriquePositionService,
        private chauffeurService: ChauffeurService,
        private router: Router
    ) {
        this.form = this.fb.group({
            chauffeurId: ['', Validators.required],
            latitude: ['', [Validators.required, Validators.min(-90), Validators.max(90)]],
            longitude: ['', [Validators.required, Validators.min(-180), Validators.max(180)]],
            statutVehicule: [''],
            vitesseKmh: [0, Validators.min(0)],
            timestampPosition: [new Date(), Validators.required]
        });
    }

    ngOnInit(): void {
        this.chauffeurService.getAllChauffeurs().subscribe(data => this.chauffeurs = data);
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.loading = true;
            this.service.create(this.form.value).subscribe({
                next: () => this.router.navigate(['/historique-positions']),
                error: (err) => {
                    this.error = err.error?.message || 'Erreur création';
                    this.loading = false;
                }
            });
        }
    }

    onCancel(): void { this.router.navigate(['/historique-positions']); }
}
