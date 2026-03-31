import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Chauffeur} from "../../../models/chauffeur.model";
import {ChauffeurService} from "../../../services/chauffeur.service";


@Component({
    selector: 'app-chauffeur-list',
    templateUrl: './chauffeur-list.component.html',
    styleUrls: ['./chauffeur-list.component.css']
})
export class ChauffeurListComponent implements OnInit {
    chauffeurs: Chauffeur[] = [];
    loading = false;
    error = '';
    searchTerm = '';

    constructor(
        private chauffeurService: ChauffeurService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.loadChauffeurs();
    }

    loadChauffeurs(): void {
        this.loading = true;
        this.chauffeurService.getAllChauffeurs().subscribe({
            next: (data) => {
                this.chauffeurs = data;
                this.loading = false;
            },
            error: () => {
                this.error = 'Erreur de chargement';
                this.loading = false;
            }
        });
    }

    onSearch(): void {
        if (this.searchTerm.trim()) {
            const term = this.searchTerm.toLowerCase();
            this.chauffeurs = this.chauffeurs.filter(c =>
                c.nom.toLowerCase().includes(term) ||
                c.prenom.toLowerCase().includes(term) ||
                c.email.toLowerCase().includes(term) ||
                (c.zoneAssigneeNom && c.zoneAssigneeNom.toLowerCase().includes(term))
            );
        } else {
            this.loadChauffeurs();
        }
    }

    onAdd(): void {
        this.router.navigate(['/chauffeurs/add']);
    }

    onEdit(id: number): void {
        this.router.navigate(['/chauffeurs/edit', id]);
    }

    onDelete(id: number): void {
        if (confirm('Supprimer ce chauffeur ?')) {
            this.chauffeurService.deleteChauffeur(id).subscribe({
                next: () => {
                    this.chauffeurs = this.chauffeurs.filter(c => c.id !== id);
                },
                error: () => {
                    this.error = 'Erreur suppression';
                }
            });
        }
    }

    getStatutClass(statut: string): string {
        switch (statut) {
            case 'LIBRE': return 'badge-success';
            case 'EN_COURSE': return 'badge-warning';
            default: return 'badge-secondary';
        }
    }
}
