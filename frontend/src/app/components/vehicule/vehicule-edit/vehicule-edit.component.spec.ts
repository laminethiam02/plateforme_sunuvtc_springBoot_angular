import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { VehiculeEditComponent } from './vehicule-edit.component';
import { VehiculeService } from '../../../services/vehicule.service';
import { ChauffeurService } from '../../../services/chauffeur.service';
import { Chauffeur } from '../../../models/chauffeur.model';
import { Vehicule } from '../../../models/vehicule.model';

describe('VehiculeEditComponent', () => {
    let component: VehiculeEditComponent;
    let fixture: ComponentFixture<VehiculeEditComponent>;
    let vehiculeServiceSpy: jasmine.SpyObj<VehiculeService>;
    let chauffeurServiceSpy: jasmine.SpyObj<ChauffeurService>;
    let routerSpy: jasmine.SpyObj<Router>;
    let activatedRouteStub: any;

    beforeEach(async () => {
        const vehiculeSpy = jasmine.createSpyObj('VehiculeService', ['getById', 'update']);
        const chauffeurSpy = jasmine.createSpyObj('ChauffeurService', ['getAllChauffeurs']);
        const rSpy = jasmine.createSpyObj('Router', ['navigate']);

        activatedRouteStub = {
            snapshot: { paramMap: { get: () => '1' } } // Simule id = 1
        };

        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule],
            declarations: [VehiculeEditComponent],
            providers: [
                { provide: VehiculeService, useValue: vehiculeSpy },
                { provide: ChauffeurService, useValue: chauffeurSpy },
                { provide: Router, useValue: rSpy },
                { provide: ActivatedRoute, useValue: activatedRouteStub }
            ]
        }).compileComponents();

        vehiculeServiceSpy = TestBed.inject(VehiculeService) as jasmine.SpyObj<VehiculeService>;
        chauffeurServiceSpy = TestBed.inject(ChauffeurService) as jasmine.SpyObj<ChauffeurService>;
        routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

        fixture = TestBed.createComponent(VehiculeEditComponent);
        component = fixture.componentInstance;
    });

    it('devrait créer le composant', () => {
        expect(component).toBeTruthy();
    });

    it('devrait charger les chauffeurs et le véhicule dans ngOnInit', fakeAsync(() => {
        const chauffeursMock: Chauffeur[] = [
            { id: 1, nom: 'John', prenom: 'Doe' },
            { id: 2, nom: 'Jane', prenom: 'Smith' }
        ];

        const vehiculeMock = new Vehicule({
            id: 1,
            immatriculation: '123ABC',
            marque: 'Toyota',
            modele: 'Corolla',
            couleur: 'Rouge',
            annee: 2020,
            capacite: 4,
            chauffeurId: 1,
            actif: true
        });

        chauffeurServiceSpy.getAllChauffeurs.and.returnValue(of(chauffeursMock));
        vehiculeServiceSpy.getById.and.returnValue(of(vehiculeMock));

        component.ngOnInit();
        tick();

        expect(component.chauffeurs).toEqual(chauffeursMock);
        expect(component.form.value.immatriculation).toBe('123ABC');
        expect(component.form.value.capacite).toBe(4);
        expect(component.form.value.actif).toBeTrue();
        expect(component.loading).toBeFalse();
    }));

    it('devrait gérer l\'erreur si getById échoue', fakeAsync(() => {
        chauffeurServiceSpy.getAllChauffeurs.and.returnValue(of([]));
        vehiculeServiceSpy.getById.and.returnValue(throwError(() => ({})));

        component.ngOnInit();
        tick();

        expect(component.error).toBe('Erreur chargement');
        expect(component.loading).toBeFalse();
    }));

    it('devrait valider le formulaire correctement', () => {
        const form = component.form;
        form.controls['immatriculation'].setValue('');
        expect(form.valid).toBeFalse();

        form.controls['immatriculation'].setValue('123ABC');
        expect(form.valid).toBeTrue();
    });

    it('devrait appeler update et naviguer après onSubmit réussi', fakeAsync(() => {
        const vehiculeMock = new Vehicule({ immatriculation: '123ABC' });
        vehiculeServiceSpy.update.and.returnValue(of(vehiculeMock));

        component.form.setValue({
            immatriculation: '123ABC',
            marque: 'Toyota',
            modele: 'Corolla',
            couleur: 'Rouge',
            annee: 2020,
            capacite: 4,
            chauffeurId: 1,
            actif: true
        });

        component.onSubmit();
        tick();

        expect(vehiculeServiceSpy.update).toHaveBeenCalledWith(1, component.form.value);
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/vehicules']);
    }));

    it('devrait gérer l\'erreur dans onSubmit', fakeAsync(() => {
        const errorResponse = { error: { message: 'Erreur serveur' } };
        vehiculeServiceSpy.update.and.returnValue(throwError(() => errorResponse));

        component.form.setValue({
            immatriculation: '123ABC',
            marque: 'Toyota',
            modele: 'Corolla',
            couleur: 'Rouge',
            annee: 2020,
            capacite: 4,
            chauffeurId: 1,
            actif: true
        });

        component.onSubmit();
        tick();

        expect(component.error).toBe('Erreur serveur');
        expect(component.loading).toBeFalse();
    }));

    it('devrait naviguer sur onCancel', () => {
        component.onCancel();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/vehicules']);
    });
});
