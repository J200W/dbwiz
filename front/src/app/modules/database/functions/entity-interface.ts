export interface Entity {
    tablename: string | null,
    attributes: {
        name: string | null;
        type: string | null;
        option: string | null;
    }[];
}