import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicule } from '../../../models/vehicule.model';
import { VehiculeService } from '../../../services/vehicule.service';

@Component({
    selector: 'app-vehicule-list',
    templateUrl: './vehicule-list.component.html',
    styleUrls: ['./vehicule-list.component.css']
})
export class VehiculeListComponent implements OnInit {
    vehicules: Vehicule[] = [];
    loading = false;
    error = '';
    searchTerm = '';

    constructor(
        private service: VehiculeService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.loadVehicules();
    }

    loadVehicules(): void {
        this.loading = true;
        this.service.getAll().subscribe({
            next: (data) => { this.vehicules = data; this.loading = false; },
            error: () => { this.error = 'Erreur chargement'; this.loading = false; }
        });
    }

    onSearch(): void {
        if (this.searchTerm.trim()) {
            this.vehicules = this.vehicules.filter(v =>
                v.immatriculation.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                (v.marque && v.marque.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
                (v.modele && v.modele.toLowerCase().includes(this.searchTerm.toLowerCase()))
            );
        } else {
            this.loadVehicules();
        }
    }

    onAdd(): void { this.router.navigate(['/vehicules/add']); }
    onEdit(id: number): void { this.router.navigate(['/vehicules/edit', id]); }
    onDelete(id: number): void {
        if (confirm('Supprimer ce véhicule ?')) {
            this.service.delete(id).subscribe({
                next: () => this.vehicules = this.vehicules.filter(v => v.id !== id),
                error: () => this.error = 'Erreur suppression'
            });
        }
    }
}
