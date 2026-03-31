import { HistoriquePosition } from './historique-position.model';

describe('HistoriquePosition Model', () => {

    it('devrait créer une instance avec des valeurs par défaut', () => {
        const historique = new HistoriquePosition();

        expect(historique.id).toBeUndefined();
        expect(historique.chauffeurId).toBe(0);
        expect(historique.latitude).toBe(0);
        expect(historique.longitude).toBe(0);
        expect(historique.statutVehicule).toBeUndefined();
        expect(historique.vitesseKmh).toBeUndefined();
        expect(historique.timestampPosition).toEqual(jasmine.any(Date));
        expect(historique.createdAt).toBeUndefined();
    });

    it('devrait créer une instance avec des valeurs passées dans le constructeur', () => {
        const data = {
            id: 1,
            chauffeurId: 10,
            latitude: 14.678,
            longitude: -17.435,
            statutVehicule: 'En route',
            vitesseKmh: 50,
            timestampPosition: '2026-03-29T12:00:00Z',
            createdAt: '2026-03-28T10:00:00Z'
        };

        const historique = new HistoriquePosition();

        expect(historique.id).toBe(1);
        expect(historique.chauffeurId).toBe(10);
        expect(historique.latitude).toBe(14.678);
        expect(historique.longitude).toBe(-17.435);
        expect(historique.statutVehicule).toBe('En route');
        expect(historique.vitesseKmh).toBe(50);
        expect(historique.timestampPosition).toEqual(new Date('2026-03-29T12:00:00Z'));
        expect(historique.createdAt).toEqual(new Date('2026-03-28T10:00:00Z'));
    });

    it('devrait permettre de modifier les propriétés après instanciation', () => {
        const historique = new HistoriquePosition();

        historique.chauffeurId = 5;
        historique.latitude = 15.123;
        historique.longitude = -16.987;
        historique.statutVehicule = 'Arrêté';
        historique.vitesseKmh = 0;
        historique.timestampPosition = new Date('2026-03-27T08:00:00Z');
        historique.createdAt = new Date('2026-03-27T07:00:00Z');

        expect(historique.chauffeurId).toBe(5);
        expect(historique.latitude).toBe(15.123);
        expect(historique.longitude).toBe(-16.987);
        expect(historique.statutVehicule).toBe('Arrêté');
        expect(historique.vitesseKmh).toBe(0);
        expect(historique.timestampPosition).toEqual(new Date('2026-03-27T08:00:00Z'));
        expect(historique.createdAt).toEqual(new Date('2026-03-27T07:00:00Z'));
    });

});
