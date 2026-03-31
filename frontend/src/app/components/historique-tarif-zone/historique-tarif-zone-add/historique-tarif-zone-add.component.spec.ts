import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HistoriqueTarifZoneAddComponent } from './historique-tarif-zone-add.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HistoriqueTarifZoneService } from '../../../services/historique-tarif-zone.service';
import { ZoneService } from '../../../services/zone.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('HistoriqueTarifZoneAddComponent', () => {
    let component: HistoriqueTarifZoneAddComponent;
    let fixture: ComponentFixture<HistoriqueTarifZoneAddComponent>;
    let mockService: any;
    let mockZoneService: any;
    let mockRouter: any;

    beforeEach(async () => {
        mockService = {
            create: jasmine.createSpy('create').and.returnValue(of({}))
        };

        mockZoneService = {
            getAllZones: jasmine.createSpy('getAllZones').and.returnValue(of([
                { id: 1, nom: 'Zone 1' },
                { id: 2, nom: 'Zone 2' }
            ]))
        };

        mockRouter = { navigate: jasmine.createSpy('navigate') };

        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [HistoriqueTarifZoneAddComponent],
            providers: [
                FormBuilder,
                { provide: HistoriqueTarifZoneService, useValue: mockService },
                { provide: ZoneService, useValue: mockZoneService },
                { provide: Router, useValue: mockRouter }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HistoriqueTarifZoneAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load zones on init', () => {
        component.ngOnInit();
        expect(mockZoneService.getAllZones).toHaveBeenCalled();
        expect(component.zones.length).toBe(2);
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
        expect(mockService.create).toHaveBeenCalledWith(component.form.value);
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
        expect(mockService.create).not.toHaveBeenCalled();
    });

    it('should handle error on form submission', fakeAsync(() => {
        component.form.setValue({
            zoneId: 1,
            ancienTarif: 100,
            nouveauTarif: 120,
            modifiePar: 'Test'
        });
        mockService.create.and.returnValue(throwError(() => ({ error: { message: 'Erreur test' } })));
        component.onSubmit();
        tick();
        expect(component.error).toBe('Erreur test');
        expect(component.loading).toBeFalse();
    }));
});
