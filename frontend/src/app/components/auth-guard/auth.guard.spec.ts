import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import {AuthGuard} from "./auth.gard";

// Mock AuthService
class MockAuthService {
    isLoggedIn() { return false; }
}

// Mock Router
class MockRouter {
    navigate(commands: any[]) {}
}

describe('AuthGuard', () => {
    let guard: AuthGuard;
    let authService: AuthService;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthGuard,
                { provide: AuthService, useClass: MockAuthService },
                { provide: Router, useClass: MockRouter }
            ]
        });

        guard = TestBed.inject(AuthGuard);
        authService = TestBed.inject(AuthService);
        router = TestBed.inject(Router);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('should allow activation if user is logged in', () => {
        spyOn(authService, 'isLoggedIn').and.returnValue(true);

        const result = guard.canActivate();

        expect(result).toBeTrue();
    });

    it('should prevent activation and navigate to login if user is not logged in', () => {
        spyOn(authService, 'isLoggedIn').and.returnValue(false);
        spyOn(router, 'navigate');

        const result = guard.canActivate();

        expect(result).toBeFalse();
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
});
