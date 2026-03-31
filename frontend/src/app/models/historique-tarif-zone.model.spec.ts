import { HistoriqueTarifZone } from './historique-tarif-zone.model';

describe('HistoriqueTarifZone Model', () => {

    it('devrait créer une instance avec des valeurs par défaut', () => {
        const historique = new HistoriqueTarifZone();

        expect(historique.id).toBeUndefined();
        expect(historique.zoneId).toBe(0);
        expect(historique.ancienTarif).toBe(0);
        expect(historique.nouveauTarif).toBe(0);
        expect(historique.modifiePar).toBeUndefined();
        expect(historique.dateModification).toBeUndefined();
    });

    it('devrait créer une instance avec des valeurs passées dans le constructeur', () => {
        const data = {
            id: 1,
            zoneId: 5,
            ancienTarif: 100,
            nouveauTarif: 150,
            modifiePar: 10,
            dateModification: '2026-03-29T12:00:00Z'
        };

        const historique = new HistoriqueTarifZone();

        expect(historique.id).toBe(1);
        expect(historique.zoneId).toBe(5);
        expect(historique.ancienTarif).toBe(100);
        expect(historique.nouveauTarif).toBe(150);
        expect(historique.modifiePar).toBe(10);
        expect(historique.dateModification).toEqual(new Date('2026-03-29T12:00:00Z'));
    });

    it('devrait permettre de modifier les propriétés après instanciation', () => {
        const historique = new HistoriqueTarifZone();

        historique.zoneId = 3;
        historique.ancienTarif = 50;
        historique.nouveauTarif = 75;
        historique.modifiePar = 7;
        historique.dateModification = new Date('2026-03-28T09:30:00Z');

        expect(historique.zoneId).toBe(3);
        expect(historique.ancienTarif).toBe(50);
        expect(historique.nouveauTarif).toBe(75);
        expect(historique.modifiePar).toBe(7);
        expect(historique.dateModification).toEqual(new Date('2026-03-28T09:30:00Z'));
    });

});
