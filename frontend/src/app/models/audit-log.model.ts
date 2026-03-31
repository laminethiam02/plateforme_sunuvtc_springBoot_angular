export class AuditLog {
    id?: number;
    utilisateurType: string; // 'CHAUFFEUR' or 'ADMIN'
    utilisateurId: number;
    action: string;
    details?: string;
    ipAddress?: string;
    createdAt?: Date;

    constructor(data: Partial<AuditLog> = {}) {
        this.id = data.id;
        this.utilisateurType = data.utilisateurType || '';
        this.utilisateurId = data.utilisateurId || 0;
        this.action = data.action || '';
        this.details = data.details;
        this.ipAddress = data.ipAddress;
        this.createdAt = data.createdAt ? new Date(data.createdAt) : undefined;
    }
}
