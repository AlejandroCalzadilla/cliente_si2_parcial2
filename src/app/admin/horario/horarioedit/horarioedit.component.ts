import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AulaGet } from '../../Aula/Model/aulaGet';
import { GrupoGet } from '../../grupo/Model/grupoGet';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HorarioCreate } from '../Model/horarioCreate';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { HorarioService } from '../horario.service';
import { GrupoService } from '../../grupo/grupo.service';
import { AulaService } from '../../Aula/aula.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { HorarioGet } from '../Model/horarioGet';

@Component({
  selector: 'app-horarioedit',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet,NavbarComponent,ReactiveFormsModule],
  templateUrl: './horarioedit.component.html',
  styleUrl: './horarioedit.component.css'
})
export class HorarioeditComponent {
  dias: string[] = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"]; 
  logierror:string=""
  aulas:AulaGet[]=[]
  grupos:GrupoGet[]=[]
  docenteId:string=''
  data:HorarioCreate | undefined
  CreateForm!: FormGroup;
  
  modulos:HorarioCreate[]=[] 
  constructor(private routeid:ActivatedRoute  , private router: Router,private horarioService:HorarioService,private formbuilder:FormBuilder,private aulaService:AulaService
  ,private grupoService:GrupoService

  ){ }
  
  ngOnInit(): void {
    //this.create();
    this.routeid.paramMap.subscribe(params => {
      this.docenteId = params.get('id')!;
      localStorage.setItem('idfacultad',this.docenteId)
       this.getHorario()
       
    });

    this.CreateForm=this.formbuilder.group({
      aula:['',[Validators.required,]],
      dia:['',[Validators.required,]],
      grupo:['',[Validators.required,]], 
      horaInicio:['',[Validators.required,]],
      horaFin:['',[Validators.required,]],      
  
    })    

 

    this.aulaService.findAllC().subscribe({
      next: (aulas) => {
        this.aulas=aulas
      },
      error: (errordata) => {   
        //this.logierror=errordata.error.message
      },
    })
    
    this.grupoService.findAll().subscribe({
      next: (materias) => {
        this.grupos=materias
        console.log(materias,'aver que esta devolviendo en grupo')
      },
      error: (errordata) => {   
        //this.logierror=errordata.error.message
      },
    })

   
  }
   
   get aula(){
    return this.CreateForm.controls['aula']
   }
   get grupo(){
    return this.CreateForm.controls['grupo']
   }
    
    get horaInicio(){
      return this.CreateForm.controls['horaInicio']

     }   
     get horaFin(){
      return this.CreateForm.controls['horaFin']

    }   
    get dia(){
      return this.CreateForm.controls['dia']
    }
  


   
   edit() {
    if(this.CreateForm.valid){ 
      console.log('aver posi el form edit o nega')
    this.horarioService.edit(this.CreateForm.value ,Number(this.docenteId)).subscribe({
      next:(userdata)=>{
        this.succes()
      },
      error:(errordata)=>{
         this.error()
      },
      complete:()=>{
        this.horarioService.findAll().subscribe({
          next:(userdata)=>{ 
             this.modulos=userdata
          },
        }) 
        this.router.navigateByUrl('/horario/index')
      }
    }) 
  }
 }
   
  
  

getHorario(): void {
  this.horarioService.findCarreraById(this.docenteId).subscribe((data: HorarioGet) => {
    //this.docenteId = data;
    if (data.dia !== null) {
       console.log('esta devolviendo nel',data)
       const hi=this.removeSecondsFromTime(data.horaInicio)
       const hf=this.removeSecondsFromTime(data.horaInicio)
       
       this.CreateForm.setValue({
        dia:  data.dia ,
        
        horaInicio: hi,
        aula:data.aula.id,
        grupo:data.grupo.id,
        horaFin:hf
      });
    } else {
      // Manejar el caso cuando data.nombre es null
    }
    

  });
 } 
 

 removeSecondsFromTime(time: string): string {
  if (time.length === 8 && time.includes(':')) {
    return time.substring(0, 5);
  }
  return time; // Devuelve la cadena original si no está en el formato esperado
}

  succes(){
    Swal.fire  ({
      title: "Horario creado con éxito!",
      icon: "success",
      
    });

  }
  
  error(){

    Swal.fire  ({
      title: 'hubo algun error al crear ',
      
      icon: "error",
      
    });
    
  }
 
}
