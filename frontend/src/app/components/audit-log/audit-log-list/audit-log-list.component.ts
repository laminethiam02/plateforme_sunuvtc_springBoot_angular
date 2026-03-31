import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuditLog } from '../../../models/audit-log.model';
import { AuditLogService } from '../../../services/audit-log.service';

@Component({
    selector: 'app-audit-log-list',
    templateUrl: './audit-log-list.component.html',
    styleUrls: ['./audit-log-list.component.css']
})
export class AuditLogListComponent implements OnInit {
    logs: AuditLog[] = [];
    loading = false;
    error = '';

    constructor(private service: AuditLogService, private router: Router) {}

    ngOnInit(): void { this.loadLogs(); }

    loadLogs(): void {
        this.loading = true;
        this.service.getAll().subscribe({
            next: (data) => { this.logs = data; this.loading = false; },
            error: () => { this.error = 'Erreur chargement'; this.loading = false; }
        });
    }

    onAdd(): void { this.router.navigate(['/audit-logs/add']); }
    onDelete(id: number): void {
        if (confirm('Supprimer ce log ?')) {
            this.service.delete(id).subscribe({
                next: () => this.logs = this.logs.filter(l => l.id !== id),
                error: () => this.error = 'Erreur suppression'
            });
        }
    }
}
