import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard-component/dashboard.component';
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
import {AvisClientEditComponent} from "./components/avis-client/avis-client-edit/avis-client-edit.component";
import {AuditLogListComponent} from "./components/audit-log/audit-log-list/audit-log-list.component";
import {AuditLogAddComponent} from "./components/audit-log/audit-log-add/audit-log-add.component";
import {AuditLogEditComponent} from "./components/audit-log/audit-log-edit/audit-log-edit.component";
import {LoginComponent} from "./components/login-component/login.component";
import {RegisterComponent} from "./components/register-component/register.component";
import {UserListComponent} from "./components/user/user-list/user-list.component";
import {UserAddComponent} from "./components/user/user-add/user-add.component";
import {UserEditComponent} from "./components/user/user-edit/user-edit.component";
import {AuthGuard} from "./components/auth-guard/auth.gard";

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    { path: 'users', component: UserListComponent },
    { path: 'users/add', component: UserAddComponent },
    { path: 'users/edit/:id', component: UserEditComponent },

    // Chauffeurs
    { path: 'chauffeurs', component: ChauffeurListComponent },
    { path: 'chauffeurs/add', component: ChauffeurAddComponent },
    { path: 'chauffeurs/edit/:id', component: ChauffeurEditComponent },

    { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard]  },

    // Zones
    { path: 'zones', component: ZoneListComponent },
    { path: 'zones/add', component: ZoneAddComponent },
    { path: 'zones/edit/:id', component: ZoneEditComponent },

    // Courses
    { path: 'courses', component: CourseListComponent },
    { path: 'courses/add', component: CourseAddComponent },
    { path: 'courses/edit/:id', component: CourseEditComponent },



    // New
    { path: 'vehicules', component: VehiculeListComponent },
    { path: 'vehicules/add', component: VehiculeAddComponent },
    { path: 'vehicules/edit/:id', component: VehiculeEditComponent },
    { path: 'historique-positions', component: HistoriquePositionListComponent },
    { path: 'historique-positions/add', component: HistoriquePositionAddComponent },
    { path: 'historique-positions/edit/:id', component: HistoriquePositionEditComponent },
    { path: 'alertes', component: AlerteListComponent },
    { path: 'alertes/add', component: AlerteAddComponent },
    { path: 'alertes/edit/:id', component: AlerteEditComponent },
    { path: 'historique-tarifs', component: HistoriqueTarifZoneListComponent },
    { path: 'historique-tarifs/add', component: HistoriqueTarifZoneAddComponent },
    { path: 'historique-tarifs/edit/:id', component: HistoriqueTarifZoneEditComponent },
    { path: 'avis', component: AvisClientListComponent },
    { path: 'avis/add', component: AvisClientAddComponent },
    { path: 'avis/edit/:id', component: AvisClientEditComponent },
    { path: 'audit-logs', component: AuditLogListComponent },
    { path: 'audit-logs/add', component: AuditLogAddComponent },
    { path: 'audit-logs/edit/:id', component: AuditLogEditComponent },

    // Default route
    { path: '**', redirectTo: '/login' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
