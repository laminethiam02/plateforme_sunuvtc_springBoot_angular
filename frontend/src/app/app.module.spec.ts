import { TestBed } from '@angular/core/testing';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './components/interceptors/auth.interceptors';

describe('AppModule', () => {

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppModule]
        }).compileComponents();
    });

    it('should create the module', () => {
        const module = TestBed.inject(AppModule);
        expect(module).toBeTruthy();
    });

    it('should bootstrap AppComponent', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should provide AuthInterceptor', () => {
        const interceptors = TestBed.inject(HTTP_INTERCEPTORS);
        expect(interceptors).toBeTruthy();
    });

});
