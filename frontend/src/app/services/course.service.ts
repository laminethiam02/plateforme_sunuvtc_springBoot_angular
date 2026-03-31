import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({ providedIn: 'root' })
export class CourseService {
    private apiUrl = 'http://localhost:8080/api/courses';

    constructor(private http: HttpClient) {}

    getAllCourses(): Observable<Course[]> {
        return this.http.get<Course[]>(this.apiUrl);
    }

    getCourseById(id: number): Observable<Course> {
        return this.http.get<Course>(`${this.apiUrl}/${id}`);
    }

    getCoursesByChauffeur(chauffeurId: number): Observable<Course[]> {
        return this.http.get<Course[]>(`${this.apiUrl}/by-chauffeur/${chauffeurId}`);
    }

    getCoursesByStatut(statut: string): Observable<Course[]> {
        return this.http.get<Course[]>(`${this.apiUrl}/by-statut/${statut}`);
    }

    getCoursesByDateRange(start: Date, end: Date): Observable<Course[]> {
        const params = { start: start.toISOString(), end: end.toISOString() };
        return this.http.get<Course[]>(`${this.apiUrl}/by-date-range`, { params });
    }

    createCourse(course: Course): Observable<Course> {
        return this.http.post<Course>(this.apiUrl, course);
    }

    updateCourse(id: number, course: Course): Observable<Course> {
        return this.http.put<Course>(`${this.apiUrl}/${id}`, course);
    }

    deleteCourse(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }


}
