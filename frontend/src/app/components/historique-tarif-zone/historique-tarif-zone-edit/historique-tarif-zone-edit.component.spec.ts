import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HistoriqueTarifZoneEditComponent } from './historique-tarif-zone-edit.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HistoriqueTarifZoneService } from '../../../services/historique-tarif-zone.service';
import { ZoneService } from '../../../services/zone.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('HistoriqueTarifZoneEditComponent', () => {
    let component: HistoriqueTarifZoneEditComponent;
    let fixture: ComponentFixture<HistoriqueTarifZoneEditComponent>;
    let mockService: any;
    let mockZoneService: any;
    let mockRouter: any;
    let mockActivatedRoute: any;

    beforeEach(async () => {
        mockService = {
            getById: jasmine.createSpy('getById').and.returnValue(of({
                zoneId: 1,
                ancienTarif: 100,
                nouveauTarif: 120,
                modifiePar: 'Test'
            })),
            update: jasmine.createSpy('update').and.returnValue(of({}))
        };

        mockZoneService = {
            getAllZones: jasmine.createSpy('getAllZones').and.returnValue(of([
                { id: 1, nom: 'Zone 1' },
                { id: 2, nom: 'Zone 2' }
            ]))
        };

        mockRouter = { navigate: jasmine.createSpy('navigate') };
        mockActivatedRoute = {
            snapshot: { paramMap: { get: () => '1' } }
        };

        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [HistoriqueTarifZoneEditComponent],
            providers: [
                FormBuilder,
                { provide: HistoriqueTarifZoneService, useValue: mockService },
                { provide: ZoneService, useValue: mockZoneService },
                { provide: Router, useValue: mockRouter },
                { provide: ActivatedRoute, useValue: mockActivatedRoute }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HistoriqueTarifZoneEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load zones and tarif on init', () => {
        component.ngOnInit();
        expect(mockZoneService.getAllZones).toHaveBeenCalled();
        expect(mockService.getById).toHaveBeenCalledWith(1);
        expect(component.zones.length).toBe(2);
        expect(component.form.value.ancienTarif).toBe(100);
    });

    it('should navigate to historique-tarifs on cancel', () => {
        component.onCancel();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/historique-tarifs']);
    });

    it('should submit form successfully', fakeAsync(() => {
        component.form.setValue({
            zoneId: 1,
            ancienTarif: 100,
            nouveauTarif: 120,
            modifiePar: 'Test'
        });
        component.onSubmit();
        tick();
        expect(mockService.update).toHaveBeenCalledWith(1, component.form.value);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/historique-tarifs']);
    }));

    it('should not submit form if invalid', () => {
        component.form.setValue({
            zoneId: '',
            ancienTarif: -10,
            nouveauTarif: -20,
            modifiePar: null
        });
        component.onSubmit();
        expect(mockService.update).not.toHaveBeenCalled();
    });

    it('should handle error on form submission', fakeAsync(() => {
        component.form.setValue({
            zoneId: 1,
            ancienTarif: 100,
            nouveauTarif: 120,
            modifiePar: 'Test'
        });
        mockService.update.and.returnValue(throwError(() => ({ error: { message: 'Erreur test' } })));
        component.onSubmit();
        tick();
        expect(component.error).toBe('Erreur test');
        expect(component.loading).toBeFalse();
    }));
});
