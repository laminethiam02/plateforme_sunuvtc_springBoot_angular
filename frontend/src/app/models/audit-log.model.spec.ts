import { AuditLog } from './audit-log.model';

describe('AuditLog Model', () => {

    it('devrait créer une instance avec des valeurs par défaut', () => {
        const log = new AuditLog();

        expect(log.id).toBeUndefined();
        expect(log.utilisateurType).toBe('');
        expect(log.utilisateurId).toBe(0);
        expect(log.action).toBe('');
        expect(log.details).toBeUndefined();
        expect(log.ipAddress).toBeUndefined();
        expect(log.createdAt).toBeUndefined();
    });

    it('devrait créer une instance avec des valeurs passées dans le constructeur', () => {
        const data = {
            id: 1,
            utilisateurType: 'CHAUFFEUR',
            utilisateurId: 10,
            action: 'Connexion',
            details: 'Connexion réussie',
            ipAddress: '192.168.1.1',
            createdAt: '2026-03-29T14:00:00Z'
        };

        const log = new AuditLog();

        expect(log.id).toBe(1);
        expect(log.utilisateurType).toBe('CHAUFFEUR');
        expect(log.utilisateurId).toBe(10);
        expect(log.action).toBe('Connexion');
        expect(log.details).toBe('Connexion réussie');
        expect(log.ipAddress).toBe('192.168.1.1');
        expect(log.createdAt).toEqual(new Date('2026-03-29T14:00:00Z'));
    });

    it('devrait permettre de modifier les propriétés après instanciation', () => {
        const log = new AuditLog();

        log.utilisateurType = 'ADMIN';
        log.utilisateurId = 5;
        log.action = 'Modification';
        log.details = 'Modification des droits';
        log.ipAddress = '10.0.0.5';
        log.createdAt = new Date('2026-03-28T09:00:00Z');

        expect(log.utilisateurType).toBe('ADMIN');
        expect(log.utilisateurId).toBe(5);
        expect(log.action).toBe('Modification');
        expect(log.details).toBe('Modification des droits');
        expect(log.ipAddress).toBe('10.0.0.5');
        expect(log.createdAt).toEqual(new Date('2026-03-28T09:00:00Z'));
    });

});
