export  interface GrupoCreate{   
    id?:number
     nombre:string,
     
     carrera:{
         id: number
     },
     materia: {
         id: number
     }
     profesor: {
        idProfesor: number
     }
        
}
    
    
    