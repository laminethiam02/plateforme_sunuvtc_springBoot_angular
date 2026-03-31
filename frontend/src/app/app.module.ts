import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Composants généraux
import { DashboardComponent } from './components/dashboard-component/dashboard.component';
import { SidebarComponent } from './components/sidebar-component/sidebar.component';

// Composants SunuVTC
import { ChauffeurListComponent } from './components/chauffeur/chauffeur-list/chauffeur-list.component';
import { ChauffeurAddComponent } from './components/chauffeur/chauffeur-add/chauffeur-add.component';
import { ChauffeurEditComponent } from './components/chauffeur/chauffeur-edit/chauffeur-edit.component';
import { ZoneListComponent } from './components/zone/zone-list/zone-list.component';
import { ZoneAddComponent } from './components/zone/zone-add/zone-add.component';
import { ZoneEditComponent } from './components/zone/zone-edit/zone-edit.component';
import { CourseListComponent } from './components/course/course-list/course-list.component';
import { CourseAddComponent } from './components/course/course-add/course-add.component';
import { CourseEditComponent } from './components/course/course-edit/course-edit.component';
import {VehiculeListComponent} from "./components/vehicule/vehicule-list/vehicule-list.component";
import {VehiculeAddComponent} from "./components/vehicule/vehicule-add/vehicule-add.component";
import {VehiculeEditComponent} from "./components/vehicule/vehicule-edit/vehicule-edit.component";
import {
    HistoriquePositionListComponent
} from "./components/historique-position/historique-position-list/historique-position-list.component";
import {
    HistoriquePositionAddComponent
} from "./components/historique-position/historique-position-add/historique-position-add.component";
import {
    HistoriquePositionEditComponent
} from "./components/historique-position/historique-position-edit/historique-position-edit.component";
import {AlerteListComponent} from "./components/alerte/alerte-list/alerte-list.component";
import {AlerteAddComponent} from "./components/alerte/alerte-add/alerte-add.component";
import {AlerteEditComponent} from "./components/alerte/alerte-edit/alerte-edit.component";
import {
    HistoriqueTarifZoneListComponent
} from "./components/historique-tarif-zone/historique-tarif-zone-list/historique-tarif-zone-list.component";
import {
    HistoriqueTarifZoneAddComponent
} from "./components/historique-tarif-zone/historique-tarif-zone-add/historique-tarif-zone-add.component";
import {
    HistoriqueTarifZoneEditComponent
} from "./components/historique-tarif-zone/historique-tarif-zone-edit/historique-tarif-zone-edit.component";
import {AvisClientListComponent} from "./components/avis-client/avis-client-list/avis-client-list.component";
import {AvisClientAddComponent} from "./components/avis-client/avis-client-add/avis-client-add.component";
import {AuditLogAddComponent} from "./components/audit-log/audit-log-add/audit-log-add.component";
import {AuditLogEditComponent} from "./components/audit-log/audit-log-edit/audit-log-edit.component";
import {AuditLogListComponent} from "./components/audit-log/audit-log-list/audit-log-list.component";
import {AvisClientEditComponent} from "./components/avis-client/avis-client-edit/avis-client-edit.component";
import {UserListComponent} from "./components/user/user-list/user-list.component";
import {UserAddComponent} from "./components/user/user-add/user-add.component";
import {UserEditComponent} from "./components/user/user-edit/user-edit.component";
import {LoginComponent} from "./components/login-component/login.component";
import {RegisterComponent} from "./components/register-component/register.component";
import {AuthInterceptor} from "./components/interceptors/auth.interceptors";

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        SidebarComponent,
        // Chauffeurs
        ChauffeurListComponent,
        ChauffeurAddComponent,
        ChauffeurEditComponent,
        // Zones
        ZoneListComponent,
        ZoneAddComponent,
        ZoneEditComponent,
        // Courses
        CourseListComponent,
        CourseAddComponent,
        CourseEditComponent,

        // New
        VehiculeListComponent,
        VehiculeAddComponent,
        VehiculeEditComponent,
        HistoriquePositionListComponent,
        HistoriquePositionAddComponent,
        HistoriquePositionEditComponent,
        AlerteListComponent,
        AlerteAddComponent,
        AlerteEditComponent,
        HistoriqueTarifZoneListComponent,
        HistoriqueTarifZoneAddComponent,
        HistoriqueTarifZoneEditComponent,
        AvisClientListComponent,
        AvisClientAddComponent,
        AvisClientEditComponent,
        AuditLogListComponent,
        AuditLogAddComponent,
        AuditLogEditComponent,


        UserListComponent,
        UserAddComponent,
        UserEditComponent,



        LoginComponent,
        RegisterComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
