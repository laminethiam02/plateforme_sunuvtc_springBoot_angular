import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlerteListComponent } from './alerte-list.component';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { AlerteService } from '../../../services/alerte.service';

// Mock service
class MockAlerteService {
    getAll() {
        return of([
            { id: 1, message: 'Alerte 1', estLue: false },
            { id: 2, message: 'Alerte 2', estLue: false }
        ]);
    }

    delete(id: number) {
        return of({});
    }

    marquerLue(id: number) {
        return of({});
    }
}

// Mock router
class MockRouter {
    navigate(path: any[]) {}
}

describe('AlerteListComponent', () => {
    let component: AlerteListComponent;
    let fixture: ComponentFixture<AlerteListComponent>;
    let service: AlerteService;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AlerteListComponent],
            providers: [
                { provide: AlerteService, useClass: MockAlerteService },
                { provide: Router, useClass: MockRouter }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AlerteListComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(AlerteService);
        router = TestBed.inject(Router);

        fixture.detectChanges(); // ngOnInit()
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load alertes on init', () => {
        expect(component.alertes.length).toBe(2);
        expect(component.loading).toBeFalse();
    });

    it('should handle error when loading alertes', () => {
        spyOn(service, 'getAll').and.returnValue(throwError(() => ({})));

        component.loadAlertes();

        expect(component.error).toBe('Erreur chargement');
        expect(component.loading).toBeFalse();
    });

    it('should navigate to add page', () => {
        spyOn(router, 'navigate');

        component.onAdd();

        expect(router.navigate).toHaveBeenCalledWith(['/alertes/add']);
    });

    it('should navigate to edit page', () => {
        spyOn(router, 'navigate');

        component.onEdit(1);

        expect(router.navigate).toHaveBeenCalledWith(['/alertes/edit', 1]);
    });

    it('should delete alerte when confirmed', () => {
        spyOn(window, 'confirm').and.returnValue(true);
        spyOn(service, 'delete').and.returnValue(of({}));

        component.alertes = [
            { id: 1, message: 'Alerte 1', estLue: false },
            { id: 2, message: 'Alerte 2', estLue: false }
        ];

        component.onDelete(1);

        expect(component.alertes.length).toBe(1);
        expect(component.alertes.find(a => a.id === 1)).toBeUndefined();
    });

    it('should not delete if not confirmed', () => {
        spyOn(window, 'confirm').and.returnValue(false);
        spyOn(service, 'delete');

        component.onDelete(1);

        expect(service.delete).not.toHaveBeenCalled();
    });

    it('should handle error on delete', () => {
        spyOn(window, 'confirm').and.returnValue(true);
        spyOn(service, 'delete').and.returnValue(throwError(() => ({})));

        component.onDelete(1);

        expect(component.error).toBe('Erreur suppression');
    });

    it('should mark alerte as read', () => {
        spyOn(service, 'marquerLue').and.returnValue(of({}));

        component.alertes = [
            { id: 1, message: 'Alerte 1', estLue: false }
        ];

        component.marquerLue(1);

        expect(component.alertes[0].estLue).toBeTrue();
    });

    it('should handle error when marking as read', () => {
        spyOn(service, 'marquerLue').and.returnValue(throwError(() => ({})));

        component.marquerLue(1);

        expect(component.error).toBe('Erreur marquage');
    });
});
