import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChauffeurService } from '../../../services/chauffeur.service';
import { ZoneService } from '../../../services/zone.service';
import { Zone } from '../../../models/zone.model';  // Import correct

@Component({
    selector: 'app-chauffeur-add',
    templateUrl: './chauffeur-add.component.html',
    styleUrls: ['./chauffeur-add.component.css']
})
export class ChauffeurAddComponent implements OnInit {
    form: FormGroup;
    zones: Zone[] = [];  // Typage correct
    loading = false;
    error = '';

    constructor(
        private fb: FormBuilder,
        private chauffeurService: ChauffeurService,
        private zoneService: ZoneService,
        private router: Router
    ) {
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            nom: ['', Validators.maxLength(50)],
            prenom: ['', Validators.maxLength(50)],
            statutVehicule: ['HORS_SERVICE'],
            zoneAssigneeId: ['']
        });
    }

    ngOnInit(): void {
        this.zoneService.getAllZones().subscribe({
            next: (data: Zone[]) => {
                this.zones = data;
            },
            error: (err) => {
                console.error(err);
            }
        });
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.loading = true;
            this.chauffeurService.createChauffeur(this.form.value).subscribe({
                next: () => this.router.navigate(['/chauffeurs']),
                error: (err) => {
                    this.error = err.error?.message || 'Erreur création';
                    this.loading = false;
                }
            });
        }
    }

    onCancel(): void {
        this.router.navigate(['/chauffeurs']);
    }
}
