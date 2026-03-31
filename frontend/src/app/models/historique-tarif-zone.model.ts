export class HistoriqueTarifZone {
    id?: number;
    zoneId: number;
    ancienTarif: number;
    nouveauTarif: number;
    modifiePar?: number;
    dateModification?: Date;

    constructor(data: Partial<HistoriqueTarifZone> = {}) {
        this.id = data.id;
        this.zoneId = data.zoneId || 0;
        this.ancienTarif = data.ancienTarif || 0;
        this.nouveauTarif = data.nouveauTarif || 0;
        this.modifiePar = data.modifiePar;
        this.dateModification = data.dateModification ? new Date(data.dateModification) : undefined;
    }
}
