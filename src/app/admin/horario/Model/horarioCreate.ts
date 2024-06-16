export  interface HorarioCreate{   
id?:number
 dia:string,
 horaInicio: string,
 horaFin:string ,
 aula:{
     id: number
 },
 grupo: {
     id: number
 }
    
}


