import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HistoriqueTarifZoneService } from './historique-tarif-zone.service';
import { HistoriqueTarifZone } from '../models/historique-tarif-zone.model';

describe('HistoriqueTarifZoneService', () => {
    let service: HistoriqueTarifZoneService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [HistoriqueTarifZoneService]
        });

        service = TestBed.inject(HistoriqueTarifZoneService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify(); // Vérifie qu'aucune requête HTTP n'est en attente
    });

    it('devrait être créé', () => {
        expect(service).toBeTruthy();
    });

    it('devrait récupérer tous les historiques', () => {
        const dummyHistoriques: HistoriqueTarifZone[] = [
            new HistoriqueTarifZone({ id: 1, zoneId: 10, ancienTarif: 100, nouveauTarif: 120 }),
            new HistoriqueTarifZone({ id: 2, zoneId: 11, ancienTarif: 150, nouveauTarif: 170 })
        ];

        service.getAll().subscribe(historiques => {
            expect(historiques.length).toBe(2);
            expect(historiques).toEqual(dummyHistoriques);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/historique-tarifs');
        expect(req.request.method).toBe('GET');
        req.flush(dummyHistoriques);
    });

    it('devrait récupérer un historique par id', () => {
        const historique = new HistoriqueTarifZone({ id: 1, zoneId: 10, ancienTarif: 100, nouveauTarif: 120 });

        service.getById(1).subscribe(h => {
            expect(h).toEqual(historique);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/historique-tarifs/1');
        expect(req.request.method).toBe('GET');
        req.flush(historique);
    });

    it('devrait récupérer les historiques par zone', () => {
        const historiques: HistoriqueTarifZone[] = [
            new HistoriqueTarifZone({ id: 1, zoneId: 10, ancienTarif: 100, nouveauTarif: 120 }),
        ];

        service.getByZone(10).subscribe(hs => {
            expect(hs.length).toBe(1);
            expect(hs).toEqual(historiques);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/historique-tarifs/zone/10');
        expect(req.request.method).toBe('GET');
        req.flush(historiques);
    });

    it('devrait créer un historique', () => {
        const newHistorique = new HistoriqueTarifZone({ zoneId: 12, ancienTarif: 200, nouveauTarif: 220 });

        service.create(newHistorique).subscribe(h => {
            expect(h).toEqual(newHistorique);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/historique-tarifs');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(newHistorique);
        req.flush(newHistorique);
    });

    it('devrait mettre à jour un historique', () => {
        const updatedHistorique = new HistoriqueTarifZone({ id: 1, zoneId: 10, ancienTarif: 100, nouveauTarif: 130 });

        service.update(1, updatedHistorique).subscribe(h => {
            expect(h).toEqual(updatedHistorique);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/historique-tarifs/1');
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(updatedHistorique);
        req.flush(updatedHistorique);
    });

    it('devrait supprimer un historique', () => {
        service.delete(1).subscribe(response => {
            expect(response).toBeUndefined();
        });

        const req = httpMock.expectOne('http://localhost:8080/api/historique-tarifs/1');
        expect(req.request.method).toBe('DELETE');
        req.flush(null);
    });
});
