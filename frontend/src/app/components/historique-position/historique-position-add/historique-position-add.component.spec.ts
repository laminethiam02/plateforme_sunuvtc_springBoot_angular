import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HistoriquePositionAddComponent } from './historique-position-add.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChauffeurService } from '../../../services/chauffeur.service';
import { HistoriquePositionService } from '../../../services/historique-position.service';
import { of, throwError } from 'rxjs';

describe('HistoriquePositionAddComponent', () => {
    let component: HistoriquePositionAddComponent;
    let fixture: ComponentFixture<HistoriquePositionAddComponent>;

    let mockChauffeurService: any;
    let mockHistoriqueService: any;
    let mockRouter: any;

    beforeEach(async () => {
        mockChauffeurService = { getAllChauffeurs: jasmine.createSpy('getAllChauffeurs').and.returnValue(of([
                { id: 1, nom: 'John', statutVehicule: 'LIBRE' },
                { id: 2, nom: 'Jane', statutVehicule: 'EN_COURSE' }
            ]))};

        mockHistoriqueService = { create: jasmine.createSpy('create').and.returnValue(of({})) };
        mockRouter = { navigate: jasmine.createSpy('navigate') };

        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [HistoriquePositionAddComponent],
            providers: [
                FormBuilder,
                { provide: ChauffeurService, useValue: mockChauffeurService },
                { provide: HistoriquePositionService, useValue: mockHistoriqueService },
                { provide: Router, useValue: mockRouter }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HistoriquePositionAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should load chauffeurs on init', fakeAsync(() => {
        component.ngOnInit();
        tick();
        expect(component.chauffeurs.length).toBe(2);
        expect(mockChauffeurService.getAllChauffeurs).toHaveBeenCalled();
    }));

    it('should submit valid form and navigate on success', fakeAsync(() => {
        component.form.setValue({
            chauffeurId: 1,
            latitude: 10,
            longitude: 20,
            statutVehicule: 'LIBRE',
            vitesseKmh: 50,
            timestampPosition: new Date()
        });

        component.onSubmit();
        tick();

        expect(mockHistoriqueService.create).toHaveBeenCalled();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/historique-positions']);
        expect(component.loading).toBeTrue(); // loading est true pendant l'appel
    }));

    it('should set error on failed submit', fakeAsync(() => {
        mockHistoriqueService.create.and.returnValue(throwError({ error: { message: 'Erreur test' } }));
        component.form.setValue({
            chauffeurId: 1,
            latitude: 10,
            longitude: 20,
            statutVehicule: 'LIBRE',
            vitesseKmh: 50,
            timestampPosition: new Date()
        });

        component.onSubmit();
        tick();

        expect(component.error).toBe('Erreur test');
        expect(component.loading).toBeFalse();
    }));

    it('should not submit if form is invalid', () => {
        component.form.setValue({
            chauffeurId: '', // invalide
            latitude: 100,   // invalide latitude
            longitude: 200,  // invalide longitude
            statutVehicule: '',
            vitesseKmh: -5,
            timestampPosition: null
        });

        component.onSubmit();
        expect(mockHistoriqueService.create).not.toHaveBeenCalled();
        expect(component.loading).toBeFalse();
    });

    it('should navigate on cancel', () => {
        component.onCancel();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/historique-positions']);
    });
});
