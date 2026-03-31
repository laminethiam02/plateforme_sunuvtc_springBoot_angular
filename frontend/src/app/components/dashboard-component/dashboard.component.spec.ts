import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { ChauffeurService } from '../../services/chauffeur.service';
import { ZoneService } from '../../services/zone.service';
import { CourseService } from '../../services/course.service';
import { VehiculeService } from '../../services/vehicule.service';
import { HistoriquePositionService } from '../../services/historique-position.service';
import { AlerteService } from '../../services/alerte.service';
import { HistoriqueTarifZoneService } from '../../services/historique-tarif-zone.service';
import { AvisClientService } from '../../services/avis-client.service';
import { AuditLogService } from '../../services/audit-log.service';
import { of, throwError } from 'rxjs';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    let mockChauffeurService: any;
    let mockZoneService: any;
    let mockCourseService: any;
    let mockVehiculeService: any;
    let mockAlerteService: any;
    let mockAvisService: any;
    let mockAuditService: any;

    beforeEach(async () => {
        mockChauffeurService = { getAllChauffeurs: jasmine.createSpy('getAllChauffeurs').and.returnValue(of([
                { id: 1, nom: 'John', statutVehicule: 'LIBRE' },
                { id: 2, nom: 'Jane', statutVehicule: 'EN_COURSE' }
            ]))};

        mockZoneService = { getAllZones: jasmine.createSpy('getAllZones').and.returnValue(of([{id:1, nom:'Zone1'}])) };
        mockCourseService = { getAllCourses: jasmine.createSpy('getAllCourses').and.returnValue(of([
                { id: 1, statut: 'EN_COURSE', dateCreation: new Date() },
                { id: 2, statut: 'TERMINEE', dateCreation: new Date() }
            ]))};
        mockVehiculeService = { getAll: jasmine.createSpy('getAll').and.returnValue(of([{id:1, immatriculation:'123', actif:true}]))};
        mockAlerteService = { getAll: jasmine.createSpy('getAll').and.returnValue(of([{id:1,message:'test',estLue:false,dateCreation:new Date()}]))};
        mockAvisService = { getAll: jasmine.createSpy('getAll').and.returnValue(of([{id:1,note:4}]))};
        mockAuditService = { getAll: jasmine.createSpy('getAll').and.returnValue(of([{id:1, action:'login'}]))};

        await TestBed.configureTestingModule({
            declarations: [DashboardComponent],
            providers: [
                { provide: ChauffeurService, useValue: mockChauffeurService },
                { provide: ZoneService, useValue: mockZoneService },
                { provide: CourseService, useValue: mockCourseService },
                { provide: VehiculeService, useValue: mockVehiculeService },
                { provide: AlerteService, useValue: mockAlerteService },
                { provide: HistoriquePositionService, useValue: {} },
                { provide: HistoriqueTarifZoneService, useValue: {} },
                { provide: AvisClientService, useValue: mockAvisService },
                { provide: AuditLogService, useValue: mockAuditService }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the dashboard component', () => {
        expect(component).toBeTruthy();
    });

    it('should load stats on init', fakeAsync(() => {
        component.loadStats();
        tick();
        expect(component.stats.chauffeurs).toBe(2);
        expect(component.stats.courses).toBe(2);
        expect(component.stats.chauffeursLibres).toBe(1);
        expect(component.stats.chauffeursEnCourse).toBe(1);
        expect(component.stats.alertesNonLues).toBe(1);
        expect(component.stats.noteMoyenne).toBe(4);
        expect(component.loading).toBeFalse();
    }));

    it('should handle error when loadStats fails', fakeAsync(() => {
        mockChauffeurService.getAllChauffeurs.and.returnValue(throwError('error'));
        component.loadStats();
        tick();
        expect(component.error).toBe('');
        expect(component.loading).toBeFalse();
    }));

    it('should generate summary CSV correctly', () => {
        component.stats = {
            chauffeurs: 2, zones: 1, courses: 2, coursesEnCours:1, coursesTerminees:1, coursesAnnulees:0,
            chauffeursLibres:1, chauffeursEnCourse:1, chauffeursHorsService:0, vehicules:1, vehiculesActifs:1,
            alertes:1, alertesNonLues:1, avis:1, noteMoyenne:4, auditLogs:1
        };
        const csv = component['generateSummaryCSV']();
        expect(csv).toContain('Chauffeurs,2');
        expect(csv).toContain('Courses en cours,1');
        expect(csv).toContain('Note moyenne,4.0');
    });

    it('should convert JSON to CSV correctly', () => {
        const data = [{ id:1, nom:'Test', note:5 }];
        const csv = component['convertJSONToCSV'](data);
        expect(csv).toContain('id,nom,note');
        expect(csv).toContain('1,Test,5');
    });

    it('should calculate formatted note moyenne correctly', () => {
        component.stats.noteMoyenne = 3.456;
        expect(component.noteMoyenneFormatted).toBe('3.5');
    });

    it('should calculate occupationTaux correctly', () => {
        component.stats.chauffeurs = 2;
        component.stats.chauffeursEnCourse = 1;
        expect(component.occupationTaux).toBe('50.0');
    });

    it('should calculate completionTaux correctly', () => {
        component.stats.courses = 4;
        component.stats.coursesTerminees = 2;
        expect(component.completionTaux).toBe('50.0');
    });
});
