import { Alerte } from './alerte.model';

describe('Alerte Model', () => {

    it('devrait créer une instance avec des valeurs par défaut', () => {
        const alerte = new Alerte();

        expect(alerte.id).toBeUndefined();
        expect(alerte.chauffeurId).toBe(0);
        expect(alerte.typeAlerte).toBe('');
        expect(alerte.message).toBe('');
        expect(alerte.latitude).toBeUndefined();
        expect(alerte.longitude).toBeUndefined();
        expect(alerte.zoneConcerneeId).toBeUndefined();
        expect(alerte.estLue).toBeFalse();
        expect(alerte.createdAt).toBeUndefined();
    });

    it('devrait créer une instance avec des valeurs passées dans le constructeur', () => {
        const data = {
            id: 1,
            chauffeurId: 42,
            typeAlerte: 'Sécurité',
            message: 'Zone dangereuse',
            latitude: 14.745,
            longitude: -17.454,
            zoneConcerneeId: 5,
            estLue: true,
            createdAt: '2026-03-29T15:00:00Z'
        };

        const alerte = new Alerte();

        expect(alerte.id).toBe(1);
        expect(alerte.chauffeurId).toBe(42);
        expect(alerte.typeAlerte).toBe('Sécurité');
        expect(alerte.message).toBe('Zone dangereuse');
        expect(alerte.latitude).toBe(14.745);
        expect(alerte.longitude).toBe(-17.454);
        expect(alerte.zoneConcerneeId).toBe(5);
        expect(alerte.estLue).toBeTrue();
        expect(alerte.createdAt).toEqual(new Date('2026-03-29T15:00:00Z'));
    });

    it('devrait permettre de modifier les propriétés après instanciation', () => {
        const alerte = new Alerte();

        alerte.chauffeurId = 33;
        alerte.typeAlerte = 'Maintenance';
        alerte.message = 'Véhicule en panne';
        alerte.latitude = 14.123;
        alerte.longitude = -16.987;
        alerte.zoneConcerneeId = 3;
        alerte.estLue = true;
        alerte.createdAt = new Date('2026-03-28T11:00:00Z');

        expect(alerte.chauffeurId).toBe(33);
        expect(alerte.typeAlerte).toBe('Maintenance');
        expect(alerte.message).toBe('Véhicule en panne');
        expect(alerte.latitude).toBe(14.123);
        expect(alerte.longitude).toBe(-16.987);
        expect(alerte.zoneConcerneeId).toBe(3);
        expect(alerte.estLue).toBeTrue();
        expect(alerte.createdAt).toEqual(new Date('2026-03-28T11:00:00Z'));
    });

});
