export class Zone {
    id?: number;
    nom: string;
    couleur: string;
    tarif: number;
    actif: boolean;
    geom: string;

    constructor(data: Partial<Zone> = {}) {
        this.id = data.id;
        this.nom = data.nom || '';
        this.couleur = data.couleur || '#000000';
        this.tarif = data.tarif || 0;
        this.actif = data.actif !== undefined ? data.actif : true;
        this.geom = data.geom || '';
    }
}
