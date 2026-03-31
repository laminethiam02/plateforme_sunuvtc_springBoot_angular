import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';

// Mock du AuthService
class MockAuthService {
    logout(): void {}

    getCurrentUser() {
        return {
            fullName: 'Lamine THIAM',
            username: 'lamine'
        };
    }
}

// Mock du Router
class MockRouter {
    navigate(path: string[]): void {}
}

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let authService: AuthService;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppComponent],
            providers: [
                { provide: AuthService, useClass: MockAuthService },
                { provide: Router, useClass: MockRouter }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        authService = TestBed.inject(AuthService);
        router = TestBed.inject(Router);
    });

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });

    it('should have title "SunuVTC"', () => {
        expect(component.title).toEqual('SunuVTC');
    });

    it('should return userName correctly', () => {
        expect(component.userName).toBe('Lamine THIAM');
    });

    it('should call logout and navigate to login', () => {
        spyOn(authService, 'logout');
        spyOn(router, 'navigate');

        component.logout();

        expect(authService.logout).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
});
