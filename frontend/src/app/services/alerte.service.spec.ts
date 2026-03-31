import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AlerteService } from './alerte.service';
import { Alerte } from '../models/alerte.model';

describe('AlerteService', () => {
    let service: AlerteService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AlerteService]
        });
        service = TestBed.inject(AlerteService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('devrait être créé', () => {
        expect(service).toBeTruthy();
    });

    it('devrait récupérer toutes les alertes', () => {
        const dummyAlertes: Alerte[] = [
            { id: 1, chauffeurId: 1, typeAlerte: 'SECURITE', message: 'Test', estLue: false },
            { id: 2, chauffeurId: 2, typeAlerte: 'INFO', message: 'Info', estLue: true }
        ];

        service.getAll().subscribe(alertes => {
            expect(alertes.length).toBe(2);
            expect(alertes).toEqual(dummyAlertes);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/alertes');
        expect(req.request.method).toBe('GET');
        req.flush(dummyAlertes);
    });

    it('devrait récupérer une alerte par ID', () => {
        const dummyAlerte: Alerte = { id: 1, chauffeurId: 1, typeAlerte: 'SECURITE', message: 'Test', estLue: false };

        service.getById(1).subscribe(alerte => {
            expect(alerte).toEqual(dummyAlerte);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/alertes/1');
        expect(req.request.method).toBe('GET');
        req.flush(dummyAlerte);
    });

    it('devrait récupérer les alertes d\'un chauffeur', () => {
        const dummyAlertes: Alerte[] = [
            { id: 1, chauffeurId: 1, typeAlerte: 'SECURITE', message: 'Test', estLue: false }
        ];

        service.getByChauffeur(1).subscribe(alertes => {
            expect(alertes.length).toBe(1);
            expect(alertes).toEqual(dummyAlertes);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/alertes/chauffeur/1');
        expect(req.request.method).toBe('GET');
        req.flush(dummyAlertes);
    });

    it('devrait récupérer les alertes non lues d\'un chauffeur', () => {
        const dummyAlertes: Alerte[] = [
            { id: 1, chauffeurId: 1, typeAlerte: 'SECURITE', message: 'Test', estLue: false }
        ];

        service.getNonLues(1).subscribe(alertes => {
            expect(alertes.length).toBe(1);
            expect(alertes).toEqual(dummyAlertes);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/alertes/chauffeur/1/non-lues');
        expect(req.request.method).toBe('GET');
        req.flush(dummyAlertes);
    });

    it('devrait créer une alerte', () => {
        const newAlerte: Alerte = { chauffeurId: 1, typeAlerte: 'INFO', message: 'Nouvelle', estLue: false };
        const createdAlerte: Alerte = { ...newAlerte, id: 1 };

        service.create(newAlerte).subscribe(alerte => {
            expect(alerte).toEqual(createdAlerte);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/alertes');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(newAlerte);
        req.flush(createdAlerte);
    });

    it('devrait mettre à jour une alerte', () => {
        const updatedAlerte: Alerte = { id: 1, chauffeurId: 1, typeAlerte: 'INFO', message: 'Modifiée', estLue: true };

        service.update(1, updatedAlerte).subscribe(alerte => {
            expect(alerte).toEqual(updatedAlerte);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/alertes/1');
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(updatedAlerte);
        req.flush(updatedAlerte);
    });

    it('devrait marquer une alerte comme lue', () => {
        service.marquerLue(1).subscribe(response => {
            expect(response).toBeUndefined();
        });

        const req = httpMock.expectOne('http://localhost:8080/api/alertes/1/lue');
        expect(req.request.method).toBe('PATCH');
        req.flush(null);
    });

    it('devrait supprimer une alerte', () => {
        service.delete(1).subscribe(response => {
            expect(response).toBeUndefined();
        });

        const req = httpMock.expectOne('http://localhost:8080/api/alertes/1');
        expect(req.request.method).toBe('DELETE');
        req.flush(null);
    });
});
