import { Chauffeur } from './chauffeur.model';

describe('Chauffeur Model', () => {

    it('devrait créer une instance avec des valeurs par défaut', () => {
        const chauffeur = new Chauffeur();

        expect(chauffeur.id).toBeUndefined();
        expect(chauffeur.email).toBe('');
        expect(chauffeur.password).toBe('');
        expect(chauffeur.nom).toBe('');
        expect(chauffeur.prenom).toBe('');
        expect(chauffeur.statutVehicule).toBe('HORS_SERVICE');
        expect(chauffeur.zoneAssigneeId).toBeUndefined();
        expect(chauffeur.zoneAssigneeNom).toBeUndefined();
    });

    it('devrait créer une instance avec des valeurs passées dans le constructeur', () => {
        const data = {
            id: 1,
            email: 'john.doe@example.com',
            password: 'secret',
            nom: 'Doe',
            prenom: 'John',
            statutVehicule: 'LIBRE',
            zoneAssigneeId: 5,
            zoneAssigneeNom: 'Zone 1'
        };

        const chauffeur = new Chauffeur(data);

        expect(chauffeur.id).toBe(1);
        expect(chauffeur.email).toBe('john.doe@example.com');
        expect(chauffeur.password).toBe('secret');
        expect(chauffeur.nom).toBe('Doe');
        expect(chauffeur.prenom).toBe('John');
        expect(chauffeur.statutVehicule).toBe('LIBRE');
        expect(chauffeur.zoneAssigneeId).toBe(5);
        expect(chauffeur.zoneAssigneeNom).toBe('Zone 1');
    });

    it('devrait permettre de modifier les propriétés après instanciation', () => {
        const chauffeur = new Chauffeur();

        chauffeur.email = 'alice.smith@example.com';
        chauffeur.password = '123456';
        chauffeur.nom = 'Smith';
        chauffeur.prenom = 'Alice';
        chauffeur.statutVehicule = 'EN_COURSE';
        chauffeur.zoneAssigneeId = 10;
        chauffeur.zoneAssigneeNom = 'Zone 2';

        expect(chauffeur.email).toBe('alice.smith@example.com');
        expect(chauffeur.password).toBe('123456');
        expect(chauffeur.nom).toBe('Smith');
        expect(chauffeur.prenom).toBe('Alice');
        expect(chauffeur.statutVehicule).toBe('EN_COURSE');
        expect(chauffeur.zoneAssigneeId).toBe(10);
        expect(chauffeur.zoneAssigneeNom).toBe('Zone 2');
    });

});
