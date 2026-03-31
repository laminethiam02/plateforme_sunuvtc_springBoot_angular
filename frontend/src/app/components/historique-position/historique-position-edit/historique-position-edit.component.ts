import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-historique-position-edit',
    template: `
        <div class="container mt-5 text-center">
            <div class="alert alert-warning shadow-lg p-4">
                <i class="fas fa-exclamation-triangle fa-3x mb-3 text-warning"></i>
                <h4 class="mb-3">Modification non autorisée</h4>
                <p class="mb-4">Les positions historiques ne peuvent pas être modifiées.</p>
                <button class="btn btn-primary btn-lg" (click)="goBack()">
                    <i class="fas fa-arrow-left mr-2"></i>Retour à la liste
                </button>
            </div>
        </div>
    `,
    styles: [`
        .alert { max-width: 600px; margin: 0 auto; }
    `]
})
export class HistoriquePositionEditComponent {
    constructor(private router: Router) {}
    goBack(): void { this.router.navigate(['/historique-positions']); }
}
