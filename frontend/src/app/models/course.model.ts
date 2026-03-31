export class Course {
    id?: number;
    chauffeurId: number;
    chauffeurNom?: string;
    chauffeurPrenom?: string;
    debut: Date;
    fin?: Date;
    latDepart: number;
    lngDepart: number;
    latArrivee?: number;
    lngArrivee?: number;
    distanceKm?: number;
    montant?: number;
    statut: string; // 'EN_COURSE', 'TERMINEE', 'ANNULEE'
    zonesTraversees?: string;
    createdAt?: Date;

    constructor(data: Partial<Course> = {}) {
        this.id = data.id;
        this.chauffeurId = data.chauffeurId || 0;
        this.chauffeurNom = data.chauffeurNom;
        this.chauffeurPrenom = data.chauffeurPrenom;
        this.debut = data.debut ? new Date(data.debut) : new Date();
        this.fin = data.fin ? new Date(data.fin) : undefined;
        this.latDepart = data.latDepart || 0;
        this.lngDepart = data.lngDepart || 0;
        this.latArrivee = data.latArrivee;
        this.lngArrivee = data.lngArrivee;
        this.distanceKm = data.distanceKm;
        this.montant = data.montant;
        this.statut = data.statut || 'EN_COURSE';
        this.zonesTraversees = data.zonesTraversees;
        this.createdAt = data.createdAt ? new Date(data.createdAt) : undefined;
    }
}
