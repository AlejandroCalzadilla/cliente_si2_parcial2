export interface Docente{
    idProfesor?:number,
    codigo?:number,
    nombre:string,
    direccion:string;
    telefono?:number; 
    user:{
        username?:number
        password?:string
    }
   }