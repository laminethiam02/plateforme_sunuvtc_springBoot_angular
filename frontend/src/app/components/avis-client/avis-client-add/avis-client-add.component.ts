import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AvisClientService } from '../../../services/avis-client.service';
import {Course} from "../../../models/course.model";
import {CourseService} from "../../../services/course.service";


@Component({
    selector: 'app-avis-client-add',
    templateUrl: './avis-client-add.component.html',
    styleUrls: ['./avis-client-add.component.css']
})
export class AvisClientAddComponent implements OnInit {
    form: FormGroup;
    courses: Course[] = [];
    loading = false;
    error = '';

    constructor(
        private fb: FormBuilder,
        private service: AvisClientService,
        private courseService: CourseService,
        private router: Router
    ) {
        this.form = this.fb.group({
            courseId: ['', Validators.required],
            note: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
            commentaire: ['']
        });
    }

    ngOnInit(): void {
        this.courseService.getAllCourses().subscribe(data => this.courses = data);
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.loading = true;
            this.service.create(this.form.value).subscribe({
                next: () => this.router.navigate(['/avis']),
                error: (err) => {
                    this.error = err.error?.message || 'Erreur création';
                    this.loading = false;
                }
            });
        }
    }

    onCancel(): void { this.router.navigate(['/avis']); }
}
