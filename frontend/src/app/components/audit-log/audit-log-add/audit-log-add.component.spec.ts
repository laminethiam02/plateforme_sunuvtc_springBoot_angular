import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuditLogAddComponent } from './audit-log-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { AuditLogService } from '../../../services/audit-log.service';

// Mock Service
class MockAuditLogService {
    create(data: any) {
        return of({});
    }
}

// Mock Router
class MockRouter {
    navigate(commands: any[]) {}
}

describe('AuditLogAddComponent', () => {
    let component: AuditLogAddComponent;
    let fixture: ComponentFixture<AuditLogAddComponent>;
    let service: AuditLogService;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AuditLogAddComponent],
            imports: [ReactiveFormsModule],
            providers: [
                { provide: AuditLogService, useClass: MockAuditLogService },
                { provide: Router, useClass: MockRouter }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AuditLogAddComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(AuditLogService);
        router = TestBed.inject(Router);

        fixture.detectChanges();
    });

    // ✅ Création
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // ✅ Formulaire invalide au départ
    it('form should be invalid when empty', () => {
        expect(component.form.valid).toBeFalse();
    });

    // ✅ Soumission réussie
    it('should submit form and navigate on success', () => {
        spyOn(service, 'create').and.returnValue(of({}));
        spyOn(router, 'navigate');

        component.form.setValue({
            utilisateurType: 'ADMIN',
            utilisateurId: '1',
            action: 'CREATE',
            details: 'Test action',
            ipAddress: '127.0.0.1'
        });

        component.onSubmit();

        expect(component.loading).toBeTrue();
        expect(service.create).toHaveBeenCalledWith(component.form.value);
        expect(router.navigate).toHaveBeenCalledWith(['/audit-logs']);
    });

    // ✅ Gestion erreur backend
    it('should handle error on submit', () => {
        spyOn(service, 'create').and.returnValue(
            throwError(() => ({ error: { message: 'Erreur backend' } }))
        );

        component.form.setValue({
            utilisateurType: 'ADMIN',
            utilisateurId: '1',
            action: 'CREATE',
            details: 'Test action',
            ipAddress: '127.0.0.1'
        });

        component.onSubmit();

        expect(component.error).toBe('Erreur backend');
        expect(component.loading).toBeFalse();
    });

    // ✅ Ne rien faire si formulaire invalide
    it('should not submit if form is invalid', () => {
        spyOn(service, 'create');

        component.onSubmit();

        expect(service.create).not.toHaveBeenCalled();
    });

    // ✅ Annulation
    it('should navigate on cancel', () => {
        spyOn(router, 'navigate');

        component.onCancel();

        expect(router.navigate).toHaveBeenCalledWith(['/audit-logs']);
    });
});
