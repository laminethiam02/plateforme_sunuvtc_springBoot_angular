import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ChauffeurService } from './chauffeur.service';
import { Chauffeur } from '../models/chauffeur.model';

describe('ChauffeurService', () => {
    let service: ChauffeurService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ChauffeurService]
        });

        service = TestBed.inject(ChauffeurService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('devrait être créé', () => {
        expect(service).toBeTruthy();
    });

    it('devrait récupérer tous les chauffeurs', () => {
        const dummyChauffeurs: Chauffeur[] = [
            new Chauffeur({ id: 1, email: 'a@ex.com', password: '123', nom: 'Dupont', prenom: 'Jean', statutVehicule: 'LIBRE' }),
            new Chauffeur({ id: 2, email: 'b@ex.com', password: '456', nom: 'Martin', prenom: 'Paul', statutVehicule: 'HORS_SERVICE' })
        ];

        service.getAllChauffeurs().subscribe(chauffeurs => {
            expect(chauffeurs.length).toBe(2);
            expect(chauffeurs).toEqual(dummyChauffeurs);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/chauffeurs');
        expect(req.request.method).toBe('GET');
        req.flush(dummyChauffeurs);
    });

    it('devrait récupérer un chauffeur par id', () => {
        const chauffeur = new Chauffeur({ id: 1, email: 'a@ex.com', password: '123', nom: 'Dupont', prenom: 'Jean', statutVehicule: 'LIBRE' });

        service.getChauffeurById(1).subscribe(c => {
            expect(c).toEqual(chauffeur);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/chauffeurs/1');
        expect(req.request.method).toBe('GET');
        req.flush(chauffeur);
    });

    it('devrait récupérer les chauffeurs par zone', () => {
        const chauffeurs: Chauffeur[] = [
            new Chauffeur({ id: 1, email: 'a@ex.com', password: '123', nom: 'Dupont', prenom: 'Jean', statutVehicule: 'LIBRE' })
        ];

        service.getChauffeursByZone(5).subscribe(cs => {
            expect(cs.length).toBe(1);
            expect(cs).toEqual(chauffeurs);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/chauffeurs/by-zone/5');
        expect(req.request.method).toBe('GET');
        req.flush(chauffeurs);
    });

    it('devrait récupérer les chauffeurs par statut', () => {
        const chauffeurs: Chauffeur[] = [
            new Chauffeur({ id: 1, email: 'a@ex.com', password: '123', nom: 'Dupont', prenom: 'Jean', statutVehicule: 'LIBRE' })
        ];

        service.getChauffeursByStatut('LIBRE').subscribe(cs => {
            expect(cs.length).toBe(1);
            expect(cs).toEqual(chauffeurs);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/chauffeurs/by-statut/LIBRE');
        expect(req.request.method).toBe('GET');
        req.flush(chauffeurs);
    });

    it('devrait créer un chauffeur', () => {
        const newChauffeur = new Chauffeur({ email: 'c@ex.com', password: '789', nom: 'Durand', prenom: 'Luc', statutVehicule: 'HORS_SERVICE' });

        service.createChauffeur(newChauffeur).subscribe(c => {
            expect(c).toEqual(newChauffeur);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/chauffeurs');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(newChauffeur);
        req.flush(newChauffeur);
    });

    it('devrait mettre à jour un chauffeur', () => {
        const updatedChauffeur = new Chauffeur({ id: 1, email: 'a@ex.com', password: '123', nom: 'Dupont', prenom: 'Jean', statutVehicule: 'EN_COURSE' });

        service.updateChauffeur(1, updatedChauffeur).subscribe(c => {
            expect(c).toEqual(updatedChauffeur);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/chauffeurs/1');
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(updatedChauffeur);
        req.flush(updatedChauffeur);
    });

    it('devrait supprimer un chauffeur', () => {
        service.deleteChauffeur(1).subscribe(response => {
            expect(response).toBeUndefined();
        });

        const req = httpMock.expectOne('http://localhost:8080/api/chauffeurs/1');
        expect(req.request.method).toBe('DELETE');
        req.flush(null);
    });
});
