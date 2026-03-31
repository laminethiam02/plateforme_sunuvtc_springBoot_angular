import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Zone } from '../../../models/zone.model';
import { ZoneService } from '../../../services/zone.service';

@Component({
    selector: 'app-zone-list',
    templateUrl: './zone-list.component.html',
    styleUrls: ['./zone-list.component.css']
})
export class ZoneListComponent implements OnInit {
    zones: Zone[] = [];
    loading = false;
    error = '';
    searchTerm = '';

    constructor(
        private zoneService: ZoneService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.loadZones();
    }

    loadZones(): void {
        this.loading = true;
        this.zoneService.getAllZones().subscribe({
            next: (data) => {
                this.zones = data;
                this.loading = false;
            },
            error: () => {
                this.error = 'Erreur lors du chargement des zones';
                this.loading = false;
            }
        });
    }

    onSearch(): void {
        if (this.searchTerm.trim()) {
            const term = this.searchTerm.toLowerCase();
            this.zones = this.zones.filter(z =>
                z.nom.toLowerCase().includes(term) ||
                (z.couleur && z.couleur.toLowerCase().includes(term))
            );
        } else {
            this.loadZones();
        }
    }

    onAdd(): void {
        this.router.navigate(['/zones/add']);
    }

    onEdit(id: number): void {
        this.router.navigate(['/zones/edit', id]);
    }

    onDelete(id: number): void {
        if (confirm('Supprimer cette zone ?')) {
            this.zoneService.deleteZone(id).subscribe({
                next: () => {
                    this.zones = this.zones.filter(z => z.id !== id);
                },
                error: () => {
                    this.error = 'Erreur lors de la suppression';
                }
            });
        }
    }

    getActifClass(actif: boolean): string {
        return actif ? 'badge-success' : 'badge-secondary';
    }

    getActifText(actif: boolean): string {
        return actif ? 'Actif' : 'Inactif';
    }
}
