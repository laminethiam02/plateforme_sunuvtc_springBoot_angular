import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpRequest } from '@angular/common/http';

import { AuthService } from '../../services/auth.service';
import {AuthInterceptor} from "./auth.interceptors";

describe('AuthInterceptor', () => {
    let httpMock: HttpTestingController;
    let httpClient: HttpClient;
    let authService: AuthService;

    beforeEach(() => {
        const authServiceMock = {
            getToken: jasmine.createSpy('getToken')
        };

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: AuthService, useValue: authServiceMock },
                { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
            ]
        });

        httpMock = TestBed.inject(HttpTestingController);
        httpClient = TestBed.inject(HttpClient);
        authService = TestBed.inject(AuthService);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('devrait ajouter le token Authorization si présent', () => {
        (authService.getToken as jasmine.Spy).and.returnValue('mock-token');

        httpClient.get('/test').subscribe(response => {
            expect(response).toBeTruthy();
        });

        const req = httpMock.expectOne('/test');
        expect(req.request.headers.has('Authorization')).toBeTrue();
        expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');
        req.flush({ success: true });
    });

    it('ne devrait pas ajouter Authorization si token absent', () => {
        (authService.getToken as jasmine.Spy).and.returnValue(null);

        httpClient.get('/test').subscribe(response => {
            expect(response).toBeTruthy();
        });

        const req = httpMock.expectOne('/test');
        expect(req.request.headers.has('Authorization')).toBeFalse();
        req.flush({ success: true });
    });
});
