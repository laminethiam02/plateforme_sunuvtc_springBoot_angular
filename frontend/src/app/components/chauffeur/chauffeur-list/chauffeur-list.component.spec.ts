import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ChauffeurListComponent } from './chauffeur-list.component';
import { ChauffeurService } from '../../../services/chauffeur.service';
import { Chauffeur } from '../../../models/chauffeur.model';

// Mock du service ChauffeurService
class MockChauffeurService {
    getAllChauffeurs() {
        return of([
            { id: 1, nom: 'Doe', prenom: 'John', email: 'john@example.com', zoneAssigneeNom: 'Zone 1', statutVehicule: 'LIBRE' } as Chauffeur,
            { id: 2, nom: 'Smith', prenom: 'Anna', email: 'anna@example.com', zoneAssigneeNom: 'Zone 2', statutVehicule: 'EN_COURSE' } as Chauffeur
        ]);
    }

    deleteChauffeur(id: number) {
        return of(null);
    }
}

// Mock du Router
class MockRouter {
    navigate(commands: any[]) {}
}

describe('ChauffeurListComponent', () => {
    let component: ChauffeurListComponent;
    let fixture: ComponentFixture<ChauffeurListComponent>;
    let service: ChauffeurService;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ChauffeurListComponent],
            providers: [
                { provide: ChauffeurService, useClass: MockChauffeurService },
                { provide: Router, useClass: MockRouter }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ChauffeurListComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(ChauffeurService);
        router = TestBed.inject(Router);
        fixture.detectChanges(); // ngOnInit
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should load chauffeurs on init', () => {
        expect(component.chauffeurs.length).toBe(2);
        expect(component.loading).toBeFalse();
    });

    it('should filter chauffeurs on search', () => {
        component.searchTerm = 'john';
        component.onSearch();
        expect(component.chauffeurs.length).toBe(1);
        expect(component.chauffeurs[0].nom).toBe('Doe');
    });

    it('should reset chauffeurs if searchTerm is empty', () => {
        spyOn(service, 'getAllChauffeurs').and.callThrough();
        component.searchTerm = '';
        component.onSearch();
        expect(service.getAllChauffeurs).toHaveBeenCalled();
    });

    it('should navigate to add page', () => {
        spyOn(router, 'navigate');
        component.onAdd();
        expect(router.navigate).toHaveBeenCalledWith(['/chauffeurs/add']);
    });

    it('should navigate to edit page', () => {
        spyOn(router, 'navigate');
        component.onEdit(1);
        expect(router.navigate).toHaveBeenCalledWith(['/chauffeurs/edit', 1]);
    });

    it('should delete chauffeur', () => {
        spyOn(window, 'confirm').and.returnValue(true);
        spyOn(service, 'deleteChauffeur').and.callThrough();

        component.onDelete(1);
        expect(service.deleteChauffeur).toHaveBeenCalledWith(1);
        expect(component.chauffeurs.length).toBe(1); // un chauffeur supprimé
    });

    it('should not delete if confirm is false', () => {
        spyOn(window, 'confirm').and.returnValue(false);
        spyOn(service, 'deleteChauffeur');

        component.onDelete(1);
        expect(service.deleteChauffeur).not.toHaveBeenCalled();
    });

    it('should return correct statut class', () => {
        expect(component.getStatutClass('LIBRE')).toBe('badge-success');
        expect(component.getStatutClass('EN_COURSE')).toBe('badge-warning');
        expect(component.getStatutClass('HORS_SERVICE')).toBe('badge-secondary');
    });

    it('should handle load error', () => {
        spyOn(service, 'getAllChauffeurs').and.returnValue(throwError(() => new Error('Erreur')));
        component.loadChauffeurs();
        expect(component.error).toBe('Erreur de chargement');
        expect(component.loading).toBeFalse();
    });
});
