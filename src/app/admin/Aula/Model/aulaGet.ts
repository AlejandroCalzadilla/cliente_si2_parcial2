export interface AulaGet{
    id?:number,
    numero:number
    tipo:string
    capacidad:number
    modulo:{
        id?:number        
        numero : number,
        latitud : number,
        longitud : number
    }

   }