import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AvisClient } from '../models/avis-client.model';

@Injectable({ providedIn: 'root' })
export class AvisClientService {
    private apiUrl = 'http://localhost:8080/api/avis';

    constructor(private http: HttpClient) {}

    getAll(): Observable<AvisClient[]> {
        return this.http.get<AvisClient[]>(this.apiUrl);
    }

    getById(id: number): Observable<AvisClient> {
        return this.http.get<AvisClient>(`${this.apiUrl}/${id}`);
    }

    getByCourse(courseId: number): Observable<AvisClient> {
        return this.http.get<AvisClient>(`${this.apiUrl}/course/${courseId}`);
    }

    getByNote(note: number): Observable<AvisClient[]> {
        return this.http.get<AvisClient[]>(`${this.apiUrl}/note/${note}`);
    }

    create(avis: AvisClient): Observable<AvisClient> {
        return this.http.post<AvisClient>(this.apiUrl, avis);
    }

    update(id: number, avis: AvisClient): Observable<AvisClient> {
        return this.http.put<AvisClient>(`${this.apiUrl}/${id}`, avis);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
