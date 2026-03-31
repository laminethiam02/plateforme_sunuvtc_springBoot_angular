import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CourseAddComponent } from './course-add.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CourseService } from '../../../services/course.service';
import { ChauffeurService } from '../../../services/chauffeur.service';
import { Chauffeur } from '../../../models/chauffeur.model';
import { By } from '@angular/platform-browser';

describe('CourseAddComponent', () => {
    let component: CourseAddComponent;
    let fixture: ComponentFixture<CourseAddComponent>;
    let mockCourseService: any;
    let mockChauffeurService: any;
    let mockRouter: any;

    beforeEach(async () => {
        mockCourseService = {
            createCourse: jasmine.createSpy('createCourse').and.returnValue(of({}))
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

        await TestBed.configureTestingModule({
            declarations: [CourseAddComponent],
            imports: [ReactiveFormsModule],
            providers: [
                FormBuilder,
                { provide: CourseService, useValue: mockCourseService },
                { provide: ChauffeurService, useValue: mockChauffeurService },
                { provide: Router, useValue: mockRouter }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should load chauffeurs on init', () => {
        expect(mockChauffeurService.getAllChauffeurs).toHaveBeenCalled();
        expect(component.chauffeurs.length).toBe(2);
    });

    it('form should be invalid when empty', () => {
        component.form.patchValue({
            chauffeurId: '',
            debut: '',
            latDepart: '',
            lngDepart: '',
            statut: ''
        });
        expect(component.form.valid).toBeFalse();
    });

    it('onSubmit should call createCourse and navigate on success', fakeAsync(() => {
        component.form.patchValue({
            chauffeurId: 1,
            debut: new Date().toISOString().slice(0, 16),
            latDepart: 12.34,
            lngDepart: 56.78,
            statut: 'EN_COURSE'
        });

        component.onSubmit();
        tick();

        expect(mockCourseService.createCourse).toHaveBeenCalled();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/courses']);
    }));

    it('onSubmit should handle errors', fakeAsync(() => {
        mockCourseService.createCourse.and.returnValue(
            throwError({ error: { message: 'Erreur test' } })
        );

        component.form.patchValue({
            chauffeurId: 1,
            debut: new Date().toISOString().slice(0, 16),
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
