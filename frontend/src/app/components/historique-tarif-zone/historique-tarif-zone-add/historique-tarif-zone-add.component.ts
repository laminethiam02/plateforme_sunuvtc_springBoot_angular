import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HistoriqueTarifZoneService } from '../../../services/historique-tarif-zone.service';
import { ZoneService } from '../../../services/zone.service';
import { Zone } from '../../../models/zone.model';

@Component({
    selector: 'app-historique-tarif-zone-add',
    templateUrl: './historique-tarif-zone-add.component.html',
    styleUrls: ['./historique-tarif-zone-add.component.css']
})
export class HistoriqueTarifZoneAddComponent implements OnInit {
    form: FormGroup;
    zones: Zone[] = [];
    loading = false;
    error = '';

    constructor(
        private fb: FormBuilder,
        private service: HistoriqueTarifZoneService,
        private zoneService: ZoneService,
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
        this.zoneService.getAllZones().subscribe(data => this.zones = data);
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.loading = true;
            this.service.create(this.form.value).subscribe({
                next: () => this.router.navigate(['/historique-tarifs']),
                error: (err) => {
                    this.error = err.error?.message || 'Erreur création';
                    this.loading = false;
                }
            });
        }
    }

    onCancel(): void { this.router.navigate(['/historique-tarifs']); }
}
