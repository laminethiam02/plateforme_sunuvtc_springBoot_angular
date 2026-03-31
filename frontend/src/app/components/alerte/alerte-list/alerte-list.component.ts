import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alerte } from '../../../models/alerte.model';
import { AlerteService } from '../../../services/alerte.service';

@Component({
    selector: 'app-alerte-list',
    templateUrl: './alerte-list.component.html',
    styleUrls: ['./alerte-list.component.css']
})
export class AlerteListComponent implements OnInit {
    alertes: Alerte[] = [];
    loading = false;
    error = '';

    constructor(private service: AlerteService, private router: Router) {}

    ngOnInit(): void { this.loadAlertes(); }

    loadAlertes(): void {
        this.loading = true;
        this.service.getAll().subscribe({
            next: (data) => { this.alertes = data; this.loading = false; },
            error: () => { this.error = 'Erreur chargement'; this.loading = false; }
        });
    }

    onAdd(): void { this.router.navigate(['/alertes/add']); }
    onEdit(id: number): void { this.router.navigate(['/alertes/edit', id]); }
    onDelete(id: number): void {
        if (confirm('Supprimer cette alerte ?')) {
            this.service.delete(id).subscribe({
                next: () => this.alertes = this.alertes.filter(a => a.id !== id),
                error: () => this.error = 'Erreur suppression'
            });
        }
    }
    marquerLue(id: number): void {
        this.service.marquerLue(id).subscribe({
            next: () => {
                const alerte = this.alertes.find(a => a.id === id);
                if (alerte) alerte.estLue = true;
            },
            error: () => this.error = 'Erreur marquage'
        });
    }
}
