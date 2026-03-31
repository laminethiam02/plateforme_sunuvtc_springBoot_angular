import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { VehiculeListComponent } from './vehicule-list.component';
import { VehiculeService } from '../../../services/vehicule.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Vehicule } from '../../../models/vehicule.model';

describe('VehiculeListComponent', () => {
    let component: VehiculeListComponent;
    let fixture: ComponentFixture<VehiculeListComponent>;
    let vehiculeServiceSpy: jasmine.SpyObj<VehiculeService>;
    let routerSpy: jasmine.SpyObj<Router>;

    beforeEach(async () => {
        const vehiculeSpy = jasmine.createSpyObj('VehiculeService', ['getAll', 'delete']);
        const rSpy = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
            declarations: [VehiculeListComponent],
            providers: [
                { provide: VehiculeService, useValue: vehiculeSpy },
                { provide: Router, useValue: rSpy }
            ]
        }).compileComponents();

        vehiculeServiceSpy = TestBed.inject(VehiculeService) as jasmine.SpyObj<VehiculeService>;
        routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

        fixture = TestBed.createComponent(VehiculeListComponent);
        component = fixture.componentInstance;
    });

    it('devrait créer le composant', () => {
        expect(component).toBeTruthy();
    });

    it('devrait charger les véhicules dans ngOnInit', fakeAsync(() => {
        const vehiculesMock: Vehicule[] = [
            new Vehicule({ id: 1, immatriculation: '123ABC', marque: 'Toyota', modele: 'Corolla' }),
            new Vehicule({ id: 2, immatriculation: '456DEF', marque: 'Honda', modele: 'Civic' })
        ];

        vehiculeServiceSpy.getAll.and.returnValue(of(vehiculesMock));

        component.ngOnInit();
        tick();

        expect(component.vehicules).toEqual(vehiculesMock);
        expect(component.loading).toBeFalse();
    }));

    it('devrait gérer l\'erreur lors du chargement des véhicules', fakeAsync(() => {
        vehiculeServiceSpy.getAll.and.returnValue(throwError(() => ({})));

        component.ngOnInit();
        tick();

        expect(component.error).toBe('Erreur chargement');
        expect(component.loading).toBeFalse();
    }));

    it('devrait filtrer les véhicules avec onSearch', () => {
        component.vehicules = [
            new Vehicule({ id: 1, immatriculation: '123ABC', marque: 'Toyota', modele: 'Corolla' }),
            new Vehicule({ id: 2, immatriculation: '456DEF', marque: 'Honda', modele: 'Civic' }),
            new Vehicule({ id: 3, immatriculation: '789GHI', marque: 'Ford', modele: 'Focus' })
        ];

        component.searchTerm = 'Honda';
        component.onSearch();

        expect(component.vehicules.length).toBe(1);
        expect(component.vehicules[0].marque).toBe('Honda');

        component.searchTerm = '';
        vehiculeServiceSpy.getAll.and.returnValue(of(component.vehicules));
        component.onSearch();
        expect(vehiculeServiceSpy.getAll).toHaveBeenCalled();
    });

    it('devrait naviguer vers add et edit', () => {
        component.onAdd();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/vehicules/add']);

        component.onEdit(1);
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/vehicules/edit', 1]);
    });

    it('devrait supprimer un véhicule avec succès', fakeAsync(() => {
        spyOn(window, 'confirm').and.returnValue(true); // simulate confirm OK
        component.vehicules = [
            new Vehicule({ id: 1, immatriculation: '123ABC' }),
            new Vehicule({ id: 2, immatriculation: '456DEF' })
        ];

        vehiculeServiceSpy.delete.and.returnValue(of(void 0));

        component.onDelete(1);
        tick();

        expect(component.vehicules.length).toBe(1);
        expect(component.vehicules[0].id).toBe(2);
    }));

    it('devrait gérer l\'erreur lors de la suppression', fakeAsync(() => {
        spyOn(window, 'confirm').and.returnValue(true);
        component.vehicules = [new Vehicule({ id: 1, immatriculation: '123ABC' })];

        vehiculeServiceSpy.delete.and.returnValue(throwError(() => ({})));

        component.onDelete(1);
        tick();

        expect(component.error).toBe('Erreur suppression');
    }));
});
