export class Chauffeur {
    id?: number;
    email: string;
    password: string;
    nom: string;
    prenom: string;
    statutVehicule: string; // 'LIBRE', 'EN_COURSE', 'HORS_SERVICE'
    zoneAssigneeId?: number;
    zoneAssigneeNom?: string;

    constructor(data: Partial<Chauffeur> = {}) {
        this.id = data.id;
        this.email = data.email || '';
        this.password = data.password || '';
        this.nom = data.nom || '';
        this.prenom = data.prenom || '';
        this.statutVehicule = data.statutVehicule || 'HORS_SERVICE';
        this.zoneAssigneeId = data.zoneAssigneeId;
        this.zoneAssigneeNom = data.zoneAssigneeNom;
    }
}
