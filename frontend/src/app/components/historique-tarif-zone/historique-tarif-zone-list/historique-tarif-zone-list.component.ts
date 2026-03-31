import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistoriqueTarifZone } from '../../../models/historique-tarif-zone.model';
import { HistoriqueTarifZoneService } from '../../../services/historique-tarif-zone.service';

@Component({
    selector: 'app-historique-tarif-zone-list',
    templateUrl: './historique-tarif-zone-list.component.html',
    styleUrls: ['./historique-tarif-zone-list.component.css']
})
export class HistoriqueTarifZoneListComponent implements OnInit {
    historiques: HistoriqueTarifZone[] = [];
    loading = false;
    error = '';

    constructor(private service: HistoriqueTarifZoneService, private router: Router) {}

    ngOnInit(): void { this.loadHistoriques(); }

    loadHistoriques(): void {
        this.loading = true;
        this.service.getAll().subscribe({
            next: (data) => { this.historiques = data; this.loading = false; },
            error: () => { this.error = 'Erreur chargement'; this.loading = false; }
        });
    }

    onAdd(): void { this.router.navigate(['/historique-tarifs/add']); }
    onEdit(id: number): void { this.router.navigate(['/historique-tarifs/edit', id]); }
    onDelete(id: number): void {
        if (confirm('Supprimer cet historique ?')) {
            this.service.delete(id).subscribe({
                next: () => this.historiques = this.historiques.filter(h => h.id !== id),
                error: () => this.error = 'Erreur suppression'
            });
        }
    }
}
