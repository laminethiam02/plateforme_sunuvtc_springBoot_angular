import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService, User } from './user.service';

describe('UserService', () => {
    let service: UserService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserService]
        });

        service = TestBed.inject(UserService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify(); // Vérifie qu'aucune requête HTTP n'est en attente
    });

    it('devrait être créé', () => {
        expect(service).toBeTruthy();
    });

    it('devrait récupérer tous les utilisateurs', () => {
        const dummyUsers: User[] = [
            { id: 1, username: 'user1', email: 'user1@example.com', fullName: 'User One', phone: '1234567890' },
            { id: 2, username: 'user2', email: 'user2@example.com', fullName: 'User Two', phone: '0987654321' }
        ];

        service.getAllUsers().subscribe(users => {
            expect(users.length).toBe(2);
            expect(users).toEqual(dummyUsers);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/users');
        expect(req.request.method).toBe('GET');
        req.flush(dummyUsers);
    });

    it('devrait récupérer un utilisateur par id', () => {
        const user: User = { id: 1, username: 'user1', email: 'user1@example.com', fullName: 'User One', phone: '1234567890' };

        service.getUserById(1).subscribe(u => {
            expect(u).toEqual(user);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/users/1');
        expect(req.request.method).toBe('GET');
        req.flush(user);
    });

    it('devrait créer un utilisateur', () => {
        const newUser: User = { username: 'user3', email: 'user3@example.com', fullName: 'User Three', phone: '1112223333' };

        service.createUser(newUser).subscribe(u => {
            expect(u).toEqual(newUser);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/users');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(newUser);
        req.flush(newUser);
    });

    it('devrait mettre à jour un utilisateur', () => {
        const updatedUser: User = { id: 1, username: 'user1', email: 'user1@example.com', fullName: 'User One Updated', phone: '1234567890' };

        service.updateUser(1, updatedUser).subscribe(u => {
            expect(u).toEqual(updatedUser);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/users/1');
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(updatedUser);
        req.flush(updatedUser);
    });

    it('devrait supprimer un utilisateur', () => {
        service.deleteUser(1).subscribe(response => {
            expect(response).toBeUndefined();
        });

        const req = httpMock.expectOne('http://localhost:8080/api/users/1');
        expect(req.request.method).toBe('DELETE');
        req.flush(null);
    });
});
