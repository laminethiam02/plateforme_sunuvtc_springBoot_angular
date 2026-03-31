import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZoneService } from '../../../services/zone.service';

@Component({
    selector: 'app-zone-add',
    templateUrl: './zone-add.component.html',
    styleUrls: ['./zone-add.component.css']
})
export class ZoneAddComponent implements OnInit {
    form: FormGroup;
    loading = false;
    error = '';

    constructor(
        private fb: FormBuilder,
        private zoneService: ZoneService,
        private router: Router
    ) {
        this.form = this.fb.group({
            nom: ['', [Validators.required, Validators.maxLength(100)]],
            couleur: ['#000000', [Validators.required, Validators.pattern('^#[0-9A-Fa-f]{6}$')]],
            tarif: ['', [Validators.required, Validators.min(0)]],
            actif: [true],
            geom: ['', Validators.required]
        });
    }

    ngOnInit(): void {}

    onSubmit(): void {
        if (this.form.valid) {
            this.loading = true;
            this.zoneService.createZone(this.form.value).subscribe({
                next: () => this.router.navigate(['/zones']),
                error: (err) => {
                    this.error = err.error?.message || 'Erreur lors de la création';
                    this.loading = false;
                }
            });
        }
    }

    onCancel(): void {
        this.router.navigate(['/zones']);
    }
}
