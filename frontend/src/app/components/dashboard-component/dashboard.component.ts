import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import Chart from 'chart.js/auto';

// Services
import { ChauffeurService } from '../../services/chauffeur.service';
import { ZoneService } from '../../services/zone.service';
import { CourseService } from '../../services/course.service';
import { VehiculeService } from '../../services/vehicule.service';
import { HistoriquePositionService } from '../../services/historique-position.service';
import { AlerteService } from '../../services/alerte.service';
import { HistoriqueTarifZoneService } from '../../services/historique-tarif-zone.service';
import { AvisClientService } from '../../services/avis-client.service';
import { AuditLogService } from '../../services/audit-log.service';

// Modèles simplifiés (à adapter selon vos vraies interfaces)
interface Chauffeur {
    id: number;
    nom: string;
    statutVehicule: 'LIBRE' | 'EN_COURSE' | 'HORS_SERVICE';
}

interface Zone {
    id: number;
    nom: string;
}

interface Course {
    id: number;
    statut: 'EN_COURSE' | 'TERMINEE' | 'ANNULEE';
    dateCreation: Date | string;
    chauffeurId?: number;
    clientId?: number;
}

interface Vehicule {
    id: number;
    immatriculation: string;
    actif: boolean;
}

interface Alerte {
    id: number;
    message: string;
    estLue: boolean;
    dateCreation: Date | string;
}

interface AvisClient {
    id: number;
    note: number; // 1 à 5
    commentaire?: string;
}

interface ExportData {
    chauffeurs: Chauffeur[];
    zones: Zone[];
    courses: Course[];
    vehicules: Vehicule[];
    alertes: Alerte[];
    avis: AvisClient[];
    auditLogs: any[];
}

interface DashboardStats {
    chauffeurs: number;
    zones: number;
    courses: number;
    coursesEnCours: number;
    coursesTerminees: number;
    coursesAnnulees: number;
    chauffeursLibres: number;
    chauffeursEnCourse: number;
    chauffeursHorsService: number;
    vehicules: number;
    vehiculesActifs: number;
    alertes: number;
    alertesNonLues: number;
    avis: number;
    noteMoyenne: number;
    auditLogs: number;
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('pieChart') pieChartRef!: ElementRef;
    @ViewChild('barChart') barChartRef!: ElementRef;
    @ViewChild('lineChart') lineChartRef!: ElementRef;
    @ViewChild('doughnutChart') doughnutChartRef!: ElementRef;

    stats: DashboardStats = {
        chauffeurs: 0,
        zones: 0,
        courses: 0,
        coursesEnCours: 0,
        coursesTerminees: 0,
        coursesAnnulees: 0,
        chauffeursLibres: 0,
        chauffeursEnCourse: 0,
        chauffeursHorsService: 0,
        vehicules: 0,
        vehiculesActifs: 0,
        alertes: 0,
        alertesNonLues: 0,
        avis: 0,
        noteMoyenne: 0,
        auditLogs: 0
    };

    exportData: ExportData = {
        chauffeurs: [],
        zones: [],
        courses: [],
        vehicules: [],
        alertes: [],
        avis: [],
        auditLogs: []
    };

    recentCourses: Course[] = [];
    recentAlertes: Alerte[] = [];

    private pieChart!: Chart;
    private barChart!: Chart;
    private lineChart!: Chart;
    private doughnutChart!: Chart;

    loading = true;
    exportLoading = false;
    error = '';
    private subscriptions = new Subscription();

