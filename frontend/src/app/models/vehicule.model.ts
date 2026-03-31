export class Vehicule {
    id?: number;
    immatriculation: string;
    marque?: string;
    modele?: string;
    couleur?: string;
    annee?: number;
    capacite?: number;
    chauffeurId?: number;
    actif?: boolean;

    constructor(data: Partial<Vehicule> = {}) {
        this.id = data.id;
        this.immatriculation = data.immatriculation || '';
        this.marque = data.marque;
        this.modele = data.modele;
        this.couleur = data.couleur;
        this.annee = data.annee;
        this.capacite = data.capacite ?? 4;
        this.chauffeurId = data.chauffeurId;
        this.actif = data.actif ?? true;
    }
}
