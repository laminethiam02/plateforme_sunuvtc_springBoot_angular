export class HistoriquePosition {
    id?: number;
    chauffeurId: number;
    latitude: number;
    longitude: number;
    statutVehicule?: string;
    vitesseKmh?: number;
    timestampPosition: Date;
    createdAt?: Date;

    constructor(data: Partial<HistoriquePosition> = {}) {
        this.id = data.id;
        this.chauffeurId = data.chauffeurId || 0;
        this.latitude = data.latitude || 0;
        this.longitude = data.longitude || 0;
        this.statutVehicule = data.statutVehicule;
        this.vitesseKmh = data.vitesseKmh;
        this.timestampPosition = data.timestampPosition ? new Date(data.timestampPosition) : new Date();
        this.createdAt = data.createdAt ? new Date(data.createdAt) : undefined;
    }
}
