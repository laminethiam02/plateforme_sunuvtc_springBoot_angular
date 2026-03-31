import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicule } from '../models/vehicule.model';

@Injectable({ providedIn: 'root' })
export class VehiculeService {
    private apiUrl = 'http://localhost:8080/api/vehicules';

    constructor(private http: HttpClient) {}

    getAll(): Observable<Vehicule[]> {
        return this.http.get<Vehicule[]>(this.apiUrl);
    }

    getById(id: number): Observable<Vehicule> {
        return this.http.get<Vehicule>(`${this.apiUrl}/${id}`);
    }

    create(vehicule: Vehicule): Observable<Vehicule> {
        return this.http.post<Vehicule>(this.apiUrl, vehicule);
    }

    update(id: number, vehicule: Vehicule): Observable<Vehicule> {
        return this.http.put<Vehicule>(`${this.apiUrl}/${id}`, vehicule);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    assignChauffeur(vehiculeId: number, chauffeurId: number): Observable<Vehicule> {
        return this.http.patch<Vehicule>(`${this.apiUrl}/${vehiculeId}/assign/${chauffeurId}`, {});
    }
}
