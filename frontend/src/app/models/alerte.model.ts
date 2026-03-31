export class Alerte {
    id?: number;
    chauffeurId: number;
    typeAlerte: string;
    message: string;
    latitude?: number;
    longitude?: number;
    zoneConcerneeId?: number;
    estLue?: boolean;
    createdAt?: Date;

    constructor(data: Partial<Alerte> = {}) {
        this.id = data.id;
        this.chauffeurId = data.chauffeurId || 0;
        this.typeAlerte = data.typeAlerte || '';
        this.message = data.message || '';
        this.latitude = data.latitude;
        this.longitude = data.longitude;
        this.zoneConcerneeId = data.zoneConcerneeId;
        this.estLue = data.estLue ?? false;
        this.createdAt = data.createdAt ? new Date(data.createdAt) : undefined;
    }
}
