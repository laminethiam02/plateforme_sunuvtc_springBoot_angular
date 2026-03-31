import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlerteService } from '../../../services/alerte.service';
import { Chauffeur } from '../../../models/chauffeur.model';
import { ChauffeurService } from '../../../services/chauffeur.service';
import { Zone } from '../../../models/zone.model';
import { ZoneService } from '../../../services/zone.service';

@Component({
    selector: 'app-alerte-add',
    templateUrl: './alerte-add.component.html',
    styleUrls: ['./alerte-add.component.css']
})
export class AlerteAddComponent implements OnInit {
    form: FormGroup;
    chauffeurs: Chauffeur[] = [];
    zones: Zone[] = [];
    loading = false;
    error = '';

    constructor(
        private fb: FormBuilder,
        private service: AlerteService,
        private chauffeurService: ChauffeurService,
        private zoneService: ZoneService,
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
        this.chauffeurService.getAllChauffeurs().subscribe(data => this.chauffeurs = data);
        this.zoneService.getAllZones().subscribe(data => this.zones = data);
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.loading = true;
            this.service.create(this.form.value).subscribe({
                next: () => this.router.navigate(['/alertes']),
                error: (err) => {
                    this.error = err.error?.message || 'Erreur création';
                    this.loading = false;
                }
            });
        }
    }

    onCancel(): void { this.router.navigate(['/alertes']); }
}
