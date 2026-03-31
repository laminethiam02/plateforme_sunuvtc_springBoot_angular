import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoriquePositionEditComponent } from './historique-position-edit.component';
import { Router } from '@angular/router';

describe('HistoriquePositionEditComponent', () => {
    let component: HistoriquePositionEditComponent;
    let fixture: ComponentFixture<HistoriquePositionEditComponent>;
    let mockRouter: any;

    beforeEach(async () => {
        mockRouter = { navigate: jasmine.createSpy('navigate') };

        await TestBed.configureTestingModule({
            declarations: [HistoriquePositionEditComponent],
            providers: [
                { provide: Router, useValue: mockRouter }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HistoriquePositionEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should navigate back to historique-positions on goBack', () => {
        component.goBack();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/historique-positions']);
    });
});
