import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ZoneService } from './zone.service';
import { Zone } from '../models/zone.model';

describe('ZoneService', () => {
    let service: ZoneService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ZoneService]
        });

        service = TestBed.inject(ZoneService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify(); // Vérifie qu'aucune requête HTTP n'est en attente
    });

    it('devrait être créé', () => {
        expect(service).toBeTruthy();
    });

    it('devrait récupérer toutes les zones', () => {
        const dummyZones: Zone[] = [
            new Zone({ id: 1, nom: 'Zone A', couleur: '#ff0000', tarif: 100, actif: true, geom: 'POLYGON(...)' }),
            new Zone({ id: 2, nom: 'Zone B', couleur: '#00ff00', tarif: 200, actif: true, geom: 'POLYGON(...)' }),
        ];

        service.getAllZones().subscribe(zones => {
            expect(zones.length).toBe(2);
            expect(zones).toEqual(dummyZones);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/zones');
        expect(req.request.method).toBe('GET');
        req.flush(dummyZones);
    });

    it('devrait récupérer les zones actives', () => {
        const activeZones: Zone[] = [
            new Zone({ id: 1, nom: 'Zone A', couleur: '#ff0000', tarif: 100, actif: true, geom: 'POLYGON(...)' }),
        ];

        service.getActiveZones().subscribe(zones => {
            expect(zones.length).toBe(1);
            expect(zones).toEqual(activeZones);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/zones/active');
        expect(req.request.method).toBe('GET');
        req.flush(activeZones);
    });

    it('devrait récupérer une zone par id', () => {
        const zone: Zone = new Zone({ id: 1, nom: 'Zone A', couleur: '#ff0000', tarif: 100, actif: true, geom: 'POLYGON(...)' });

        service.getZoneById(1).subscribe(z => {
            expect(z).toEqual(zone);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/zones/1');
        expect(req.request.method).toBe('GET');
        req.flush(zone);
    });

    it('devrait créer une zone', () => {
        const newZone = new Zone({ nom: 'Zone C', couleur: '#0000ff', tarif: 150, actif: true, geom: 'POLYGON(...)' });

        service.createZone(newZone).subscribe(zone => {
            expect(zone).toEqual(newZone);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/zones');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(newZone);
        req.flush(newZone);
    });

    it('devrait mettre à jour une zone', () => {
        const updatedZone = new Zone({ id: 1, nom: 'Zone A1', couleur: '#ff0000', tarif: 120, actif: true, geom: 'POLYGON(...)' });

        service.updateZone(1, updatedZone).subscribe(zone => {
            expect(zone).toEqual(updatedZone);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/zones/1');
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(updatedZone);
        req.flush(updatedZone);
    });

    it('devrait supprimer une zone', () => {
        service.deleteZone(1).subscribe(response => {
            expect(response).toBeUndefined();
        });

        const req = httpMock.expectOne('http://localhost:8080/api/zones/1');
        expect(req.request.method).toBe('DELETE');
        req.flush(null);
    });

});
