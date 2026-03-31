import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ZoneListComponent } from './zone-list.component';
import { ZoneService } from '../../../services/zone.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Zone } from '../../../models/zone.model';

describe('ZoneListComponent', () => {
    let component: ZoneListComponent;
    let fixture: ComponentFixture<ZoneListComponent>;
    let zoneServiceSpy: jasmine.SpyObj<ZoneService>;
    let routerSpy: jasmine.SpyObj<Router>;

    beforeEach(async () => {
        const zSpy = jasmine.createSpyObj('ZoneService', ['getAllZones', 'deleteZone']);
        const rSpy = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
            declarations: [ZoneListComponent],
            providers: [
                { provide: ZoneService, useValue: zSpy },
                { provide: Router, useValue: rSpy }
            ]
        }).compileComponents();

        zoneServiceSpy = TestBed.inject(ZoneService) as jasmine.SpyObj<ZoneService>;
        routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

        fixture = TestBed.createComponent(ZoneListComponent);
        component = fixture.componentInstance;
    });

    it('devrait créer le composant', () => {
        expect(component).toBeTruthy();
    });

    it('devrait charger les zones avec loadZones', fakeAsync(() => {
        const zonesMock: Zone[] = [
            { id: 1, nom: 'Zone 1', couleur: '#FF0000', tarif: 100, actif: true, geom: 'POLYGON((0 0,1 0,1 1,0 1,0 0))' },
            { id: 2, nom: 'Zone 2', couleur: '#00FF00', tarif: 50, actif: false, geom: 'POLYGON((0 0,1 0,1 1,0 1,0 0))' }
        ];
        zoneServiceSpy.getAllZones.and.returnValue(of(zonesMock));

        component.loadZones();
        tick();

        expect(component.zones).toEqual(zonesMock);
        expect(component.loading).toBeFalse();
    }));

    it('devrait gérer l\'erreur lors du chargement des zones', fakeAsync(() => {
        zoneServiceSpy.getAllZones.and.returnValue(throwError(() => ({})));

        component.loadZones();
        tick();

        expect(component.error).toBe('Erreur lors du chargement des zones');
        expect(component.loading).toBeFalse();
    }));

    it('devrait filtrer les zones avec onSearch', () => {
        component.zones = [
            { id: 1, nom: 'Zone 1', couleur: '#FF0000', tarif: 100, actif: true, geom: 'POLYGON((0 0,1 0,1 1,0 1,0 0))' },
            { id: 2, nom: 'Zone 2', couleur: '#00FF00', tarif: 50, actif: false, geom: 'POLYGON((0 0,1 0,1 1,0 1,0 0))' }
        ];

        component.searchTerm = 'zone 1';
        component.onSearch();
        expect(component.zones.length).toBe(1);
        expect(component.zones[0].nom).toBe('Zone 1');

        component.searchTerm = '';
        zoneServiceSpy.getAllZones.and.returnValue(of(component.zones));
        component.onSearch();
        expect(zoneServiceSpy.getAllZones).toHaveBeenCalled();
    });

    it('devrait naviguer sur onAdd', () => {
        component.onAdd();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/zones/add']);
    });

    it('devrait naviguer sur onEdit', () => {
        component.onEdit(5);
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/zones/edit', 5]);
    });

    it('devrait supprimer une zone avec onDelete', fakeAsync(() => {
        spyOn(window, 'confirm').and.returnValue(true);
        component.zones = [
            { id: 1, nom: 'Zone 1', couleur: '#FF0000', tarif: 100, actif: true, geom: 'POLYGON((0 0,1 0,1 1,0 1,0 0))' },
            { id: 2, nom: 'Zone 2', couleur: '#00FF00', tarif: 50, actif: false, geom: 'POLYGON((0 0,1 0,1 1,0 1,0 0))' }
        ];

        // On utilise deletedZone comme valeur de retour de deleteZone
        const deletedZone: Zone = { ...component.zones[0] };
        zoneServiceSpy.deleteZone.and.returnValue(of());

        component.onDelete(1);
        tick();

        expect(component.zones.length).toBe(1);
        expect(component.zones[0].id).toBe(2);
    }));

    it('devrait gérer l\'erreur lors de la suppression', fakeAsync(() => {
        spyOn(window, 'confirm').and.returnValue(true);
        component.zones = [{ id: 1, nom: 'Zone 1', couleur: '#FF0000', tarif: 100, actif: true, geom: 'POLYGON((0 0,1 0,1 1,0 1,0 0))' }];
        zoneServiceSpy.deleteZone.and.returnValue(throwError(() => ({})));

        component.onDelete(1);
        tick();

        expect(component.error).toBe('Erreur lors de la suppression');
    }));

    it('devrait retourner la classe correcte pour getActifClass', () => {
        expect(component.getActifClass(true)).toBe('badge-success');
        expect(component.getActifClass(false)).toBe('badge-secondary');
    });

    it('devrait retourner le texte correct pour getActifText', () => {
        expect(component.getActifText(true)).toBe('Actif');
        expect(component.getActifText(false)).toBe('Inactif');
    });
});
