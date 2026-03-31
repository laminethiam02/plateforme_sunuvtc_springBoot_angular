import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let mockAuthService: any;
    let mockRouter: any;

    beforeEach(() => {
        mockAuthService = {
            login: jasmine.createSpy('login'),
            isLoggedIn: jasmine.createSpy('isLoggedIn')
        };

        mockRouter = {
            navigate: jasmine.createSpy('navigate')
        };

        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [LoginComponent],
            providers: [
                { provide: AuthService, useValue: mockAuthService },
                { provide: Router, useValue: mockRouter }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should redirect to dashboard if already logged in', () => {
        mockAuthService.isLoggedIn.and.returnValue(true);

        const comp = new LoginComponent(mockAuthService, mockRouter);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
    });

    it('should show error if username or password is empty', () => {
        component.username = '';
        component.password = '';
        component.onSubmit();
        expect(component.errorMessage).toBe('Veuillez remplir tous les champs');
    });

    it('should call authService.login and navigate on success', fakeAsync(() => {
        component.username = 'user';
        component.password = 'pass';
        mockAuthService.login.and.returnValue(of({ success: true }));

        component.onSubmit();
        tick();

        expect(mockAuthService.login).toHaveBeenCalledWith('user', 'pass');
        expect(component.isLoading).toBeFalse();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
    }));

    it('should show error message if login fails', fakeAsync(() => {
        component.username = 'user';
        component.password = 'pass';
        mockAuthService.login.and.returnValue(of({ success: false, message: 'Invalid credentials' }));

        component.onSubmit();
        tick();

        expect(component.isLoading).toBeFalse();
        expect(component.errorMessage).toBe('Invalid credentials');
    }));

    it('should show error message if login throws error', fakeAsync(() => {
        component.username = 'user';
        component.password = 'pass';
        mockAuthService.login.and.returnValue(throwError(() => new Error('Network error')));

        component.onSubmit();
        tick();

        expect(component.isLoading).toBeFalse();
        expect(component.errorMessage).toBe('Erreur de connexion');
    }));
});
