import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

describe('CourseService', () => {
    let service: CourseService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CourseService]
        });

        service = TestBed.inject(CourseService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('devrait être créé', () => {
        expect(service).toBeTruthy();
    });

    it('devrait récupérer toutes les courses', () => {
        const dummyCourses: Course[] = [
            new Course({ id: 1, chauffeurId: 10, latDepart: 12, lngDepart: 34, debut: new Date() }),
            new Course({ id: 2, chauffeurId: 11, latDepart: 56, lngDepart: 78, debut: new Date() })
        ];

        service.getAllCourses().subscribe(courses => {
            expect(courses.length).toBe(2);
            expect(courses).toEqual(dummyCourses);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/courses');
        expect(req.request.method).toBe('GET');
        req.flush(dummyCourses);
    });

    it('devrait récupérer une course par id', () => {
        const course = new Course({ id: 1, chauffeurId: 10, latDepart: 12, lngDepart: 34, debut: new Date() });

        service.getCourseById(1).subscribe(c => {
            expect(c).toEqual(course);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/courses/1');
        expect(req.request.method).toBe('GET');
        req.flush(course);
    });

    it('devrait récupérer les courses d’un chauffeur', () => {
        const courses: Course[] = [
            new Course({ id: 1, chauffeurId: 10, latDepart: 12, lngDepart: 34, debut: new Date() })
        ];

        service.getCoursesByChauffeur(10).subscribe(cs => {
            expect(cs.length).toBe(1);
            expect(cs).toEqual(courses);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/courses/by-chauffeur/10');
        expect(req.request.method).toBe('GET');
        req.flush(courses);
    });

    it('devrait récupérer les courses par statut', () => {
        const courses: Course[] = [
            new Course({ id: 1, chauffeurId: 10, latDepart: 12, lngDepart: 34, debut: new Date(), statut: 'EN_COURSE' })
        ];

        service.getCoursesByStatut('EN_COURSE').subscribe(cs => {
            expect(cs.length).toBe(1);
            expect(cs).toEqual(courses);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/courses/by-statut/EN_COURSE');
        expect(req.request.method).toBe('GET');
        req.flush(courses);
    });

    it('devrait récupérer les courses par plage de dates', () => {
        const start = new Date('2026-01-01');
        const end = new Date('2026-01-31');
        const courses: Course[] = [
            new Course({ id: 1, chauffeurId: 10, latDepart: 12, lngDepart: 34, debut: new Date('2026-01-15') })
        ];

        service.getCoursesByDateRange(start, end).subscribe(cs => {
            expect(cs.length).toBe(1);
            expect(cs).toEqual(courses);
        });

        const req = httpMock.expectOne(req => req.url === 'http://localhost:8080/api/courses/by-date-range' &&
            req.params.get('start') === start.toISOString() &&
            req.params.get('end') === end.toISOString()
        );
        expect(req.request.method).toBe('GET');
        req.flush(courses);
    });

    it('devrait créer une course', () => {
        const newCourse = new Course({ chauffeurId: 12, latDepart: 50, lngDepart: 60, debut: new Date() });

        service.createCourse(newCourse).subscribe(c => {
            expect(c).toEqual(newCourse);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/courses');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(newCourse);
        req.flush(newCourse);
    });

    it('devrait mettre à jour une course', () => {
        const updatedCourse = new Course({ id: 1, chauffeurId: 12, latDepart: 50, lngDepart: 60, debut: new Date() });

        service.updateCourse(1, updatedCourse).subscribe(c => {
            expect(c).toEqual(updatedCourse);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/courses/1');
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(updatedCourse);
        req.flush(updatedCourse);
    });

    it('devrait supprimer une course', () => {
        service.deleteCourse(1).subscribe(response => {
            expect(response).toBeUndefined();
        });

        const req = httpMock.expectOne('http://localhost:8080/api/courses/1');
        expect(req.request.method).toBe('DELETE');
        req.flush(null);
    });
});
