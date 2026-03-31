import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './components/auth-guard/auth.gard';

// Composant mock pour éviter les erreurs
@Component({ template: '' })
class DummyComponent {}

// Mock du AuthGuard
class MockAuthGuard {
    canActivate(): boolean {
        return true;
    }
}

describe('AppRoutingModule', () => {
    let router: Router;
    let location: Location;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                AppRoutingModule,
                RouterTestingModule.withRoutes([]) // éviter conflits
            ],
            declarations: [DummyComponent],
            providers: [
                { provide: AuthGuard, useClass: MockAuthGuard }
            ]
        }).compileComponents();

        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
        router.initialNavigation();
    });

    it('should create the routing module', () => {
        const module = TestBed.inject(AppRoutingModule);
        expect(module).toBeTruthy();
    });

    it('should redirect "" to /login', async () => {
        await router.navigate(['']);
        expect(location.path()).toBe('/login');
    });

    it('should navigate to /login', async () => {
        await router.navigate(['/login']);
        expect(location.path()).toBe('/login');
    });

    it('should navigate to /dashboard (with AuthGuard)', async () => {
        await router.navigate(['/dashboard']);
        expect(location.path()).toBe('/dashboard');
    });

    it('should redirect unknown route to /login', async () => {
        await router.navigate(['/unknown']);
        expect(location.path()).toBe('/login');
    });

});
