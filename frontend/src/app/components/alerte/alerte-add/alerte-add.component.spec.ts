import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlerteAddComponent } from './alerte-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { AlerteService } from '../../../services/alerte.service';
import { ChauffeurService } from '../../../services/chauffeur.service';
import { ZoneService } from '../../../services/zone.service';

// Mocks
class MockAlerteService {
    create() {
        return of({});
    }
}

class MockChauffeurService {
    getAllChauffeurs() {
        return of([{ id: 1, nom: 'Chauffeur 1' }]);
    }
}

class MockZoneService {
    getAllZones() {
        return of([{ id: 1, nom: 'Zone A' }]);
    }
}

class MockRouter {
    navigate(path: string[]) {}
}

describe('AlerteAddComponent', () => {
    let component: AlerteAddComponent;
    let fixture: ComponentFixture<AlerteAddComponent>;
    let service: AlerteService;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AlerteAddComponent],
            imports: [ReactiveFormsModule],
            providers: [
                { provide: AlerteService, useClass: MockAlerteService },
                { provide: ChauffeurService, useClass: MockChauffeurService },
                { provide: ZoneService, useClass: MockZoneService },
                { provide: Router, useClass: MockRouter }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AlerteAddComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(AlerteService);
        router = TestBed.inject(Router);

        fixture.detectChanges(); // ngOnInit()
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize chauffeurs and zones on init', () => {
        expect(component.chauffeurs.length).toBeGreaterThan(0);
        expect(component.zones.length).toBeGreaterThan(0);
    });

    it('form should be invalid when empty', () => {
        expect(component.form.valid).toBeFalse();
    });

    it('should submit form and navigate on success', () => {
        spyOn(service, 'create').and.returnValue(of({}));
        spyOn(router, 'navigate');

        component.form.setValue({
            chauffeurId: 1,
            typeAlerte: 'urgence',
            message: 'Test alerte',
            latitude: null,
            longitude: null,
            zoneConcerneeId: null,
            estLue: false
        });

        component.onSubmit();

        expect(service.create).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['/alertes']);
    });

    it('should handle error on submit', () => {
        spyOn(service, 'create').and.returnValue(
            throwError(() => ({ error: { message: 'Erreur backend' } }))
        );

        component.form.setValue({
            chauffeurId: 1,
            typeAlerte: 'urgence',
            message: 'Test alerte',
            latitude: null,
            longitude: null,
            zoneConcerneeId: null,
            estLue: false
        });

        component.onSubmit();

        expect(component.error).toBe('Erreur backend');
        expect(component.loading).toBeFalse();
    });

    it('should not submit if form is invalid', () => {
        spyOn(service, 'create');

        component.onSubmit();

        expect(service.create).not.toHaveBeenCalled();
    });

    it('should navigate on cancel', () => {
        spyOn(router, 'navigate');

        component.onCancel();

        expect(router.navigate).toHaveBeenCalledWith(['/alertes']);
    });
});
