import { Vehicule } from './vehicule.model';

describe('Vehicule Model', () => {

    it('devrait créer une instance avec des valeurs par défaut', () => {
        const vehicule = new Vehicule();

        expect(vehicule.id).toBeUndefined();
        expect(vehicule.immatriculation).toBe('');
        expect(vehicule.marque).toBeUndefined();
        expect(vehicule.modele).toBeUndefined();
        expect(vehicule.couleur).toBeUndefined();
        expect(vehicule.annee).toBeUndefined();
        expect(vehicule.capacite).toBe(4);  // valeur par défaut
        expect(vehicule.chauffeurId).toBeUndefined();
        expect(vehicule.actif).toBeTrue();  // valeur par défaut
    });

    it('devrait créer une instance avec des valeurs passées dans le constructeur', () => {
        const data = {
            id: 1,
            immatriculation: '123-ABC',
            marque: 'Toyota',
            modele: 'Corolla',
            couleur: 'Rouge',
            annee: 2020,
            capacite: 5,
            chauffeurId: 10,
            actif: false
        };

        const vehicule = new Vehicule(data);

        expect(vehicule.id).toBe(1);
        expect(vehicule.immatriculation).toBe('123-ABC');
        expect(vehicule.marque).toBe('Toyota');
        expect(vehicule.modele).toBe('Corolla');
        expect(vehicule.couleur).toBe('Rouge');
        expect(vehicule.annee).toBe(2020);
        expect(vehicule.capacite).toBe(5);
        expect(vehicule.chauffeurId).toBe(10);
        expect(vehicule.actif).toBeFalse();
    });

    it('devrait permettre de modifier les propriétés après instanciation', () => {
        const vehicule = new Vehicule();

        vehicule.immatriculation = '456-DEF';
        vehicule.marque = 'Honda';
        vehicule.modele = 'Civic';
        vehicule.couleur = 'Bleu';
        vehicule.annee = 2018;
        vehicule.capacite = 7;
        vehicule.chauffeurId = 15;
        vehicule.actif = false;

        expect(vehicule.immatriculation).toBe('456-DEF');
        expect(vehicule.marque).toBe('Honda');
        expect(vehicule.modele).toBe('Civic');
        expect(vehicule.couleur).toBe('Bleu');
        expect(vehicule.annee).toBe(2018);
        expect(vehicule.capacite).toBe(7);
        expect(vehicule.chauffeurId).toBe(15);
        expect(vehicule.actif).toBeFalse();
    });

});
