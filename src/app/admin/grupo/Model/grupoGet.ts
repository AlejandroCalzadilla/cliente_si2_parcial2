import { Carrera } from "../../Carrera/Model/carrera"
import { Materia } from "../../Materia/Models/materia"
import { Docente } from "../../docente/Model/docente"

export  interface GrupoGet{   
     id:number
     nombre:string, 
     carrera:Carrera
     materia: Materia
     profesor: Docente
    
        
}
    
    