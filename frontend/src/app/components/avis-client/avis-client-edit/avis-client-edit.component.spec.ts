import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';

import { AvisClientEditComponent } from './avis-client-edit.component';
import { AvisClientService } from '../../../services/avis-client.service';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course.model';

// Mock services
class MockAvisClientService {
    getById(id: number) {
        return of({ courseId: 1, note: 4, commentaire: 'Test edit' });
    }
    update(id: number, data: any) {
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

// Mock ActivatedRoute
class MockActivatedRoute {
    snapshot = { paramMap: { get: (key: string) => '1' } };
}

describe('AvisClientEditComponent', () => {
    let component: AvisClientEditComponent;
    let fixture: ComponentFixture<AvisClientEditComponent>;
    let router: Router;
    let avisService: AvisClientService;
    let courseService: CourseService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AvisClientEditComponent],
            imports: [ReactiveFormsModule, FormsModule],
            providers: [
                { provide: AvisClientService, useClass: MockAvisClientService },
                { provide: CourseService, useClass: MockCourseService },
                { provide: Router, useClass: MockRouter },
                { provide: ActivatedRoute, useClass: MockActivatedRoute }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AvisClientEditComponent);
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

    // ✅ Chargement des courses et de l’avis à éditer
    it('should load courses and avis data on init', () => {
        expect(component.courses.length).toBe(2);
        expect(component.form.value).toEqual({ courseId: 1, note: 4, commentaire: 'Test edit' });
        expect(component.loading).toBeFalse();
    });

    // ✅ Validation du formulaire invalide
    it('should not submit if form is invalid', () => {
        spyOn(avisService, 'update');
        component.form.patchValue({ note: 6, courseId: '' }); // invalide
        component.onSubmit();
        expect(avisService.update).not.toHaveBeenCalled();
    });

    // ✅ Soumission formulaire valide
    it('should submit form if valid', () => {
        spyOn(avisService, 'update').and.callThrough();
        spyOn(router, 'navigate');

        component.form.patchValue({ courseId: 1, note: 5, commentaire: 'Edited' });
        component.onSubmit();

        expect(avisService.update).toHaveBeenCalledWith(1, {
            courseId: 1,
            note: 5,
            commentaire: 'Edited'
        });
        expect(router.navigate).toHaveBeenCalledWith(['/avis']);
    });

    // ✅ Gestion erreur soumission
    it('should handle error on submit', () => {
        spyOn(avisService, 'update').and.returnValue(throwError(() => ({ error: { message: 'Erreur API' } })));
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
