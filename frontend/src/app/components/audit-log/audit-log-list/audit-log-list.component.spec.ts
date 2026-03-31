import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuditLogListComponent } from './audit-log-list.component';
import { AuditLogService } from '../../../services/audit-log.service';
import { AuditLog } from '../../../models/audit-log.model';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuditLogListComponent', () => {
    let component: AuditLogListComponent;
    let fixture: ComponentFixture<AuditLogListComponent>;
    let service: AuditLogService;
    let router: Router;

    const dummyLogs: AuditLog[] = [
        { id: 1, utilisateurType: 'ADMIN', utilisateurId: 1, action: 'CREATE', details: 'Création', createdAt: new Date() },
        { id: 2, utilisateurType: 'CHAUFFEUR', utilisateurId: 2, action: 'DELETE', details: 'Suppression', createdAt: new Date() }
    ];

    beforeEach(async () => {
        const serviceMock = {
            getAll: jasmine.createSpy('getAll').and.returnValue(of(dummyLogs)),
            delete: jasmine.createSpy('delete').and.returnValue(of(void 0))
        };

        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [AuditLogListComponent],
            providers: [
                { provide: AuditLogService, useValue: serviceMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AuditLogListComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(AuditLogService);
        router = TestBed.inject(Router);
    });

    it('devrait créer le composant', () => {
        expect(component).toBeTruthy();
    });

    it('devrait charger les logs à l\'initialisation', () => {
        component.ngOnInit();
        expect(service.getAll).toHaveBeenCalled();
        expect(component.logs.length).toBe(2);
        expect(component.loading).toBeFalse();
        expect(component.error).toBe('');
    });

    it('devrait gérer une erreur lors du chargement', () => {
        service.getAll = jasmine.createSpy().and.returnValue(throwError(() => new Error('Erreur')));
        component.loadLogs();
        expect(component.loading).toBeFalse();
        expect(component.error).toBe('Erreur chargement');
    });

    it('devrait naviguer vers add', () => {
        spyOn(router, 'navigate');
        component.onAdd();
        expect(router.navigate).toHaveBeenCalledWith(['/audit-logs/add']);
    });

    it('devrait supprimer un log après confirmation', () => {
        spyOn(window, 'confirm').and.returnValue(true);
        component.logs = [...dummyLogs];
        component.onDelete(1);
        expect(service.delete).toHaveBeenCalledWith(1);
        expect(component.logs.length).toBe(1);
        expect(component.logs[0].id).toBe(2);
    });

    it('ne devrait pas supprimer si annulé', () => {
        spyOn(window, 'confirm').and.returnValue(false);
        component.logs = [...dummyLogs];
        component.onDelete(1);
        expect(service.delete).not.toHaveBeenCalled();
        expect(component.logs.length).toBe(2);
    });

    it('devrait gérer une erreur lors de la suppression', () => {
        spyOn(window, 'confirm').and.returnValue(true);
        service.delete = jasmine.createSpy().and.returnValue(throwError(() => new Error('Erreur')));
        component.logs = [...dummyLogs];
        component.onDelete(1);
        expect(component.error).toBe('Erreur suppression');
    });
});
