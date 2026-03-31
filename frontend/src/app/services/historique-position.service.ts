import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistoriquePosition } from '../models/historique-position.model';

@Injectable({ providedIn: 'root' })
export class HistoriquePositionService {
    private apiUrl = 'http://localhost:8080/api/historique-positions';

    constructor(private http: HttpClient) {}

    getAll(): Observable<HistoriquePosition[]> {
        return this.http.get<HistoriquePosition[]>(this.apiUrl);
    }

    getById(id: number): Observable<HistoriquePosition> {
        return this.http.get<HistoriquePosition>(`${this.apiUrl}/${id}`);
    }

    getByChauffeur(chauffeurId: number): Observable<HistoriquePosition[]> {
        return this.http.get<HistoriquePosition[]>(`${this.apiUrl}/chauffeur/${chauffeurId}`);
    }

    create(position: HistoriquePosition): Observable<HistoriquePosition> {
        return this.http.post<HistoriquePosition>(this.apiUrl, position);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
