import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuditLogEditComponent } from './audit-log-edit.component';
import { Router } from '@angular/router';

// Mock Router
class MockRouter {
    navigate(commands: any[]) {}
}

describe('AuditLogEditComponent', () => {
    let component: AuditLogEditComponent;
    let fixture: ComponentFixture<AuditLogEditComponent>;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AuditLogEditComponent],
            providers: [
                { provide: Router, useClass: MockRouter }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AuditLogEditComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);

        fixture.detectChanges();
    });

    // ✅ Test création
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // ✅ Test contenu HTML
    it('should display warning message', () => {
        const compiled = fixture.nativeElement as HTMLElement;

        expect(compiled.textContent).toContain('Modification non autorisée');
        expect(compiled.textContent).toContain("Les logs d'audit ne peuvent pas être modifiés.");
    });

    // ✅ Test bouton retour
    it('should navigate back on goBack()', () => {
        spyOn(router, 'navigate');

        component.goBack();

        expect(router.navigate).toHaveBeenCalledWith(['/audit-logs']);
    });

    // ✅ Test clic bouton
    it('should call goBack when button is clicked', () => {
        spyOn(component, 'goBack');

        const button = fixture.nativeElement.querySelector('button');
        button.click();

        expect(component.goBack).toHaveBeenCalled();
    });
});
