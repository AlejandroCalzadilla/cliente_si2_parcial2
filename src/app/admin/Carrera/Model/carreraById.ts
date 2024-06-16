export interface CarreraById{
    id?:number,
    nombre:string
    codigo:number
    facultad:{
        id:number
        nombre:string
        descripcion:string
    }

   }