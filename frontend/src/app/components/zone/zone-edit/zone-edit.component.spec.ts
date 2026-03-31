import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ZoneEditComponent } from './zone-edit.component';
import { ZoneService } from '../../../services/zone.service';
import { Zone } from '../../../models/zone.model';

describe('ZoneEditComponent', () => {
    let component: ZoneEditComponent;
    let fixture: ComponentFixture<ZoneEditComponent>;
    let zoneServiceSpy: jasmine.SpyObj<ZoneService>;
    let routerSpy: jasmine.SpyObj<Router>;
    let activatedRouteStub: any;

    beforeEach(async () => {
        const zSpy = jasmine.createSpyObj('ZoneService', ['getZoneById', 'updateZone']);
        const rSpy = jasmine.createSpyObj('Router', ['navigate']);
        activatedRouteStub = { snapshot: { paramMap: { get: () => '1' } } }; // id = 1

        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule],
            declarations: [ZoneEditComponent],
            providers: [
                { provide: ZoneService, useValue: zSpy },
                { provide: Router, useValue: rSpy },
                { provide: ActivatedRoute, useValue: activatedRouteStub }
            ]
        }).compileComponents();

        zoneServiceSpy = TestBed.inject(ZoneService) as jasmine.SpyObj<ZoneService>;
        routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

        fixture = TestBed.createComponent(ZoneEditComponent);
        component = fixture.componentInstance;
    });

    it('devrait créer le composant', () => {
        expect(component).toBeTruthy();
    });

    it('devrait charger la zone dans ngOnInit', fakeAsync(() => {
        const zoneMock: Zone = {
            id: 1,
            nom: 'Zone 1',
            couleur: '#FF0000',
            tarif: 100,
            actif: true,
            geom: 'POLYGON((0 0,1 0,1 1,0 1,0 0))'
        };
        zoneServiceSpy.getZoneById.and.returnValue(of(zoneMock));

        component.ngOnInit();
        tick();

        expect(component.form.value.nom).toBe('Zone 1');
        expect(component.form.value.couleur).toBe('#FF0000');
        expect(component.form.value.tarif).toBe(100);
        expect(component.form.value.actif).toBeTrue();
        expect(component.form.value.geom).toBe('POLYGON((0 0,1 0,1 1,0 1,0 0))');
        expect(component.loading).toBeFalse();
    }));

    it('devrait gérer l\'erreur si getZoneById échoue', fakeAsync(() => {
        zoneServiceSpy.getZoneById.and.returnValue(throwError(() => ({})));

        component.ngOnInit();
        tick();

        expect(component.error).toBe('Erreur lors du chargement de la zone');
        expect(component.loading).toBeFalse();
    }));

    it('devrait invalider le formulaire si les champs requis sont vides', () => {
        component.form.controls['nom'].setValue('');
        component.form.controls['tarif'].setValue('');
        component.form.controls['geom'].setValue('');
        component.form.controls['couleur'].setValue('');

        expect(component.form.valid).toBeFalse();
    });

    it('devrait valider le formulaire avec des valeurs correctes', () => {
        component.form.controls['nom'].setValue('Zone 1');
        component.form.controls['tarif'].setValue(100);
        component.form.controls['geom'].setValue('POLYGON((0 0,1 0,1 1,0 1,0 0))');
        component.form.controls['couleur'].setValue('#00FF00');

        expect(component.form.valid).toBeTrue();
    });

    it('devrait appeler updateZone et naviguer après onSubmit réussi', fakeAsync(() => {
        component.form.controls['nom'].setValue('Zone 1');
        component.form.controls['tarif'].setValue(100);
        component.form.controls['geom'].setValue('POLYGON((0 0,1 0,1 1,0 1,0 0))');
        component.form.controls['couleur'].setValue('#00FF00');

        // Simuler une zone complète retournée par updateZone
        const updatedZone: Zone = {
            id: 1,
            nom: 'Zone 1',
            couleur: '#00FF00',
            tarif: 100,
            actif: true,
            geom: 'POLYGON((0 0,1 0,1 1,0 1,0 0))'
        };
        zoneServiceSpy.updateZone.and.returnValue(of(updatedZone));

        component.onSubmit();
        tick();

        expect(zoneServiceSpy.updateZone).toHaveBeenCalledWith(1, component.form.value);
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/zones']);
    }));

    it('devrait gérer l\'erreur dans onSubmit', fakeAsync(() => {
        component.form.controls['nom'].setValue('Zone 1');
        component.form.controls['tarif'].setValue(100);
        component.form.controls['geom'].setValue('POLYGON((0 0,1 0,1 1,0 1,0 0))');
        component.form.controls['couleur'].setValue('#00FF00');

        const errorResponse = { error: { message: 'Erreur serveur' } };
        zoneServiceSpy.updateZone.and.returnValue(throwError(() => errorResponse));

        component.onSubmit();
        tick();

        expect(component.error).toBe('Erreur lors de la modification');
        expect(component.loading).toBeFalse();
    }));

    it('devrait naviguer sur onCancel', () => {
        component.onCancel();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/zones']);
    });
});
