import { GrupoGet } from "../../grupo/Model/grupoGet"

export  interface AsistenciaGet{   
    id:number
    hora:string,
    estado:string,
    fecha:string, 
    grupo:GrupoGet
   
       
}