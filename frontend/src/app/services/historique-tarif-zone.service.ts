import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistoriqueTarifZone } from '../models/historique-tarif-zone.model';

@Injectable({ providedIn: 'root' })
export class HistoriqueTarifZoneService {
    private apiUrl = 'http://localhost:8080/api/historique-tarifs';

    constructor(private http: HttpClient) {}

    getAll(): Observable<HistoriqueTarifZone[]> {
        return this.http.get<HistoriqueTarifZone[]>(this.apiUrl);
    }

    getById(id: number): Observable<HistoriqueTarifZone> {
        return this.http.get<HistoriqueTarifZone>(`${this.apiUrl}/${id}`);
    }

    getByZone(zoneId: number): Observable<HistoriqueTarifZone[]> {
        return this.http.get<HistoriqueTarifZone[]>(`${this.apiUrl}/zone/${zoneId}`);
    }

    create(historique: HistoriqueTarifZone): Observable<HistoriqueTarifZone> {
        return this.http.post<HistoriqueTarifZone>(this.apiUrl, historique);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    update(id: number, historique: HistoriqueTarifZone): Observable<HistoriqueTarifZone> {
        return this.http.put<HistoriqueTarifZone>(`${this.apiUrl}/${id}`, historique);
    }
}
