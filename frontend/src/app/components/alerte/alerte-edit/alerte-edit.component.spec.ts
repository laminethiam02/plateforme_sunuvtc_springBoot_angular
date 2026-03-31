import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlerteEditComponent } from './alerte-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { AlerteService } from '../../../services/alerte.service';
import { ChauffeurService } from '../../../services/chauffeur.service';
import { ZoneService } from '../../../services/zone.service';

// Mocks
class MockAlerteService {
    getById(id: number) {
        return of({
            chauffeurId: 1,
            typeAlerte: 'urgence',
            message: 'Alerte test',
            latitude: null,
            longitude: null,
            zoneConcerneeId: null,
            estLue: false
        });
    }

    update(id: number, data: any) {
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

const mockActivatedRoute = {
    snapshot: {
        paramMap: {
            get: (key: string) => '1'
        }
    }
};

describe('AlerteEditComponent', () => {
    let component: AlerteEditComponent;
    let fixture: ComponentFixture<AlerteEditComponent>;
    let service: AlerteService;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AlerteEditComponent],
            imports: [ReactiveFormsModule],
            providers: [
                { provide: AlerteService, useClass: MockAlerteService },
                { provide: ChauffeurService, useClass: MockChauffeurService },
                { provide: ZoneService, useClass: MockZoneService },
                { provide: Router, useClass: MockRouter },
                { provide: ActivatedRoute, useValue: mockActivatedRoute }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AlerteEditComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(AlerteService);
        router = TestBed.inject(Router);

        fixture.detectChanges(); // ngOnInit()
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize id from route', () => {
        expect(component.id).toBe(1);
    });

    it('should load chauffeurs and zones', () => {
        expect(component.chauffeurs.length).toBeGreaterThan(0);
        expect(component.zones.length).toBeGreaterThan(0);
    });

    it('should load alerte and patch form', () => {
        expect(component.form.value.typeAlerte).toBe('urgence');
        expect(component.loading).toBeFalse();
    });

    it('should handle error when loading alerte', () => {
        spyOn(service, 'getById').and.returnValue(throwError(() => ({})));

        component.ngOnInit();

        expect(component.error).toBe('Erreur chargement');
        expect(component.loading).toBeFalse();
    });

    it('should submit form and navigate on success', () => {
        spyOn(service, 'update').and.returnValue(of({}));
        spyOn(router, 'navigate');

        component.form.setValue({
            chauffeurId: 1,
            typeAlerte: 'urgence',
            message: 'Updated',
            latitude: null,
            longitude: null,
            zoneConcerneeId: null,
            estLue: false
        });

        component.onSubmit();

        expect(service.update).toHaveBeenCalledWith(1, component.form.value);
        expect(router.navigate).toHaveBeenCalledWith(['/alertes']);
    });

    it('should handle error on submit', () => {
        spyOn(service, 'update').and.returnValue(
            throwError(() => ({ error: { message: 'Erreur backend' } }))
        );

        component.form.setValue({
            chauffeurId: 1,
            typeAlerte: 'urgence',
            message: 'Updated',
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
        spyOn(service, 'update');

        component.form.reset(); // formulaire invalide
        component.onSubmit();

        expect(service.update).not.toHaveBeenCalled();
    });

    it('should navigate on cancel', () => {
        spyOn(router, 'navigate');

        component.onCancel();

        expect(router.navigate).toHaveBeenCalledWith(['/alertes']);
    });
});
