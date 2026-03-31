import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CourseListComponent } from './course-list.component';
import { CourseService } from '../../../services/course.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('CourseListComponent', () => {
    let component: CourseListComponent;
    let fixture: ComponentFixture<CourseListComponent>;
    let mockCourseService: any;
    let mockRouter: any;

    beforeEach(async () => {
        mockCourseService = {
            getAllCourses: jasmine.createSpy('getAllCourses').and.returnValue(of([
                { id: 1, chauffeurNom: 'John', chauffeurPrenom: 'Doe', statut: 'EN_COURSE' },
                { id: 2, chauffeurNom: 'Jane', chauffeurPrenom: 'Doe', statut: 'TERMINEE' }
            ])),
            deleteCourse: jasmine.createSpy('deleteCourse').and.returnValue(of({}))
        };

        mockRouter = {
            navigate: jasmine.createSpy('navigate')
        };

        await TestBed.configureTestingModule({
            declarations: [CourseListComponent],
            providers: [
                { provide: CourseService, useValue: mockCourseService },
                { provide: Router, useValue: mockRouter }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should load courses on init', () => {
        expect(mockCourseService.getAllCourses).toHaveBeenCalled();
        expect(component.courses.length).toBe(2);
        expect(component.loading).toBeFalse();
    });

    it('onSearch should filter courses by chauffeurNom, chauffeurPrenom, or statut', () => {
        component.searchTerm = 'john';
        component.onSearch();
        expect(component.courses.length).toBe(1);
        expect(component.courses[0].chauffeurNom).toBe('John');

        component.searchTerm = 'TERMINEE';
        component.onSearch();
        expect(component.courses.length).toBe(1);
        expect(component.courses[0].statut).toBe('TERMINEE');
    });

    it('onSearch with empty term should reload courses', () => {
        component.searchTerm = '';
        component.onSearch();
        expect(mockCourseService.getAllCourses).toHaveBeenCalledTimes(2); // init + search
    });

    it('onAdd should navigate to /courses/add', () => {
        component.onAdd();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/courses/add']);
    });

    it('onEdit should navigate to /courses/edit/:id', () => {
        component.onEdit(5);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/courses/edit', 5]);
    });

    it('onDelete should call deleteCourse and remove course from list', fakeAsync(() => {
        spyOn(window, 'confirm').and.returnValue(true); // simule la confirmation
        component.onDelete(1);
        tick();
        expect(mockCourseService.deleteCourse).toHaveBeenCalledWith(1);
        expect(component.courses.find(c => c.id === 1)).toBeUndefined();
    }));

    it('onDelete should not delete if confirm is canceled', () => {
        spyOn(window, 'confirm').and.returnValue(false);
        component.onDelete(1);
        expect(mockCourseService.deleteCourse).not.toHaveBeenCalled();
    });

    it('getStatutClass should return correct class', () => {
        expect(component.getStatutClass('EN_COURSE')).toBe('badge-warning');
        expect(component.getStatutClass('TERMINEE')).toBe('badge-success');
        expect(component.getStatutClass('ANNULEE')).toBe('badge-danger');
        expect(component.getStatutClass('AUTRE')).toBe('badge-secondary');
    });

    it('formatDate should return formatted string or empty', () => {
        const date = new Date('2026-03-29T12:00:00');
        const formatted = component.formatDate(date);
        expect(formatted).toContain('29/03/2026');
        expect(component.formatDate()).toBe('');
    });

    it('should handle error when loadCourses fails', fakeAsync(() => {
        mockCourseService.getAllCourses.and.returnValue(throwError({}));
        component.loadCourses();
        tick();
        expect(component.error).toBe('Erreur lors du chargement des courses');
        expect(component.loading).toBeFalse();
    }));
});
