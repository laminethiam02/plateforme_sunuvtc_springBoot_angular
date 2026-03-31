import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ZoneAddComponent } from './zone-add.component';
import { ZoneService } from '../../../services/zone.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('ZoneAddComponent', () => {
    let component: ZoneAddComponent;
    let fixture: ComponentFixture<ZoneAddComponent>;
    let zoneServiceSpy: jasmine.SpyObj<ZoneService>;
    let routerSpy: jasmine.SpyObj<Router>;

    beforeEach(async () => {
        const zSpy = jasmine.createSpyObj('ZoneService', ['createZone']);
        const rSpy = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule],
            declarations: [ZoneAddComponent],
            providers: [
                { provide: ZoneService, useValue: zSpy },
                { provide: Router, useValue: rSpy }
            ]
        }).compileComponents();

        zoneServiceSpy = TestBed.inject(ZoneService) as jasmine.SpyObj<ZoneService>;
        routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

        fixture = TestBed.createComponent(ZoneAddComponent);
        component = fixture.componentInstance;
    });

    it('devrait créer le composant', () => {
        expect(component).toBeTruthy();
    });

    it('devrait invalider le formulaire si les champs requis sont vides', () => {
        const form = component.form;
        form.controls['nom'].setValue('');
        form.controls['tarif'].setValue(null);
        form.controls['geom'].setValue('');
        expect(form.valid).toBeFalse();
    });

    it('devrait valider le formulaire avec des données correctes', () => {
        const form = component.form;
        form.controls['nom'].setValue('Zone 1');
        form.controls['couleur'].setValue('#FF0000');
        form.controls['tarif'].setValue(500);
        form.controls['geom'].setValue('POLYGON((0 0,1 0,1 1,0 1,0 0))');
        expect(form.valid).toBeTrue();
    });

    it('devrait appeler createZone et naviguer après onSubmit réussi', fakeAsync(() => {
        const form = component.form;
        form.controls['nom'].setValue('Zone 1');
        form.controls['couleur'].setValue('#FF0000');
        form.controls['tarif'].setValue(500);
        form.controls['geom'].setValue('POLYGON((0 0,1 0,1 1,0 1,0 0))');

        // Simuler la zone complète retournée
        const createdZone = {
            id: 1,
            nom: 'Zone 1',
            couleur: '#FF0000',
            tarif: 500,
            actif: true,
            geom: 'POLYGON((0 0,1 0,1 1,0 1,0 0))'
        };

        zoneServiceSpy.createZone.and.returnValue(of(createdZone));

        component.onSubmit();
        tick();

        expect(zoneServiceSpy.createZone).toHaveBeenCalledWith(form.value);
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/zones']);
    }));

    it('devrait gérer l\'erreur lors de la création d\'une zone', fakeAsync(() => {
        const form = component.form;
        form.controls['nom'].setValue('Zone 1');
        form.controls['couleur'].setValue('#FF0000');
        form.controls['tarif'].setValue(500);
        form.controls['geom'].setValue('POLYGON((0 0,1 0,1 1,0 1,0 0))');

        const errorResponse = { error: { message: 'Erreur serveur' } };
        zoneServiceSpy.createZone.and.returnValue(throwError(() => errorResponse));

        component.onSubmit();
        tick();

        expect(component.error).toBe('Erreur serveur');
        expect(component.loading).toBeFalse();
    }));

    it('devrait naviguer sur onCancel', () => {
        component.onCancel();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/zones']);
    });
});
