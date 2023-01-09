import { Ingrediente } from "./ingrediente";

export interface Pizza{
    id?:number;
    descrizione?:string;
    prezzo?:number;
    ingredienti?:Ingrediente[];
}