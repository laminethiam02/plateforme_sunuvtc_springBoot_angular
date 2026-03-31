import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;
    let mockAuthService: any;
    let mockRouter: any;

    beforeEach(() => {
        mockAuthService = {
            register: jasmine.createSpy('register')
        };

        mockRouter = {
            navigate: jasmine.createSpy('navigate')
        };

        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [RegisterComponent],
            providers: [
                { provide: AuthService, useValue: mockAuthService },
                { provide: Router, useValue: mockRouter }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show error if required fields are empty', () => {
        component.userData = { username: '', password: '', confirmPassword: '', email: '', fullName: '', phone: '' };
        component.onSubmit();
        expect(component.errorMessage).toBe('Veuillez remplir les champs obligatoires');
    });

    it('should show error if passwords do not match', () => {
        component.userData = { username: 'user', password: '123456', confirmPassword: '654321', email: 'test@test.com', fullName: '', phone: '' };
        component.onSubmit();
        expect(component.errorMessage).toBe('Les mots de passe ne correspondent pas');
    });

    it('should show error if password is too short', () => {
        component.userData = { username: 'user', password: '123', confirmPassword: '123', email: 'test@test.com', fullName: '', phone: '' };
        component.onSubmit();
        expect(component.errorMessage).toBe('Le mot de passe doit contenir au moins 6 caractères');
    });

    it('should call authService.register and show success message', fakeAsync(() => {
        component.userData = { username: 'user', password: '123456', confirmPassword: '123456', email: 'test@test.com', fullName: '', phone: '' };
        mockAuthService.register.and.returnValue(of({ success: true }));

        component.onSubmit();
        tick();

        expect(mockAuthService.register).toHaveBeenCalledWith(component.userData);
        expect(component.isLoading).toBeFalse();
        expect(component.successMessage).toBe('Inscription réussie ! Redirection...');
    }));

    it('should show error message if registration fails', fakeAsync(() => {
        component.userData = { username: 'user', password: '123456', confirmPassword: '123456', email: 'test@test.com', fullName: '', phone: '' };
        mockAuthService.register.and.returnValue(of({ success: false, message: 'Utilisateur existant' }));

        component.onSubmit();
        tick();

        expect(component.isLoading).toBeFalse();
        expect(component.errorMessage).toBe('Utilisateur existant');
    }));

    it('should show error message if service throws error', fakeAsync(() => {
        component.userData = { username: 'user', password: '123456', confirmPassword: '123456', email: 'test@test.com', fullName: '', phone: '' };
        mockAuthService.register.and.returnValue(throwError(() => new Error('Network error')));

        component.onSubmit();
        tick();

        expect(component.isLoading).toBeFalse();
        expect(component.errorMessage).toBe('Erreur lors de l\'inscription');
    }));
});
