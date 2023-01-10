import { Cliente } from "./cliente";
import { Pizza } from "./pizza";
import { User } from "./user";

export interface Ordine{
    id?:number;
    data?:Date;
    closed?:boolean;
    codice?:string;
    fattorino?:User;
    costo?:number;
    pizze?:Pizza[];
    cliente?:Cliente;
}