export interface Campaign {
    id: number | string | string[],
    created_at: string,
    title: string,
    summary: string,
    sessionsList: Array<Session>,
}

export interface Session {
    id: number,
    created_at: string,
    title: string,
    summary: string,
}