import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alerte } from '../models/alerte.model';

@Injectable({ providedIn: 'root' })
export class AlerteService {
    private apiUrl = 'http://localhost:8080/api/alertes';

    constructor(private http: HttpClient) {}

    getAll(): Observable<Alerte[]> {
        return this.http.get<Alerte[]>(this.apiUrl);
    }

    getById(id: number): Observable<Alerte> {
        return this.http.get<Alerte>(`${this.apiUrl}/${id}`);
    }

    getByChauffeur(chauffeurId: number): Observable<Alerte[]> {
        return this.http.get<Alerte[]>(`${this.apiUrl}/chauffeur/${chauffeurId}`);
    }

    getNonLues(chauffeurId: number): Observable<Alerte[]> {
        return this.http.get<Alerte[]>(`${this.apiUrl}/chauffeur/${chauffeurId}/non-lues`);
    }

    create(alerte: Alerte): Observable<Alerte> {
        return this.http.post<Alerte>(this.apiUrl, alerte);
    }

    update(id: number, alerte: Alerte): Observable<Alerte> {
        return this.http.put<Alerte>(`${this.apiUrl}/${id}`, alerte);
    }

    marquerLue(id: number): Observable<void> {
        return this.http.patch<void>(`${this.apiUrl}/${id}/lue`, {});
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
