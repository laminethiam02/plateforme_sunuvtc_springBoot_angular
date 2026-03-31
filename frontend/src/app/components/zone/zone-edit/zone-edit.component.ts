import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZoneService } from '../../../services/zone.service';
import { Zone } from '../../../models/zone.model';

@Component({
    selector: 'app-zone-edit',
    templateUrl: './zone-edit.component.html',
    styleUrls: ['./zone-edit.component.css']
})
export class ZoneEditComponent implements OnInit {
    form: FormGroup;
    loading = false;
    error = '';
    id!: number;

    constructor(
        private fb: FormBuilder,
        private zoneService: ZoneService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.form = this.fb.group({
            nom: ['', [Validators.required, Validators.maxLength(100)]],
            couleur: ['', [Validators.required, Validators.pattern('^#[0-9A-Fa-f]{6}$')]],
            tarif: ['', [Validators.required, Validators.min(0)]],
            actif: [true],
            geom: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.id = +this.route.snapshot.paramMap.get('id')!;
        this.loading = true;
        this.zoneService.getZoneById(this.id).subscribe({
            next: (data: Zone) => {
                this.form.patchValue({
                    nom: data.nom,
                    couleur: data.couleur,
                    tarif: data.tarif,
                    actif: data.actif,
                    geom: data.geom
                });
                this.loading = false;
            },
            error: () => {
                this.error = 'Erreur lors du chargement de la zone';
                this.loading = false;
            }
        });
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.loading = true;
            this.zoneService.updateZone(this.id, this.form.value).subscribe({
                next: () => this.router.navigate(['/zones']),
                error: (err) => {
                    this.error = err.error?.message || 'Erreur lors de la modification';
                    this.loading = false;
                }
            });
        }
    }

    onCancel(): void {
        this.router.navigate(['/zones']);
    }
}
