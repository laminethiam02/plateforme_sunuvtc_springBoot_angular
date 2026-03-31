import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuditLogService } from './audit-log.service';
import { AuditLog } from '../models/audit-log.model';

describe('AuditLogService', () => {
    let service: AuditLogService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuditLogService]
        });

        service = TestBed.inject(AuditLogService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('devrait être créé', () => {
        expect(service).toBeTruthy();
    });

    it('devrait récupérer tous les logs', () => {
        const dummyLogs: AuditLog[] = [
            { id: 1, utilisateurType: 'ADMIN', utilisateurId: 1, action: 'CREATE', details: 'Création', createdAt: new Date() },
            { id: 2, utilisateurType: 'CHAUFFEUR', utilisateurId: 2, action: 'UPDATE', details: 'Modification', createdAt: new Date() }
        ];

        service.getAll().subscribe(logs => {
            expect(logs.length).toBe(2);
            expect(logs).toEqual(dummyLogs);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/audit-logs');
        expect(req.request.method).toBe('GET');
        req.flush(dummyLogs);
    });

    it('devrait récupérer un log par ID', () => {
        const dummyLog: AuditLog = { id: 1, utilisateurType: 'ADMIN', utilisateurId: 1, action: 'CREATE' };

        service.getById(1).subscribe(log => {
            expect(log).toEqual(dummyLog);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/audit-logs/1');
        expect(req.request.method).toBe('GET');
        req.flush(dummyLog);
    });

    it('devrait récupérer les logs par utilisateur', () => {
        const dummyLogs: AuditLog[] = [
            { id: 1, utilisateurType: 'ADMIN', utilisateurId: 1, action: 'CREATE' }
        ];

        service.getByUtilisateur('ADMIN', 1).subscribe(logs => {
            expect(logs.length).toBe(1);
            expect(logs).toEqual(dummyLogs);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/audit-logs/utilisateur?type=ADMIN&id=1');
        expect(req.request.method).toBe('GET');
        req.flush(dummyLogs);
    });

    it('devrait créer un log', () => {
        const newLog: AuditLog = { utilisateurType: 'ADMIN', utilisateurId: 1, action: 'CREATE' };
        const createdLog: AuditLog = { ...newLog, id: 1 };

        service.create(newLog).subscribe(log => {
            expect(log).toEqual(createdLog);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/audit-logs');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(newLog);
        req.flush(createdLog);
    });

    it('devrait supprimer un log', () => {
        service.delete(1).subscribe(response => {
            expect(response).toBeUndefined();
        });

        const req = httpMock.expectOne('http://localhost:8080/api/audit-logs/1');
        expect(req.request.method).toBe('DELETE');
        req.flush(null);
    });
});
