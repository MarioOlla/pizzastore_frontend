export interface User {
    id?: number;
    nome?: string;
    cognome?: string;
    username?: string;
    password?:string;
    dataDiNascita?: string;
    token?: string;
    ruoli?:string[];
}
