import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlerteService } from '../../../services/alerte.service';
import { Chauffeur } from '../../../models/chauffeur.model';
import { ChauffeurService } from '../../../services/chauffeur.service';
import { Zone } from '../../../models/zone.model';
import { ZoneService } from '../../../services/zone.service';

@Component({
    selector: 'app-alerte-edit',
    templateUrl: './alerte-edit.component.html',
    styleUrls: ['./alerte-edit.component.css']
})
export class AlerteEditComponent implements OnInit {
    form: FormGroup;
    chauffeurs: Chauffeur[] = [];
    zones: Zone[] = [];
    loading = false;
    error = '';
    id!: number;

    constructor(
        private fb: FormBuilder,
        private service: AlerteService,
        private chauffeurService: ChauffeurService,
        private zoneService: ZoneService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.form = this.fb.group({
            chauffeurId: ['', Validators.required],
            typeAlerte: ['', Validators.required],
            message: ['', Validators.required],
            latitude: [null],
            longitude: [null],
            zoneConcerneeId: [null],
            estLue: [false]
        });
    }

    ngOnInit(): void {
        this.id = +this.route.snapshot.paramMap.get('id')!;
        this.loading = true;
        this.chauffeurService.getAllChauffeurs().subscribe(data => this.chauffeurs = data);
        this.zoneService.getAllZones().subscribe(data => this.zones = data);

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
                next: () => this.router.navigate(['/alertes']),
                error: (err) => {
                    this.error = err.error?.message || 'Erreur modification';
                    this.loading = false;
                }
            });
        }
    }

    onCancel(): void { this.router.navigate(['/alertes']); }
}
