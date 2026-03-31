import { AvisClient } from './avis-client.model';

describe('AvisClient Model', () => {

    it('devrait créer une instance avec des valeurs par défaut', () => {
        const avis = new AvisClient();

        expect(avis.id).toBeUndefined();
        expect(avis.courseId).toBe(0);
        expect(avis.note).toBe(0);
        expect(avis.commentaire).toBeUndefined();
        expect(avis.dateAvis).toBeUndefined();
    });

    it('devrait créer une instance avec des valeurs passées dans le constructeur', () => {
        const data = {
            id: 1,
            courseId: 101,
            note: 5,
            commentaire: 'Très bon service',
            dateAvis: '2026-03-29T12:00:00Z'
        };

        const avis = new AvisClient(data);

        expect(avis.id).toBe(1);
        expect(avis.courseId).toBe(101);
        expect(avis.note).toBe(5);
        expect(avis.commentaire).toBe('Très bon service');
        expect(avis.dateAvis).toEqual(new Date('2026-03-29T12:00:00Z'));
    });

    it('devrait permettre de modifier les propriétés après instanciation', () => {
        const avis = new AvisClient();

        avis.courseId = 202;
        avis.note = 4;
        avis.commentaire = 'Service correct';
        avis.dateAvis = new Date('2026-03-28T10:00:00Z');

        expect(avis.courseId).toBe(202);
        expect(avis.note).toBe(4);
        expect(avis.commentaire).toBe('Service correct');
        expect(avis.dateAvis).toEqual(new Date('2026-03-28T10:00:00Z'));
    });

});
