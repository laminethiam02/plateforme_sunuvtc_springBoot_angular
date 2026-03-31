import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chauffeur } from '../models/chauffeur.model';

@Injectable({ providedIn: 'root' })
export class ChauffeurService {
    private apiUrl = 'http://localhost:8080/api/chauffeurs';

    constructor(private http: HttpClient) {}

    getAllChauffeurs(): Observable<Chauffeur[]> {
        return this.http.get<Chauffeur[]>(this.apiUrl);
    }

    getChauffeurById(id: number): Observable<Chauffeur> {
        return this.http.get<Chauffeur>(`${this.apiUrl}/${id}`);
    }

    getChauffeursByZone(zoneId: number): Observable<Chauffeur[]> {
        return this.http.get<Chauffeur[]>(`${this.apiUrl}/by-zone/${zoneId}`);
    }

    getChauffeursByStatut(statut: string): Observable<Chauffeur[]> {
        return this.http.get<Chauffeur[]>(`${this.apiUrl}/by-statut/${statut}`);
    }

    createChauffeur(chauffeur: Chauffeur): Observable<Chauffeur> {
        return this.http.post<Chauffeur>(this.apiUrl, chauffeur);
    }

    updateChauffeur(id: number, chauffeur: Chauffeur): Observable<Chauffeur> {
        return this.http.put<Chauffeur>(`${this.apiUrl}/${id}`, chauffeur);
    }

    deleteChauffeur(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }


}
