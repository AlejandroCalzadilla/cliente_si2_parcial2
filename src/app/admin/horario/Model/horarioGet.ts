import { Aula } from "../../Aula/Model/aula"
import { GrupoGet } from "../../grupo/Model/grupoGet"

export  interface HorarioGet{   
    id?:number
     dia:string,
     horaInicio: string,
     horaFin:string ,
     aula:Aula
     grupo:GrupoGet 
        
    }
    