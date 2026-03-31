import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoriqueTarifZoneListComponent } from './historique-tarif-zone-list.component';
import { HistoriqueTarifZoneService } from '../../../services/historique-tarif-zone.service';
import { HistoriqueTarifZone } from '../../../models/historique-tarif-zone.model';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('HistoriqueTarifZoneListComponent', () => {
    let component: HistoriqueTarifZoneListComponent;
    let fixture: ComponentFixture<HistoriqueTarifZoneListComponent>;
    let service: HistoriqueTarifZoneService;
    let router: Router;

    const dummyHistoriques: HistoriqueTarifZone[] = [
        { id: 1, zoneId: 101, ancienTarif: 100, nouveauTarif: 120, modifiePar: 1, dateModification: new Date() },
        { id: 2, zoneId: 102, ancienTarif: 200, nouveauTarif: 220, modifiePar: 2, dateModification: new Date() }
    ];

    beforeEach(async () => {
        const serviceMock = {
            getAll: jasmine.createSpy('getAll').and.returnValue(of(dummyHistoriques)),
            delete: jasmine.createSpy('delete').and.returnValue(of(void 0))
        };

        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [HistoriqueTarifZoneListComponent],
            providers: [
                { provide: HistoriqueTarifZoneService, useValue: serviceMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HistoriqueTarifZoneListComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(HistoriqueTarifZoneService);
        router = TestBed.inject(Router);
    });

    it('devrait créer le composant', () => {
        expect(component).toBeTruthy();
    });

    it('devrait charger les historiques à l\'initialisation', () => {
        component.ngOnInit();
        expect(service.getAll).toHaveBeenCalled();
        expect(component.historiques.length).toBe(2);
        expect(component.loading).toBeFalse();
        expect(component.error).toBe('');
    });

    it('devrait gérer une erreur lors du chargement', () => {
        service.getAll = jasmine.createSpy().and.returnValue(throwError(() => new Error('Erreur')));
        component.loadHistoriques();
        expect(component.loading).toBeFalse();
        expect(component.error).toBe('Erreur chargement');
    });

    it('devrait naviguer vers add', () => {
        spyOn(router, 'navigate');
        component.onAdd();
        expect(router.navigate).toHaveBeenCalledWith(['/historique-tarifs/add']);
    });

    it('devrait naviguer vers edit', () => {
        spyOn(router, 'navigate');
        component.onEdit(1);
        expect(router.navigate).toHaveBeenCalledWith(['/historique-tarifs/edit', 1]);
    });

    it('devrait supprimer un historique après confirmation', () => {
        spyOn(window, 'confirm').and.returnValue(true);
        component.historiques = [...dummyHistoriques];
        component.onDelete(1);
        expect(service.delete).toHaveBeenCalledWith(1);
        expect(component.historiques.length).toBe(1);
        expect(component.historiques[0].id).toBe(2);
    });

    it('ne devrait pas supprimer si annulé', () => {
        spyOn(window, 'confirm').and.returnValue(false);
        component.historiques = [...dummyHistoriques];
        component.onDelete(1);
        expect(service.delete).not.toHaveBeenCalled();
        expect(component.historiques.length).toBe(2);
    });

    it('devrait gérer une erreur lors de la suppression', () => {
        spyOn(window, 'confirm').and.returnValue(true);
        service.delete = jasmine.createSpy().and.returnValue(throwError(() => new Error('Erreur')));
        component.historiques = [...dummyHistoriques];
        component.onDelete(1);
        expect(component.error).toBe('Erreur suppression');
    });
});
