import { Component } from '@angular/core';
import { HorarioCreate } from '../Model/horarioCreate';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HorarioService } from '../horario.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { AulaService } from '../../Aula/aula.service';
import { Aula } from '../../Aula/Model/aula';
import { AulaGet } from '../../Aula/Model/aulaGet';
import { MateriaService } from '../../Materia/materia.service';
import { Materia } from '../../Materia/Models/materia';
import { GrupoService } from '../../grupo/grupo.service';
import { GrupoGet } from '../../grupo/Model/grupoGet';

@Component({
  selector: 'app-horariocreate',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet,NavbarComponent,ReactiveFormsModule],
  templateUrl: './horariocreate.component.html',
  //styleUrl: './horariocreate.component.css'
})
export class HorariocreateComponent {
  dias: string[] = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"]; 
  logierror:string=""
  aulas:AulaGet[]=[]
  grupos:GrupoGet[]=[]
  
  data:HorarioCreate | undefined
  CreateForm=this.formbuilder.group({
    aula:['',[Validators.required,]],
    dia:['',[Validators.required,]],
    grupo:['',[Validators.required,]], 
    horaInicio:['',[Validators.required,]],
    horaFin:['',[Validators.required,]],      

  })
  modulos:HorarioCreate[]=[] 
  constructor( private router: Router,private horarioService:HorarioService,private formbuilder:FormBuilder,private aulaService:AulaService
  ,private grupoService:GrupoService

  ){ }
  
  ngOnInit(): void {
    //this.create();
     
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
    return this.CreateForm.controls.aula
   }
   get grupo(){
    return this.CreateForm.controls.grupo
   }
    
    get horaInicio(){
      return this.CreateForm.controls.horaInicio

     }   
     get horaFin(){
      return this.CreateForm.controls.horaFin

    }   
    get dia(){
      return this.CreateForm.controls.dia
    }
  


   
   create() {
    if(this.CreateForm.valid){ 
    this.horarioService.Create(this.CreateForm.value ).subscribe({
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
   
  
 getAula(): void {
  this.aulaService.findAll().subscribe((data: Aula[]) => {
    //this.aulas = data;
    if (data !== null) {
     /*  this.CreateForm.setValue({
        aula: data,
       
        //telefono: data.telefono ? data.telefono.toString() : null,

        // Otros controles de formulario
      }); */
    } else {
      // Manejar el caso cuando data.nombre es null
    }
    

  });
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
