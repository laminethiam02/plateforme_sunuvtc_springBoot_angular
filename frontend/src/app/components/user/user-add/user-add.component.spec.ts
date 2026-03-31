import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAddComponent } from './user-add.component';
import { UserService, User } from '../../../services/user.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('UserAddComponent', () => {
    let component: UserAddComponent;
    let fixture: ComponentFixture<UserAddComponent>;
    let userServiceSpy: jasmine.SpyObj<UserService>;
    let routerSpy: jasmine.SpyObj<Router>;

    beforeEach(async () => {
        const userSpy = jasmine.createSpyObj('UserService', ['createUser']);
        const rSpy = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
            declarations: [ UserAddComponent ],
            providers: [
                { provide: UserService, useValue: userSpy },
                { provide: Router, useValue: rSpy }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(UserAddComponent);
        component = fixture.componentInstance;
        userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
        routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should have default user values', () => {
        expect(component.user).toEqual({
            id: 0,
            username: '',
            email: '',
            fullName: '',
            phone: ''
        });
    });

    it('should navigate to /users on successful creation', () => {
        userServiceSpy.createUser.and.returnValue(of(component.user));

        component.onSubmit();

        expect(component.loading).toBeFalse();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/users']);
        expect(component.errorMessage).toBe('');
    });

    it('should set errorMessage on creation failure', () => {
        const errorResponse = { error: 'Erreur serveur' };
        userServiceSpy.createUser.and.returnValue(throwError(() => errorResponse));

        component.onSubmit();

        expect(component.loading).toBeFalse();
        expect(component.errorMessage).toBe('Erreur serveur');
        expect(routerSpy.navigate).not.toHaveBeenCalled();
    });

    it('should navigate to /users on cancel', () => {
        component.onCancel();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/users']);
    });
});
