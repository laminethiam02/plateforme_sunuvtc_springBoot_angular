import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HistoriqueTarifZoneService } from '../../../services/historique-tarif-zone.service';
import { ZoneService } from '../../../services/zone.service';
import { Zone } from '../../../models/zone.model';

@Component({
    selector: 'app-historique-tarif-zone-edit',
    templateUrl: './historique-tarif-zone-edit.component.html',
    styleUrls: ['./historique-tarif-zone-edit.component.css']
})
export class HistoriqueTarifZoneEditComponent implements OnInit {
    form: FormGroup;
    zones: Zone[] = [];
    loading = false;
    error = '';
    id!: number;

    constructor(
        private fb: FormBuilder,
        private service: HistoriqueTarifZoneService,
        private zoneService: ZoneService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.form = this.fb.group({
            zoneId: ['', Validators.required],
            ancienTarif: ['', [Validators.required, Validators.min(0)]],
            nouveauTarif: ['', [Validators.required, Validators.min(0)]],
            modifiePar: [null]
        });
    }

    ngOnInit(): void {
        this.id = +this.route.snapshot.paramMap.get('id')!;
        this.loading = true;
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
                next: () => this.router.navigate(['/historique-tarifs']),
                error: (err) => {
                    this.error = err.error?.message || 'Erreur modification';
                    this.loading = false;
                }
            });
        }
    }

    onCancel(): void { this.router.navigate(['/historique-tarifs']); }
}
