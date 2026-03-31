import { Zone } from './zone.model';

describe('Zone Model', () => {

    it('devrait créer une instance avec des valeurs par défaut', () => {
        const zone = new Zone();

        expect(zone.id).toBeUndefined();
        expect(zone.nom).toBe('');
        expect(zone.couleur).toBe('#000000');
        expect(zone.tarif).toBe(0);
        expect(zone.actif).toBeTrue();
        expect(zone.geom).toBe('');
    });

    it('devrait créer une instance avec des valeurs passées dans le constructeur', () => {
        const data = {
            id: 1,
            nom: 'Zone 1',
            couleur: '#FF0000',
            tarif: 100,
            actif: false,
            geom: 'POLYGON((...))'
        };

        const zone = new Zone(data);

        expect(zone.id).toBe(1);
        expect(zone.nom).toBe('Zone 1');
        expect(zone.couleur).toBe('#FF0000');
        expect(zone.tarif).toBe(100);
        expect(zone.actif).toBeFalse();
        expect(zone.geom).toBe('POLYGON((...))');
    });

    it('devrait permettre de modifier les propriétés après instanciation', () => {
        const zone = new Zone();

        zone.nom = 'Nouvelle Zone';
        zone.couleur = '#00FF00';
        zone.tarif = 50;
        zone.actif = false;
        zone.geom = 'POLYGON((1 1, 2 2, 3 3))';

        expect(zone.nom).toBe('Nouvelle Zone');
        expect(zone.couleur).toBe('#00FF00');
        expect(zone.tarif).toBe(50);
        expect(zone.actif).toBeFalse();
        expect(zone.geom).toBe('POLYGON((1 1, 2 2, 3 3))');
    });

});
