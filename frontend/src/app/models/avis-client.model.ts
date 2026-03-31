export class AvisClient {
    id?: number;
    courseId: number;
    note: number; // 1-5
    commentaire?: string;
    dateAvis?: Date;

    constructor(data: Partial<AvisClient> = {}) {
        this.id = data.id;
        this.courseId = data.courseId || 0;
        this.note = data.note || 0;
        this.commentaire = data.commentaire;
        this.dateAvis = data.dateAvis ? new Date(data.dateAvis) : undefined;
    }
}
