import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChauffeurService } from '../../../services/chauffeur.service';
import { ZoneService } from '../../../services/zone.service';
import { Zone } from '../../../models/zone.model';

@Component({
    selector: 'app-chauffeur-edit',
    templateUrl: './chauffeur-edit.component.html',
    styleUrls: ['./chauffeur-edit.component.css']
})
export class ChauffeurEditComponent implements OnInit {
    form: FormGroup;
    zones: Zone[] = [];
    loading = false;
    error = '';
    id!: number;

    constructor(
        private fb: FormBuilder,
        private chauffeurService: ChauffeurService,
        private zoneService: ZoneService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: [''],
            nom: ['', Validators.maxLength(50)],
            prenom: ['', Validators.maxLength(50)],
            statutVehicule: ['HORS_SERVICE'],
            zoneAssigneeId: ['']
        });
    }

    ngOnInit(): void {
        this.id = +this.route.snapshot.paramMap.get('id')!;
        this.loading = true;
        this.chauffeurService.getChauffeurById(this.id).subscribe({
            next: (data) => {
                this.form.patchValue({
                    email: data.email,
                    nom: data.nom,
                    prenom: data.prenom,
                    statutVehicule: data.statutVehicule,
                    zoneAssigneeId: data.zoneAssigneeId
                });
                this.loading = false;
            },
            error: () => {
                this.error = 'Erreur chargement';
                this.loading = false;
            }
        });
        this.zoneService.getAllZones().subscribe({
            next: (data: Zone[]) => {
                this.zones = data;
            },
            error: (err) => console.error(err)
        });
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.loading = true;
            const data = { ...this.form.value };
            if (!data.password) delete data.password;
            this.chauffeurService.updateChauffeur(this.id, data).subscribe({
                next: () => this.router.navigate(['/chauffeurs']),
                error: (err) => {
                    this.error = err.error?.message || 'Erreur modification';
                    this.loading = false;
                }
            });
        }
    }

    onCancel(): void {
        this.router.navigate(['/chauffeurs']);
    }
}
