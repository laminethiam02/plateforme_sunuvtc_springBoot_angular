import { Course } from './course.model';

describe('Course Model', () => {

    it('devrait créer une instance avec des valeurs par défaut', () => {
        const course = new Course();

        expect(course.id).toBeUndefined();
        expect(course.chauffeurId).toBe(0);
        expect(course.chauffeurNom).toBeUndefined();
        expect(course.chauffeurPrenom).toBeUndefined();
        expect(course.debut).toEqual(jasmine.any(Date));
        expect(course.fin).toBeUndefined();
        expect(course.latDepart).toBe(0);
        expect(course.lngDepart).toBe(0);
        expect(course.latArrivee).toBeUndefined();
        expect(course.lngArrivee).toBeUndefined();
        expect(course.distanceKm).toBeUndefined();
        expect(course.montant).toBeUndefined();
        expect(course.statut).toBe('EN_COURSE');
        expect(course.zonesTraversees).toBeUndefined();
        expect(course.createdAt).toBeUndefined();
    });

    it('devrait créer une instance avec des valeurs passées dans le constructeur', () => {
        const data = {
            id: 1,
            chauffeurId: 10,
            chauffeurNom: 'Doe',
            chauffeurPrenom: 'John',
            debut: '2026-03-29T08:00:00Z',
            fin: '2026-03-29T09:00:00Z',
            latDepart: 14.678,
            lngDepart: -17.435,
            latArrivee: 14.700,
            lngArrivee: -17.420,
            distanceKm: 12.5,
            montant: 2500,
            statut: 'TERMINEE',
            zonesTraversees: 'Zone 1, Zone 2',
            createdAt: '2026-03-28T12:00:00Z'
        };

        const course = new Course(data);

        expect(course.id).toBe(1);
        expect(course.chauffeurId).toBe(10);
        expect(course.chauffeurNom).toBe('Doe');
        expect(course.chauffeurPrenom).toBe('John');
        expect(course.debut).toEqual(new Date('2026-03-29T08:00:00Z'));
        expect(course.fin).toEqual(new Date('2026-03-29T09:00:00Z'));
        expect(course.latDepart).toBe(14.678);
        expect(course.lngDepart).toBe(-17.435);
        expect(course.latArrivee).toBe(14.700);
        expect(course.lngArrivee).toBe(-17.420);
        expect(course.distanceKm).toBe(12.5);
        expect(course.montant).toBe(2500);
        expect(course.statut).toBe('TERMINEE');
        expect(course.zonesTraversees).toBe('Zone 1, Zone 2');
        expect(course.createdAt).toEqual(new Date('2026-03-28T12:00:00Z'));
    });

    it('devrait permettre de modifier les propriétés après instanciation', () => {
        const course = new Course();

        course.chauffeurId = 5;
        course.chauffeurNom = 'Smith';
        course.chauffeurPrenom = 'Alice';
        course.debut = new Date('2026-03-27T07:00:00Z');
        course.fin = new Date('2026-03-27T08:00:00Z');
        course.latDepart = 15.123;
        course.lngDepart = -16.987;
        course.latArrivee = 15.130;
        course.lngArrivee = -16.980;
        course.distanceKm = 8.4;
        course.montant = 1500;
        course.statut = 'ANNULEE';
        course.zonesTraversees = 'Zone 3';
        course.createdAt = new Date('2026-03-26T10:00:00Z');

        expect(course.chauffeurId).toBe(5);
        expect(course.chauffeurNom).toBe('Smith');
        expect(course.chauffeurPrenom).toBe('Alice');
        expect(course.debut).toEqual(new Date('2026-03-27T07:00:00Z'));
        expect(course.fin).toEqual(new Date('2026-03-27T08:00:00Z'));
        expect(course.latDepart).toBe(15.123);
        expect(course.lngDepart).toBe(-16.987);
        expect(course.latArrivee).toBe(15.130);
        expect(course.lngArrivee).toBe(-16.980);
        expect(course.distanceKm).toBe(8.4);
        expect(course.montant).toBe(1500);
        expect(course.statut).toBe('ANNULEE');
        expect(course.zonesTraversees).toBe('Zone 3');
        expect(course.createdAt).toEqual(new Date('2026-03-26T10:00:00Z'));
    });

});
