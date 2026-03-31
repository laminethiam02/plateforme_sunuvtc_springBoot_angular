import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AvisClientListComponent } from './avis-client-list.component';
import { AvisClientService } from '../../../services/avis-client.service';
import { AvisClient } from '../../../models/avis-client.model';

// Mock service
class MockAvisClientService {
    getAll() {
        return of([
            { id: 1, courseId: 1, note: 5, commentaire: 'Super' },
            { id: 2, courseId: 2, note: 4, commentaire: 'Bien' }
        ] as AvisClient[]);
    }
    delete(id: number) {
        return of({});
    }
}

// Mock router
class MockRouter {
    navigate(commands: any[]) {}
}

describe('AvisClientListComponent', () => {
    let component: AvisClientListComponent;
    let fixture: ComponentFixture<AvisClientListComponent>;
    let service: AvisClientService;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AvisClientListComponent],
            providers: [
                { provide: AvisClientService, useClass: MockAvisClientService },
                { provide: Router, useClass: MockRouter }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AvisClientListComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(AvisClientService);
        router = TestBed.inject(Router);
        fixture.detectChanges(); // ngOnInit()
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load avis on init', () => {
        expect(component.avis.length).toBe(2);
        expect(component.loading).toBeFalse();
        expect(component.error).toBe('');
    });

    it('should navigate to add avis', () => {
        spyOn(router, 'navigate');
        component.onAdd();
        expect(router.navigate).toHaveBeenCalledWith(['/avis/add']);
    });

    it('should navigate to edit avis', () => {
        spyOn(router, 'navigate');
        component.onEdit(1);
        expect(router.navigate).toHaveBeenCalledWith(['/avis/edit', 1]);
    });

    it('should delete avis successfully', () => {
        spyOn(window, 'confirm').and.returnValue(true);
        spyOn(service, 'delete').and.callThrough();
        component.onDelete(1);
        expect(service.delete).toHaveBeenCalledWith(1);
    });

    it('should handle delete error', () => {
        spyOn(window, 'confirm').and.returnValue(true);
        spyOn(service, 'delete').and.returnValue(throwError(() => ({ error: 'Erreur' })));
        component.onDelete(1);
        expect(component.error).toBe('Erreur suppression');
    });

    it('should not delete if confirm is cancelled', () => {
        spyOn(window, 'confirm').and.returnValue(false);
        spyOn(service, 'delete');
        component.onDelete(1);
        expect(service.delete).not.toHaveBeenCalled();
    });
});
