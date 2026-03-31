import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AvisClientService } from '../../../services/avis-client.service';
import {Course} from "../../../models/course.model";
import {CourseService} from "../../../services/course.service";


@Component({
    selector: 'app-avis-client-edit',
    templateUrl: './avis-client-edit.component.html',
    styleUrls: ['./avis-client-edit.component.css']
})
export class AvisClientEditComponent implements OnInit {
    form: FormGroup;
    courses: Course[] = [];
    loading = false;
    error = '';
    id!: number;

    constructor(
        private fb: FormBuilder,
        private service: AvisClientService,
        private courseService: CourseService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.form = this.fb.group({
            courseId: ['', Validators.required],
            note: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
            commentaire: ['']
        });
    }

    ngOnInit(): void {
        this.id = +this.route.snapshot.paramMap.get('id')!;
        this.loading = true;
        this.courseService.getAllCourses().subscribe(data => this.courses = data);
        this.service.getById(this.id).subscribe({
            next: (data) => {
                this.form.patchValue(data);
                this.loading = false;
            },
            error: () => {
                this.error = 'Erreur chargement';
                this.loading = false;
            }
        });
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.loading = true;
            this.service.update(this.id, this.form.value).subscribe({
                next: () => this.router.navigate(['/avis']),
                error: (err) => {
                    this.error = err.error?.message || 'Erreur modification';
                    this.loading = false;
                }
            });
        }
    }

    onCancel(): void { this.router.navigate(['/avis']); }
}
