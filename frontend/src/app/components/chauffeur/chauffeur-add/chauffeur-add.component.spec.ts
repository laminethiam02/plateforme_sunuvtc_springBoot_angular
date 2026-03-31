import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ChauffeurAddComponent } from './chauffeur-add.component';
import { ChauffeurService } from '../../../services/chauffeur.service';
import { ZoneService } from '../../../services/zone.service';
import { Zone } from '../../../models/zone.model';

// Mock ChauffeurService
class MockChauffeurService {
    createChauffeur(data: any) {
        return of(data);
    }
}

// Mock ZoneService
class MockZoneService {
    getAllZones() {
        return of([
            { id: 1, nom: 'Zone 1' } as Zone,
            { id: 2, nom: 'Zone 2' } as Zone
        ]);
    }
}

// Mock Router
class MockRouter {
    navigate(commands: any[]) {}
}

describe('ChauffeurAddComponent', () => {
    let component: ChauffeurAddComponent;
    let fixture: ComponentFixture<ChauffeurAddComponent>;
    let service: ChauffeurService;
    let zoneService: ZoneService;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ChauffeurAddComponent],
            imports: [ReactiveFormsModule],
            providers: [
                { provide: ChauffeurService, useClass: MockChauffeurService },
                { provide: ZoneService, useClass: MockZoneService },
                { provide: Router, useClass: MockRouter }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ChauffeurAddComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(ChauffeurService);
        zoneService = TestBed.inject(ZoneService);
        router = TestBed.inject(Router);
        fixture.detectChanges(); // ngOnInit()
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load zones on init', () => {
        expect(component.zones.length).toBe(2);
        expect(component.zones[0].nom).toBe('Zone 1');
    });

    it('should submit valid form successfully', () => {
        spyOn(service, 'createChauffeur').and.callThrough();
        spyOn(router, 'navigate');

        component.form.setValue({
            email: 'test@example.com',
            password: 'password',
            nom: 'Doe',
            prenom: 'John',
            statutVehicule: 'HORS_SERVICE',
            zoneAssigneeId: 1
        });

        component.onSubmit();

        expect(service.createChauffeur).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['/chauffeurs']);
    });

    it('should handle form submission error', () => {
        spyOn(service, 'createChauffeur').and.returnValue(
            throwError(() => ({ error: { message: 'Erreur serveur' } }))
        );

        component.form.setValue({
            email: 'test@example.com',
            password: 'password',
            nom: 'Doe',
            prenom: 'John',
            statutVehicule: 'HORS_SERVICE',
            zoneAssigneeId: 1
        });

        component.onSubmit();

        expect(component.error).toBe('Erreur serveur');
        expect(component.loading).toBeFalse();
    });

    it('should navigate on cancel', () => {
        spyOn(router, 'navigate');
        component.onCancel();
        expect(router.navigate).toHaveBeenCalledWith(['/chauffeurs']);
    });
});