    // Données pour les graphiques
    chartData = {
        pie: {
            labels: ['Libres', 'En course', 'Hors service'],
            datasets: [{
                data: [0, 0, 0],
                backgroundColor: ['#2ecc71', '#f39c12', '#95a5a6'],
                hoverBackgroundColor: ['#27ae60', '#e67e22', '#7f8c8d']
            }]
        },
        bar: {
            labels: ['Chauffeurs', 'Zones', 'Véhicules', 'Courses'],
            datasets: [{
                label: 'Nombre',
                data: [0, 0, 0, 0],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        line: {
            labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
            datasets: [{
                label: 'Courses créées',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: true,
                tension: 0.4
            }]
        },
        doughnut: {
            labels: ['Alertes lues', 'Alertes non lues'],
            datasets: [{
                data: [0, 0],
                backgroundColor: ['#4BC0C0', '#FF6384'],
                hoverBackgroundColor: ['#4BC0C0', '#FF6384']
            }]
        }
    };

    constructor(
        private chauffeurService: ChauffeurService,
        private zoneService: ZoneService,
        private courseService: CourseService,
        private vehiculeService: VehiculeService,
        private positionService: HistoriquePositionService,
        private alerteService: AlerteService,
        private historiqueTarifService: HistoriqueTarifZoneService,
        private avisService: AvisClientService,
        private auditLogService: AuditLogService
    ) {}

    ngOnInit(): void {
        this.loadStats();
    }

    ngAfterViewInit(): void {}

    loadStats(): void {
        this.loading = true;
        this.error = '';

        const requests = {
            chauffeurs: this.chauffeurService.getAllChauffeurs().pipe(catchError(() => of([]))),
            zones: this.zoneService.getAllZones().pipe(catchError(() => of([]))),
            courses: this.courseService.getAllCourses().pipe(catchError(() => of([]))),
            vehicules: this.vehiculeService.getAll().pipe(catchError(() => of([]))),
            alertes: this.alerteService.getAll().pipe(catchError(() => of([]))),
            avis: this.avisService.getAll().pipe(catchError(() => of([]))),
            auditLogs: this.auditLogService.getAll().pipe(catchError(() => of([])))
        };

        const subscription = forkJoin(requests)
            .pipe(finalize(() => this.loading = false))
            .subscribe({
                next: (results: any) => {
                    // Stockage pour export
                    this.exportData = {
                        chauffeurs: results.chauffeurs,
                        zones: results.zones,
                        courses: results.courses,
                        vehicules: results.vehicules,
                        alertes: results.alertes,
                        avis: results.avis,
                        auditLogs: results.auditLogs
                    };

                    // Stats générales
                    this.stats.chauffeurs = results.chauffeurs.length;
                    this.stats.zones = results.zones.length;
                    this.stats.courses = results.courses.length;
                    this.stats.vehicules = results.vehicules.length;
                    this.stats.vehiculesActifs = results.vehicules.filter((v: Vehicule) => v.actif).length;
                    this.stats.alertes = results.alertes.length;
                    this.stats.alertesNonLues = results.alertes.filter((a: Alerte) => !a.estLue).length;
                    this.stats.avis = results.avis.length;
                    this.stats.auditLogs = results.auditLogs.length;

                    // Détails courses
                    this.stats.coursesEnCours = results.courses.filter((c: Course) => c.statut === 'EN_COURSE').length;
                    this.stats.coursesTerminees = results.courses.filter((c: Course) => c.statut === 'TERMINEE').length;
                    this.stats.coursesAnnulees = results.courses.filter((c: Course) => c.statut === 'ANNULEE').length;

                    // Détails chauffeurs
                    this.stats.chauffeursLibres = results.chauffeurs.filter((c: Chauffeur) => c.statutVehicule === 'LIBRE').length;
                    this.stats.chauffeursEnCourse = results.chauffeurs.filter((c: Chauffeur) => c.statutVehicule === 'EN_COURSE').length;
                    this.stats.chauffeursHorsService = results.chauffeurs.filter((c: Chauffeur) => c.statutVehicule === 'HORS_SERVICE').length;

                    // Note moyenne des avis
                    if (results.avis.length > 0) {
                        const totalNotes = results.avis.reduce((sum: number, a: AvisClient) => sum + a.note, 0);
                        this.stats.noteMoyenne = totalNotes / results.avis.length;
                    } else {
                        this.stats.noteMoyenne = 0;
                    }

                    // Données pour le tableau récent
                    this.recentCourses = results.courses.slice(0, 5);
                    this.recentAlertes = results.alertes.slice(0, 5);

                    // Mise à jour des graphiques
                    this.updateChartsData(results.courses);
                    this.initCharts();
                },
                error: (err) => {
                    console.error('Erreur chargement dashboard:', err);
                    this.error = 'Impossible de charger les données du tableau de bord.';
                }
            });

        this.subscriptions.add(subscription);
    }

    private updateChartsData(courses: Course[]): void {
        // Graphique circulaire : statut des chauffeurs
        this.chartData.pie.datasets[0].data = [
            this.stats.chauffeursLibres,
            this.stats.chauffeursEnCourse,
            this.stats.chauffeursHorsService
        ];

        // Graphique barres : entités principales
        this.chartData.bar.datasets[0].data = [
            this.stats.chauffeurs,
            this.stats.zones,
            this.stats.vehicules,
            this.stats.courses
        ];

        // Graphique linéaire : évolution mensuelle des courses
        const monthCounts = new Array(12).fill(0);
        courses.forEach(course => {
            const date = new Date(course.dateCreation);
            const month = date.getMonth(); // 0-11
            monthCounts[month]++;
        });
        this.chartData.line.datasets[0].data = monthCounts;

        // Graphique doughnut : alertes lues / non lues
        const lues = this.stats.alertes - this.stats.alertesNonLues;
        this.chartData.doughnut.datasets[0].data = [lues, this.stats.alertesNonLues];
    }

    private initCharts(): void {
        this.destroyCharts();

        if (this.pieChartRef) {
            this.pieChart = new Chart(this.pieChartRef.nativeElement, {
                type: 'pie',
                data: this.chartData.pie,
                options: {
                    responsive: true,
                    plugins: {
                        legend: { position: 'top' },
                        title: { display: true, text: 'État des chauffeurs' }
                    }
                }
            });
        }

        if (this.barChartRef) {
            this.barChart = new Chart(this.barChartRef.nativeElement, {
                type: 'bar',
                data: this.chartData.bar,
                options: {
                    responsive: true,
                    scales: { y: { beginAtZero: true } },
                    plugins: {
                        title: { display: true, text: 'Vue d\'ensemble des entités' }
                    }
                }
            });
        }

        if (this.lineChartRef) {
            this.lineChart = new Chart(this.lineChartRef.nativeElement, {
                type: 'line',
                data: this.chartData.line,
                options: {
                    responsive: true,
                    scales: { y: { beginAtZero: true } },
                    plugins: {
                        title: { display: true, text: 'Courses créées par mois' }
                    }
                }
            });
        }

        if (this.doughnutChartRef) {
            this.doughnutChart = new Chart(this.doughnutChartRef.nativeElement, {
                type: 'doughnut',
                data: this.chartData.doughnut,
                options: {
                    responsive: true,
                    plugins: {
                        legend: { position: 'top' },
                        title: { display: true, text: 'État des alertes' }
                    }
                }
            });
        }
    }

    private destroyCharts(): void {
        [this.pieChart, this.barChart, this.lineChart, this.doughnutChart].forEach(chart => {
            if (chart) chart.destroy();
        });
    }

    refreshCharts(): void {
        this.updateChartsData(this.exportData.courses);
        this.initCharts();
    }

    // ----- EXPORT CSV -----
    exportToCSV(): void {
        this.exportLoading = true;
        try {
            const summaryCSV = this.generateSummaryCSV();
            this.downloadCSV(summaryCSV, `resume_sunu_vtc_${new Date().getTime()}.csv`);
            setTimeout(() => this.exportDetailedData(), 500);
        } catch (error) {
            console.error('Export error:', error);
            this.error = 'Erreur lors de l\'exportation';
            this.exportLoading = false;
        }
    }

    private generateSummaryCSV(): string {
        const dateExport = new Date().toLocaleString('fr-FR');
        const data = [
            ['TABLEAU DE BORD SUNUVTC - RAPPORT'],
            ['Date export', dateExport],
            [],
            ['STATISTIQUES PRINCIPALES'],
            ['Chauffeurs', this.stats.chauffeurs],
            ['Zones', this.stats.zones],
            ['Véhicules', this.stats.vehicules],
            ['Véhicules actifs', this.stats.vehiculesActifs],
            ['Courses totales', this.stats.courses],
            ['Courses en cours', this.stats.coursesEnCours],
            ['Courses terminées', this.stats.coursesTerminees],
            ['Courses annulées', this.stats.coursesAnnulees],
            ['Alertes', this.stats.alertes],
            ['Alertes non lues', this.stats.alertesNonLues],
            ['Avis clients', this.stats.avis],
            ['Note moyenne', this.stats.noteMoyenne.toFixed(1)],
            ['Audit logs', this.stats.auditLogs],
            [],
            ['INDICATEURS DE PERFORMANCE'],
            ['Taux d\'occupation', ((this.stats.chauffeursEnCourse / (this.stats.chauffeurs || 1)) * 100).toFixed(1) + '%'],
            ['Taux de complétion', ((this.stats.coursesTerminees / (this.stats.courses || 1)) * 100).toFixed(1) + '%'],
            ['Note client moyenne', this.stats.noteMoyenne.toFixed(1) + '/5']
        ];
        return this.convertToCSV(data);
    }

    private exportDetailedData(): void {
        const exports = [
            { data: this.exportData.chauffeurs, name: 'chauffeurs' },
            { data: this.exportData.zones, name: 'zones' },
            { data: this.exportData.vehicules, name: 'vehicules' },
            { data: this.exportData.courses, name: 'courses' },
            { data: this.exportData.alertes, name: 'alertes' },
            { data: this.exportData.avis, name: 'avis' }
        ];

        exports.forEach((item, idx) => {
            setTimeout(() => {
                if (item.data.length) {
                    const csv = this.convertJSONToCSV(item.data);
                    this.downloadCSV(csv, `sunu_vtc_${item.name}_${new Date().getTime()}.csv`);
                }
                if (idx === exports.length - 1) this.exportLoading = false;
            }, idx * 400);
        });
    }

    private convertToCSV(rows: any[][]): string {
        return rows.map(row =>
            row.map(cell => {
                if (cell === null || cell === undefined) return '';
                const str = String(cell);
                if (str.includes(',') || str.includes('"') || str.includes('\n'))
                    return `"${str.replace(/"/g, '""')}"`;
                return str;
            }).join(',')
        ).join('\n');
    }

    private convertJSONToCSV(data: any[]): string {
        if (!data.length) return '';
        const headers = Object.keys(data[0]);
        const csvRows = data.map(row =>
            headers.map(header => {
                const val = row[header];
                if (val === null || val === undefined) return '';
                const str = String(val);
                if (str.includes(',') || str.includes('"') || str.includes('\n'))
                    return `"${str.replace(/"/g, '""')}"`;
                return str;
            }).join(',')
        );
        return [headers.join(','), ...csvRows].join('\n');
    }

    private downloadCSV(content: string, filename: string): void {
        const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    exportSummary(): void {
        this.exportLoading = true;
        try {
            const summary = this.generateSummaryCSV();
            this.downloadCSV(summary, `resume_sunu_vtc_${new Date().getTime()}.csv`);
        } catch (err) {
            this.error = 'Erreur export résumé';
        } finally {
            this.exportLoading = false;
        }
    }

    exportCommercialData(): void {
        if (!this.exportData.courses.length) {
            this.error = 'Aucune course à exporter';
            return;
        }
        this.exportLoading = true;
        try {
            const coursesForExport = this.exportData.courses.map(c => ({
                ID: c.id,
                Statut: c.statut,
                'Date création': new Date(c.dateCreation).toLocaleString('fr-FR')
            }));
            const csv = this.convertJSONToCSV(coursesForExport);
            this.downloadCSV(csv, `courses_sunu_vtc_${new Date().getTime()}.csv`);
        } catch (err) {
            this.error = 'Erreur export courses';
        } finally {
            this.exportLoading = false;
        }
    }

    refresh(): void {
        this.loadStats();
    }

    ngOnDestroy(): void {
        this.destroyCharts();
        this.subscriptions.unsubscribe();
    }

    // Getter pour affichage
    get noteMoyenneFormatted(): string {
        return this.stats.noteMoyenne.toFixed(1);
    }

    get occupationTaux(): string {
        return ((this.stats.chauffeursEnCourse / (this.stats.chauffeurs || 1)) * 100).toFixed(1);
    }

    get completionTaux(): string {
        return ((this.stats.coursesTerminees / (this.stats.courses || 1)) * 100).toFixed(1);
    }
}
