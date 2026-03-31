import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { AvisClientAddComponent } from './avis-client-add.component';
import { AvisClientService } from '../../../services/avis-client.service';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course.model';

// Mock services
class MockAvisClientService {
    create(data: any) {
        return of(data);
    }
}

class MockCourseService {
    getAllCourses() {
        return of([
            { id: 1, depart: 'A', destination: 'B' },
            { id: 2, depart: 'C', destination: 'D' }
        ] as Course[]);
    }
}

// Mock Router
class MockRouter {
    navigate(commands: any[]) {}
}

describe('AvisClientAddComponent', () => {
    let component: AvisClientAddComponent;
    let fixture: ComponentFixture<AvisClientAddComponent>;
    let router: Router;
    let avisService: AvisClientService;
    let courseService: CourseService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AvisClientAddComponent],
            imports: [ReactiveFormsModule, FormsModule],
            providers: [
                { provide: AvisClientService, useClass: MockAvisClientService },
                { provide: CourseService, useClass: MockCourseService },
                { provide: Router, useClass: MockRouter }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AvisClientAddComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        avisService = TestBed.inject(AvisClientService);
        courseService = TestBed.inject(CourseService);

        fixture.detectChanges(); // ngOnInit()
    });

    // ✅ Création du composant
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // ✅ Chargement des courses
    it('should load courses on init', () => {
        expect(component.courses.length).toBe(2);
    });

    // ✅ Validation du formulaire invalide
    it('should not submit if form is invalid', () => {
        spyOn(avisService, 'create');
        component.form.patchValue({ note: 6, courseId: '' }); // invalide
        component.onSubmit();
        expect(avisService.create).not.toHaveBeenCalled();
    });

    // ✅ Soumission formulaire valide
    it('should submit form if valid', () => {
        spyOn(avisService, 'create').and.callThrough();
        spyOn(router, 'navigate');

        component.form.patchValue({ courseId: 1, note: 5, commentaire: 'Test' });
        component.onSubmit();

        expect(avisService.create).toHaveBeenCalledWith({
            courseId: 1,
            note: 5,
            commentaire: 'Test'
        });
        expect(router.navigate).toHaveBeenCalledWith(['/avis']);
    });

    // ✅ Gestion erreur soumission
    it('should handle error on submit', () => {
        spyOn(avisService, 'create').and.returnValue(throwError(() => ({ error: { message: 'Erreur API' } })));
        component.form.patchValue({ courseId: 1, note: 4 });

        component.onSubmit();

        expect(component.error).toBe('Erreur API');
        expect(component.loading).toBeFalse();
    });

    // ✅ Annulation
    it('should navigate back on cancel', () => {
        spyOn(router, 'navigate');
        component.onCancel();
        expect(router.navigate).toHaveBeenCalledWith(['/avis']);
    });
});
