import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VehiculeService } from './vehicule.service';
import { Vehicule } from '../models/vehicule.model';

describe('VehiculeService', () => {
    let service: VehiculeService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [VehiculeService]
        });

        service = TestBed.inject(VehiculeService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify(); // Vérifie qu'aucune requête HTTP n'est en attente
    });

    it('devrait être créé', () => {
        expect(service).toBeTruthy();
    });

    it('devrait récupérer tous les véhicules', () => {
        const dummyVehicules: Vehicule[] = [
            new Vehicule({ id: 1, immatriculation: '123ABC', marque: 'Toyota' }),
            new Vehicule({ id: 2, immatriculation: '456DEF', marque: 'Honda' })
        ];

        service.getAll().subscribe(vehicules => {
            expect(vehicules.length).toBe(2);
            expect(vehicules).toEqual(dummyVehicules);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/vehicules');
        expect(req.request.method).toBe('GET');
        req.flush(dummyVehicules);
    });

    it('devrait récupérer un véhicule par id', () => {
        const vehicule = new Vehicule({ id: 1, immatriculation: '123ABC', marque: 'Toyota' });

        service.getById(1).subscribe(v => {
            expect(v).toEqual(vehicule);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/vehicules/1');
        expect(req.request.method).toBe('GET');
        req.flush(vehicule);
    });

    it('devrait créer un véhicule', () => {
        const newVehicule = new Vehicule({ immatriculation: '789GHI', marque: 'Ford' });

        service.create(newVehicule).subscribe(v => {
            expect(v).toEqual(newVehicule);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/vehicules');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(newVehicule);
        req.flush(newVehicule);
    });

    it('devrait mettre à jour un véhicule', () => {
        const updatedVehicule = new Vehicule({ id: 1, immatriculation: '123ABC', marque: 'Toyota', modele: 'Corolla' });

        service.update(1, updatedVehicule).subscribe(v => {
            expect(v).toEqual(updatedVehicule);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/vehicules/1');
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(updatedVehicule);
        req.flush(updatedVehicule);
    });

    it('devrait supprimer un véhicule', () => {
        service.delete(1).subscribe(response => {
            expect(response).toBeUndefined();
        });

        const req = httpMock.expectOne('http://localhost:8080/api/vehicules/1');
        expect(req.request.method).toBe('DELETE');
        req.flush(null);
    });

    it('devrait assigner un chauffeur à un véhicule', () => {
        const vehicule = new Vehicule({ id: 1, immatriculation: '123ABC', chauffeurId: 5 });

        service.assignChauffeur(1, 5).subscribe(v => {
            expect(v.chauffeurId).toBe(5);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/vehicules/1/assign/5');
        expect(req.request.method).toBe('PATCH');
        expect(req.request.body).toEqual({});
        req.flush(vehicule);
    });
});
