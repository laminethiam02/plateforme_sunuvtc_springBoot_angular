import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { ChauffeurEditComponent } from './chauffeur-edit.component';
import { ChauffeurService } from '../../../services/chauffeur.service';
import { ZoneService } from '../../../services/zone.service';
import { Zone } from '../../../models/zone.model';

// Mock ChauffeurService
class MockChauffeurService {
    getChauffeurById(id: number) {
        return of({
            id,
            email: 'test@example.com',
            nom: 'Doe',
            prenom: 'John',
            statutVehicule: 'HORS_SERVICE',
            zoneAssigneeId: 1
        });
    }

    updateChauffeur(id: number, data: any) {
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

// Mock ActivatedRoute
class MockActivatedRoute {
    snapshot = {
        paramMap: {
            get: (key: string) => '1'
        }
    };
}

describe('ChauffeurEditComponent', () => {
    let component: ChauffeurEditComponent;
    let fixture: ComponentFixture<ChauffeurEditComponent>;
    let service: ChauffeurService;
    let zoneService: ZoneService;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ChauffeurEditComponent],
            imports: [ReactiveFormsModule],
            providers: [
                { provide: ChauffeurService, useClass: MockChauffeurService },
                { provide: ZoneService, useClass: MockZoneService },
                { provide: Router, useClass: MockRouter },
                { provide: ActivatedRoute, useClass: MockActivatedRoute }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ChauffeurEditComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(ChauffeurService);
        zoneService = TestBed.inject(ZoneService);
        router = TestBed.inject(Router);
        fixture.detectChanges(); // ngOnInit
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load zones and chauffeur on init', () => {
        expect(component.zones.length).toBe(2);
        expect(component.form.value.email).toBe('test@example.com');
    });

    it('should submit valid form successfully', () => {
        spyOn(service, 'updateChauffeur').and.callThrough();
        spyOn(router, 'navigate');

        component.form.setValue({
            email: 'updated@example.com',
            password: 'newpassword',
            nom: 'Doe',
            prenom: 'John',
            statutVehicule: 'HORS_SERVICE',
            zoneAssigneeId: 1
        });

        component.onSubmit();

        expect(service.updateChauffeur).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['/chauffeurs']);
    });

    it('should handle form submission error', () => {
        spyOn(service, 'updateChauffeur').and.returnValue(
            throwError(() => ({ error: { message: 'Erreur serveur' } }))
        );

        component.form.setValue({
            email: 'updated@example.com',
            password: 'newpassword',
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
