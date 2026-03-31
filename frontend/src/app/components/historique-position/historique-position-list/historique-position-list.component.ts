import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistoriquePosition } from '../../../models/historique-position.model';
import { HistoriquePositionService } from '../../../services/historique-position.service';

@Component({
    selector: 'app-historique-position-list',
    templateUrl: './historique-position-list.component.html',
    styleUrls: ['./historique-position-list.component.css']
})
export class HistoriquePositionListComponent implements OnInit {
    positions: HistoriquePosition[] = [];
    loading = false;
    error = '';

    constructor(private service: HistoriquePositionService, private router: Router) {}

    ngOnInit(): void { this.loadPositions(); }

    loadPositions(): void {
        this.loading = true;
        this.service.getAll().subscribe({
            next: (data) => { this.positions = data; this.loading = false; },
            error: () => { this.error = 'Erreur chargement'; this.loading = false; }
        });
    }

    onAdd(): void { this.router.navigate(['/historique-positions/add']); }
    onDelete(id: number): void {
        if (confirm('Supprimer cette position ?')) {
            this.service.delete(id).subscribe({
                next: () => this.positions = this.positions.filter(p => p.id !== id),
                error: () => this.error = 'Erreur suppression'
            });
        }
    }
}
