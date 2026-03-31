import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserEditComponent } from './user-edit.component';
import { UserService, User } from '../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('UserEditComponent', () => {
    let component: UserEditComponent;
    let fixture: ComponentFixture<UserEditComponent>;
    let userServiceSpy: jasmine.SpyObj<UserService>;
    let routerSpy: jasmine.SpyObj<Router>;
    let routeSpy: any;

    const mockUser: User = {
        id: 1,
        username: 'john',
        email: 'john@example.com',
        fullName: 'John Doe',
        phone: '123456789'
    };

    beforeEach(async () => {
        const userSpy = jasmine.createSpyObj('UserService', ['getUserById', 'updateUser']);
        const rSpy = jasmine.createSpyObj('Router', ['navigate']);
        routeSpy = { snapshot: { paramMap: { get: () => '1' } } };

        await TestBed.configureTestingModule({
            declarations: [ UserEditComponent ],
            providers: [
                { provide: UserService, useValue: userSpy },
                { provide: Router, useValue: rSpy },
                { provide: ActivatedRoute, useValue: routeSpy }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(UserEditComponent);
        component = fixture.componentInstance;
        userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
        routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should load user on init', () => {
        userServiceSpy.getUserById.and.returnValue(of(mockUser));

        component.ngOnInit();

        expect(userServiceSpy.getUserById).toHaveBeenCalledWith(1);
        expect(component.user).toEqual(mockUser);
        expect(component.loading).toBeFalse();
    });

    it('should set errorMessage if loading user fails', () => {
        userServiceSpy.getUserById.and.returnValue(throwError(() => ({ error: 'fail' })));

        component.ngOnInit();

        expect(component.errorMessage).toBe("Erreur lors du chargement de l'utilisateur");
        expect(component.loading).toBeFalse();
    });

    it('should update user and navigate on successful submit', () => {
        component.user = mockUser;
        userServiceSpy.updateUser.and.returnValue(of(mockUser));

        component.onSubmit();

        expect(component.loading).toBeFalse();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/users']);
        expect(component.errorMessage).toBe('');
    });

    it('should set errorMessage if update fails', () => {
        component.user = mockUser;
        const errorResponse = { error: 'Erreur serveur' };
        userServiceSpy.updateUser.and.returnValue(throwError(() => errorResponse));

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
