import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { VehiculeAddComponent } from './vehicule-add.component';
import { VehiculeService } from '../../../services/vehicule.service';
import { ChauffeurService } from '../../../services/chauffeur.service';
import { Chauffeur } from '../../../models/chauffeur.model';
import { Vehicule } from '../../../models/vehicule.model';

describe('VehiculeAddComponent', () => {
    let component: VehiculeAddComponent;
    let fixture: ComponentFixture<VehiculeAddComponent>;
    let vehiculeServiceSpy: jasmine.SpyObj<VehiculeService>;
    let chauffeurServiceSpy: jasmine.SpyObj<ChauffeurService>;
    let routerSpy: jasmine.SpyObj<Router>;

    beforeEach(async () => {
        const vehiculeSpy = jasmine.createSpyObj('VehiculeService', ['create']);
        const chauffeurSpy = jasmine.createSpyObj('ChauffeurService', ['getAllChauffeurs']);
        const routerMock = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule],
            declarations: [VehiculeAddComponent],
            providers: [
                { provide: VehiculeService, useValue: vehiculeSpy },
                { provide: ChauffeurService, useValue: chauffeurSpy },
                { provide: Router, useValue: routerMock }
            ]
        }).compileComponents();

        vehiculeServiceSpy = TestBed.inject(VehiculeService) as jasmine.SpyObj<VehiculeService>;
        chauffeurServiceSpy = TestBed.inject(ChauffeurService) as jasmine.SpyObj<ChauffeurService>;
        routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

        fixture = TestBed.createComponent(VehiculeAddComponent);
        component = fixture.componentInstance;

        // Mock des chauffeurs
        chauffeurServiceSpy.getAllChauffeurs.and.returnValue(of([
            new Chauffeur({ id: 1, email: 'a@ex.com', password: '123', nom: 'Nom', prenom: 'Prenom', statutVehicule: 'LIBRE' })
        ]));

        fixture.detectChanges();
    });

    it('devrait créer le composant', () => {
        expect(component).toBeTruthy();
    });

    it('devrait charger les chauffeurs au ngOnInit', () => {
        expect(component.chauffeurs.length).toBe(1);
        expect(component.chauffeurs[0].nom).toBe('Nom');
    });

    it('formulaire invalide si immatriculation vide', () => {
        component.form.controls['immatriculation'].setValue('');
        expect(component.form.valid).toBeFalse();
    });

    it('devrait appeler create et naviguer si formulaire valide', fakeAsync(() => {
        // Valeurs du formulaire cohérentes avec la classe Vehicule
        component.form.setValue({
            immatriculation: 'ABC123',
            marque: 'Toyota',
            modele: 'Corolla',
            couleur: 'Rouge',
            annee: 2020,
            capacite: 4,
            chauffeurId: 1,
            actif: true
        });

        vehiculeServiceSpy.create.and.returnValue(of(new Vehicule({ immatriculation: 'ABC123' })));

        component.onSubmit();
        tick();

        expect(vehiculeServiceSpy.create).toHaveBeenCalled();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/vehicules']);
    }));

    it('devrait gérer l\'erreur si create échoue', fakeAsync(() => {
        component.form.setValue({
            immatriculation: 'ABC123',
            marque: 'Toyota',
            modele: 'Corolla',
            couleur: 'Rouge',
            annee: 2020,
            capacite: 4,
            chauffeurId: 1,
            actif: true
        });

        const errorResponse = { error: { message: 'Erreur serveur' } };
        vehiculeServiceSpy.create.and.returnValue(throwError(() => errorResponse));

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
