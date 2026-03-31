import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AvisClientService } from './avis-client.service';
import { AvisClient } from '../models/avis-client.model';

describe('AvisClientService', () => {
    let service: AvisClientService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AvisClientService]
        });

        service = TestBed.inject(AvisClientService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('devrait être créé', () => {
        expect(service).toBeTruthy();
    });

    it('devrait récupérer tous les avis', () => {
        const dummyAvis: AvisClient[] = [
            new AvisClient({ id: 1, courseId: 10, note: 5, commentaire: 'Excellent' }),
            new AvisClient({ id: 2, courseId: 11, note: 4, commentaire: 'Bien' })
        ];

        service.getAll().subscribe(avis => {
            expect(avis.length).toBe(2);
            expect(avis).toEqual(dummyAvis);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/avis');
        expect(req.request.method).toBe('GET');
        req.flush(dummyAvis);
    });

    it('devrait récupérer un avis par id', () => {
        const avis = new AvisClient({ id: 1, courseId: 10, note: 5, commentaire: 'Excellent' });

        service.getById(1).subscribe(a => {
            expect(a).toEqual(avis);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/avis/1');
        expect(req.request.method).toBe('GET');
        req.flush(avis);
    });

    it('devrait récupérer un avis par course', () => {
        const avis = new AvisClient({ id: 1, courseId: 10, note: 5, commentaire: 'Excellent' });

        service.getByCourse(10).subscribe(a => {
            expect(a).toEqual(avis);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/avis/course/10');
        expect(req.request.method).toBe('GET');
        req.flush(avis);
    });

    it('devrait récupérer les avis par note', () => {
        const avis: AvisClient[] = [
            new AvisClient({ id: 1, courseId: 10, note: 5, commentaire: 'Excellent' })
        ];

        service.getByNote(5).subscribe(a => {
            expect(a.length).toBe(1);
            expect(a).toEqual(avis);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/avis/note/5');
        expect(req.request.method).toBe('GET');
        req.flush(avis);
    });

    it('devrait créer un avis', () => {
        const newAvis = new AvisClient({ courseId: 12, note: 4, commentaire: 'Bien' });

        service.create(newAvis).subscribe(a => {
            expect(a).toEqual(newAvis);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/avis');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(newAvis);
        req.flush(newAvis);
    });

    it('devrait mettre à jour un avis', () => {
        const updatedAvis = new AvisClient({ id: 1, courseId: 10, note: 3, commentaire: 'Moyen' });

        service.update(1, updatedAvis).subscribe(a => {
            expect(a).toEqual(updatedAvis);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/avis/1');
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(updatedAvis);
        req.flush(updatedAvis);
    });

    it('devrait supprimer un avis', () => {
        service.delete(1).subscribe(resp => {
            expect(resp).toBeUndefined();
        });

        const req = httpMock.expectOne('http://localhost:8080/api/avis/1');
        expect(req.request.method).toBe('DELETE');
        req.flush(null);
    });
});
