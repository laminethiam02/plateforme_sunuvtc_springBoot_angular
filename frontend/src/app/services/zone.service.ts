import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Zone } from '../models/zone.model';

@Injectable({ providedIn: 'root' })
export class ZoneService {
    private apiUrl = 'http://localhost:8080/api/zones';

    constructor(private http: HttpClient) {}

    getAllZones(): Observable<Zone[]> {
        return this.http.get<Zone[]>(this.apiUrl);
    }

    getActiveZones(): Observable<Zone[]> {
        return this.http.get<Zone[]>(`${this.apiUrl}/active`);
    }

    getZoneById(id: number): Observable<Zone> {
        return this.http.get<Zone>(`${this.apiUrl}/${id}`);
    }

    createZone(zone: Zone): Observable<Zone> {
        return this.http.post<Zone>(this.apiUrl, zone);
    }

    updateZone(id: number, zone: Zone): Observable<Zone> {
        return this.http.put<Zone>(`${this.apiUrl}/${id}`, zone);
    }

    deleteZone(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }


}
