import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuditLogService } from '../../../services/audit-log.service';

@Component({
    selector: 'app-audit-log-add',
    templateUrl: './audit-log-add.component.html',
    styleUrls: ['./audit-log-add.component.css']
})
export class AuditLogAddComponent {
    form: FormGroup;
    loading = false;
    error = '';

    constructor(
        private fb: FormBuilder,
        private service: AuditLogService,
        private router: Router
    ) {
        this.form = this.fb.group({
            utilisateurType: ['', Validators.required],
            utilisateurId: ['', Validators.required],
            action: ['', Validators.required],
            details: [''],
            ipAddress: ['']
        });
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.loading = true;
            this.service.create(this.form.value).subscribe({
                next: () => this.router.navigate(['/audit-logs']),
                error: (err) => {
                    this.error = err.error?.message || 'Erreur création';
                    this.loading = false;
                }
            });
        }
    }

    onCancel(): void { this.router.navigate(['/audit-logs']); }
}
