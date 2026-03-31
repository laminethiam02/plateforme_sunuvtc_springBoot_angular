import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HistoriquePositionService } from './historique-position.service';
import { HistoriquePosition } from '../models/historique-position.model';

describe('HistoriquePositionService', () => {
    let service: HistoriquePositionService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [HistoriquePositionService]
        });

        service = TestBed.inject(HistoriquePositionService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify(); // Vérifie qu'aucune requête n'est en attente
    });

    it('devrait être créé', () => {
        expect(service).toBeTruthy();
    });

    it('devrait récupérer toutes les positions', () => {
        const dummyPositions: HistoriquePosition[] = [
            new HistoriquePosition({ id: 1, chauffeurId: 10, latitude: 12, longitude: 34, timestampPosition: new Date() }),
            new HistoriquePosition({ id: 2, chauffeurId: 11, latitude: 56, longitude: 78, timestampPosition: new Date() })
        ];

        service.getAll().subscribe(positions => {
            expect(positions.length).toBe(2);
            expect(positions).toEqual(dummyPositions);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/historique-positions');
        expect(req.request.method).toBe('GET');
        req.flush(dummyPositions);
    });

    it('devrait récupérer une position par id', () => {
        const position = new HistoriquePosition({ id: 1, chauffeurId: 10, latitude: 12, longitude: 34, timestampPosition: new Date() });

        service.getById(1).subscribe(p => {
            expect(p).toEqual(position);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/historique-positions/1');
        expect(req.request.method).toBe('GET');
        req.flush(position);
    });

    it('devrait récupérer les positions d’un chauffeur', () => {
        const positions: HistoriquePosition[] = [
            new HistoriquePosition({ id: 1, chauffeurId: 10, latitude: 12, longitude: 34, timestampPosition: new Date() }),
        ];

        service.getByChauffeur(10).subscribe(ps => {
            expect(ps.length).toBe(1);
            expect(ps).toEqual(positions);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/historique-positions/chauffeur/10');
        expect(req.request.method).toBe('GET');
        req.flush(positions);
    });

    it('devrait créer une position', () => {
        const newPosition = new HistoriquePosition({ chauffeurId: 12, latitude: 50, longitude: 60, timestampPosition: new Date() });

        service.create(newPosition).subscribe(p => {
            expect(p).toEqual(newPosition);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/historique-positions');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(newPosition);
        req.flush(newPosition);
    });

    it('devrait supprimer une position', () => {
        service.delete(1).subscribe(response => {
            expect(response).toBeUndefined();
        });

        const req = httpMock.expectOne('http://localhost:8080/api/historique-positions/1');
        expect(req.request.method).toBe('DELETE');
        req.flush(null);
    });
});
