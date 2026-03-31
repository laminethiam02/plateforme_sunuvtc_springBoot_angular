import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService, User } from '../../../services/user.service';
import { of, throwError } from 'rxjs';

describe('UserListComponent', () => {
    let component: UserListComponent;
    let fixture: ComponentFixture<UserListComponent>;
    let userServiceSpy: jasmine.SpyObj<UserService>;

    const mockUsers: User[] = [
        { id: 1, username: 'john', email: 'john@example.com', fullName: 'John Doe', phone: '123' },
        { id: 2, username: 'jane', email: 'jane@example.com', fullName: 'Jane Doe', phone: '456' }
    ];

    beforeEach(async () => {
        const spy = jasmine.createSpyObj('UserService', ['getAllUsers', 'deleteUser']);

        await TestBed.configureTestingModule({
            declarations: [UserListComponent],
            providers: [
                { provide: UserService, useValue: spy }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(UserListComponent);
        component = fixture.componentInstance;
        userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should load users on init', () => {
        userServiceSpy.getAllUsers.and.returnValue(of(mockUsers));

        component.ngOnInit();

        expect(userServiceSpy.getAllUsers).toHaveBeenCalled();
        expect(component.users).toEqual(mockUsers);
        expect(component.filteredUsers).toEqual(mockUsers);
        expect(component.loading).toBeFalse();
    });

    it('should set errorMessage if loading users fails', () => {
        userServiceSpy.getAllUsers.and.returnValue(throwError(() => ({ error: 'fail' })));

        component.ngOnInit();

        expect(component.errorMessage).toBe('Erreur lors du chargement des utilisateurs');
        expect(component.loading).toBeFalse();
    });

    it('should delete a user successfully', () => {
        spyOn(window, 'confirm').and.returnValue(true);
        userServiceSpy.deleteUser.and.returnValue(of({}));

        component.users = [...mockUsers];
        component.filteredUsers = [...mockUsers];
        component.deleteUser(1);

        expect(userServiceSpy.deleteUser).toHaveBeenCalledWith(1);
        expect(component.users.length).toBe(1);
        expect(component.filteredUsers.length).toBe(1);
        expect(component.users[0].id).toBe(2);
    });

    it('should not delete user if confirmation is cancelled', () => {
        spyOn(window, 'confirm').and.returnValue(false);
        component.users = [...mockUsers];
        component.filteredUsers = [...mockUsers];

        component.deleteUser(1);

        expect(userServiceSpy.deleteUser).not.toHaveBeenCalled();
        expect(component.users.length).toBe(2);
        expect(component.filteredUsers.length).toBe(2);
    });

    it('should set errorMessage if delete fails', () => {
        spyOn(window, 'confirm').and.returnValue(true);
        userServiceSpy.deleteUser.and.returnValue(throwError(() => ({ error: 'fail' })));

        component.users = [...mockUsers];
        component.filteredUsers = [...mockUsers];
        component.deleteUser(1);

        expect(component.errorMessage).toBe('Erreur lors de la suppression');
    });

    it('should filter users based on search term', () => {
        component.users = [...mockUsers];
        component.searchTerm = 'jane';
        component.onSearch();

        expect(component.filteredUsers.length).toBe(1);
        expect(component.filteredUsers[0].username).toBe('jane');
    });

    it('should reset filteredUsers if search term is empty', () => {
        component.users = [...mockUsers];
        component.filteredUsers = [];
        component.searchTerm = '';
        component.onSearch();

        expect(component.filteredUsers).toEqual(mockUsers);
    });
});
