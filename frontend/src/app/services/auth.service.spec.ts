import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService, AuthResponse, User } from './auth.service';

describe('AuthService', () => {
    let service: AuthService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        // Réinitialiser le localStorage avant chaque test
        localStorage.clear();

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService]
        });

        service = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
        localStorage.clear();
    });

    it('devrait être créé', () => {
        expect(service).toBeTruthy();
    });

    it('devrait se connecter et sauvegarder user et token', () => {
        const dummyUser: User = { id: 1, username: 'john', email: 'john@test.com', fullName: 'John Doe', phone: '123456' };
        const response: AuthResponse = { success: true, message: 'Ok', user: dummyUser, token: 'abc123' };

        service.login('john', 'password').subscribe(res => {
            expect(res).toEqual(response);
            expect(localStorage.getItem('currentUser')).toEqual(JSON.stringify(dummyUser));
            expect(localStorage.getItem('token')).toBe('abc123');
            expect(service.getCurrentUser()).toEqual(dummyUser);
            expect(service.isLoggedIn()).toBeTrue();
        });

        const req = httpMock.expectOne('http://localhost:8080/api/auth/login');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({ username: 'john', password: 'password' });
        req.flush(response);
    });

    it('devrait échouer la connexion sans sauvegarder', () => {
        const response: AuthResponse = { success: false, message: 'Erreur' };

        service.login('john', 'wrongpassword').subscribe(res => {
            expect(res).toEqual(response);
            expect(localStorage.getItem('currentUser')).toBeNull();
            expect(localStorage.getItem('token')).toBeNull();
            expect(service.getCurrentUser()).toBeNull();
            expect(service.isLoggedIn()).toBeFalse();
        });

        const req = httpMock.expectOne('http://localhost:8080/api/auth/login');
        req.flush(response);
    });

    it('devrait s\'inscrire', () => {
        const userData = { username: 'jane', password: 'pass123' };
        const response: AuthResponse = { success: true, message: 'Utilisateur créé' };

        service.register(userData).subscribe(res => {
            expect(res).toEqual(response);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/auth/register');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(userData);
        req.flush(response);
    });

    it('devrait se déconnecter et supprimer les données du localStorage', () => {
        localStorage.setItem('currentUser', JSON.stringify({ id: 1, username: 'john', email: '', fullName: '', phone: '' }));
        localStorage.setItem('token', 'abc123');
        service.logout();
        expect(localStorage.getItem('currentUser')).toBeNull();
        expect(localStorage.getItem('token')).toBeNull();
        expect(service.getCurrentUser()).toBeNull();
        expect(service.isLoggedIn()).toBeFalse();
    });

    it('devrait retourner null si aucun utilisateur courant', () => {
        expect(service.getCurrentUser()).toBeNull();
        expect(service.isLoggedIn()).toBeFalse();
        expect(service.getToken()).toBeNull();
    });
});
