import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AvisClient } from '../../../models/avis-client.model';
import { AvisClientService } from '../../../services/avis-client.service';

@Component({
    selector: 'app-avis-client-list',
    templateUrl: './avis-client-list.component.html',
    styleUrls: ['./avis-client-list.component.css']
})
export class AvisClientListComponent implements OnInit {
    avis: AvisClient[] = [];
    loading = false;
    error = '';

    constructor(private service: AvisClientService, private router: Router) {}

    ngOnInit(): void { this.loadAvis(); }

    loadAvis(): void {
        this.loading = true;
        this.service.getAll().subscribe({
            next: (data) => { this.avis = data; this.loading = false; },
            error: () => { this.error = 'Erreur chargement'; this.loading = false; }
        });
    }

    onAdd(): void { this.router.navigate(['/avis/add']); }
    onEdit(id: number): void { this.router.navigate(['/avis/edit', id]); }
    onDelete(id: number): void {
        if (confirm('Supprimer cet avis ?')) {
            this.service.delete(id).subscribe({
                next: () => this.avis = this.avis.filter(a => a.id !== id),
                error: () => this.error = 'Erreur suppression'
            });
        }
    }
}
