import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CourseEditComponent } from './course-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CourseService } from '../../../services/course.service';
import { ChauffeurService } from '../../../services/chauffeur.service';

describe('CourseEditComponent', () => {
    let component: CourseEditComponent;
    let fixture: ComponentFixture<CourseEditComponent>;
    let mockCourseService: any;
    let mockChauffeurService: any;
    let mockRouter: any;
    let mockActivatedRoute: any;

    beforeEach(async () => {
        mockCourseService = {
            getCourseById: jasmine.createSpy('getCourseById').and.returnValue(of({
                chauffeurId: 1,
                debut: '2026-03-29T10:00:00Z',
                fin: '',
                latDepart: 12.34,
                lngDepart: 56.78,
                latArrivee: '',
                lngArrivee: '',
                distanceKm: null,
                montant: null,
                statut: 'EN_COURSE',
                zonesTraversees: ''
            })),
            updateCourse: jasmine.createSpy('updateCourse').and.returnValue(of({}))
        };

        mockChauffeurService = {
            getAllChauffeurs: jasmine.createSpy('getAllChauffeurs').and.returnValue(of([
                { id: 1, nom: 'John Doe' },
                { id: 2, nom: 'Jane Doe' }
            ]))
        };

        mockRouter = {
            navigate: jasmine.createSpy('navigate')
        };

        mockActivatedRoute = {
            snapshot: {
                paramMap: {
                    get: jasmine.createSpy('get').and.returnValue('1')
                }
            }
        };

        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [CourseEditComponent],
            providers: [
                FormBuilder,
                { provide: CourseService, useValue: mockCourseService },
                { provide: ChauffeurService, useValue: mockChauffeurService },
                { provide: Router, useValue: mockRouter },
                { provide: ActivatedRoute, useValue: mockActivatedRoute }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should load course data and chauffeurs on init', () => {
        expect(mockCourseService.getCourseById).toHaveBeenCalledWith(1);
        expect(mockChauffeurService.getAllChauffeurs).toHaveBeenCalled();
        expect(component.form.value.chauffeurId).toBe(1);
        expect(component.chauffeurs.length).toBe(2);
        expect(component.loading).toBeFalse();
    });

    it('form should be invalid when required fields are empty', () => {
        component.form.patchValue({
            chauffeurId: '',
            debut: '',
            latDepart: '',
            lngDepart: '',
            statut: ''
        });
        expect(component.form.valid).toBeFalse();
    });

    it('onSubmit should call updateCourse and navigate on success', fakeAsync(() => {
        component.form.patchValue({
            chauffeurId: 1,
            debut: '2026-03-29T10:00',
            latDepart: 12.34,
            lngDepart: 56.78,
            statut: 'EN_COURSE'
        });

        component.onSubmit();
        tick();

        expect(mockCourseService.updateCourse).toHaveBeenCalledWith(1, jasmine.any(Object));
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/courses']);
    }));

    it('onSubmit should handle errors', fakeAsync(() => {
        mockCourseService.updateCourse.and.returnValue(
            throwError({ error: { message: 'Erreur test' } })
        );

        component.form.patchValue({
            chauffeurId: 1,
            debut: '2026-03-29T10:00',
            latDepart: 12.34,
            lngDepart: 56.78,
            statut: 'EN_COURSE'
        });

        component.onSubmit();
        tick();

        expect(component.error).toBe('Erreur test');
        expect(component.loading).toBeFalse();
    }));

    it('onCancel should navigate to /courses', () => {
        component.onCancel();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/courses']);
    });
});
