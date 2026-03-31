import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HistoriquePositionListComponent } from './historique-position-list.component';
import { HistoriquePositionService } from '../../../services/historique-position.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('HistoriquePositionListComponent', () => {
    let component: HistoriquePositionListComponent;
    let fixture: ComponentFixture<HistoriquePositionListComponent>;
    let mockService: any;
    let mockRouter: any;

    beforeEach(async () => {
        mockService = {
            getAll: jasmine.createSpy('getAll').and.returnValue(of([
                { id: 1, latitude: 12, longitude: 34 },
                { id: 2, latitude: 56, longitude: 78 }
            ])),
            delete: jasmine.createSpy('delete').and.returnValue(of({}))
        };

        mockRouter = { navigate: jasmine.createSpy('navigate') };

        await TestBed.configureTestingModule({
            declarations: [HistoriquePositionListComponent],
            providers: [
                { provide: HistoriquePositionService, useValue: mockService },
                { provide: Router, useValue: mockRouter }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HistoriquePositionListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load positions on init', () => {
        component.ngOnInit();
        expect(mockService.getAll).toHaveBeenCalled();
        expect(component.positions.length).toBe(2);
        expect(component.loading).toBeFalse();
    });

    it('should handle load positions error', () => {
        mockService.getAll.and.returnValue(throwError(() => new Error('Erreur')));
        component.loadPositions();
        expect(component.loading).toBeFalse();
        expect(component.error).toBe('Erreur chargement');
    });

    it('should navigate to add page on onAdd', () => {
        component.onAdd();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/historique-positions/add']);
    });

    it('should delete a position when confirmed', fakeAsync(() => {
        spyOn(window, 'confirm').and.returnValue(true);
        component.onDelete(1);
        tick();
        expect(mockService.delete).toHaveBeenCalledWith(1);
        expect(component.positions.find(p => p.id === 1)).toBeUndefined();
    }));

    it('should not delete a position when canceled', () => {
        spyOn(window, 'confirm').and.returnValue(false);
        component.onDelete(1);
        expect(mockService.delete).not.toHaveBeenCalled();
    });

    it('should handle delete error', fakeAsync(() => {
        spyOn(window, 'confirm').and.returnValue(true);
        mockService.delete.and.returnValue(throwError(() => new Error('Erreur')));
        component.onDelete(1);
        tick();
        expect(component.error).toBe('Erreur suppression');
    }));
});
