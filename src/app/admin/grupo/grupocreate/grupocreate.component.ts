import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { GrupoService } from '../grupo.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { GrupoCreate } from '../Model/grupoCreate';
import { Docente } from '../../docente/Model/docente';
import { Materia } from '../../Materia/Models/materia';
import { MateriaService } from '../../Materia/materia.service';
import { DocenteService } from '../../docente/docente.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { CarreraService } from '../../Carrera/carrera.service';
import { Carrera } from '../../Carrera/Model/carrera';
import { GrupoGet } from '../Model/grupoGet';

@Component({
  selector: 'app-grupocreate',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet,NavbarComponent,ReactiveFormsModule],
  templateUrl: './grupocreate.component.html',
  //styleUrl: './grupocreate.component.css'
})
export class GrupocreateComponent {
  dias: string[] = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"]; 
  logierror:string=""
  docentes:Docente[]=[]
  materias:Materia[]=[]
  carreras:Carrera[]=[]
  
  data:GrupoCreate | undefined
  CreateForm=this.formbuilder.group({
    docente:['',[Validators.required,]],
    materia:['',[Validators.required,]], 
    carrera:['',[Validators.required,]],
    nombre:['',[Validators.required,]],      

  })
  modulos:GrupoGet[]=[] 
  constructor( private router: Router,private grupoService:GrupoService,private formbuilder:FormBuilder,private docenteService:DocenteService
  ,private materiaService:MateriaService,private carreraService:CarreraService

  ){ }
  
  ngOnInit(): void {
    //this.create();
     
    this.docenteService.findAll().subscribe({
      next: (aulas) => {
        this.docentes=aulas
      },
      error: (errordata) => {   
        //this.logierror=errordata.error.message
      },
    })
    
    this.materiaService.findAll().subscribe({
      next: (materias) => {
        this.materias=materias
      },
      error: (errordata) => {   
        //this.logierror=errordata.error.message
      },
    })

    this.carreraService.findAll().subscribe({
      next: (materias) => {
        this.carreras=materias
      },
      error: (errordata) => {   
        //this.logierror=errordata.error.message
      },
    })


   
  }
   
   
   get materia(){
    return this.CreateForm.controls.materia
   }
    
    get carrera(){
      return this.CreateForm.controls.carrera

     }   
     get nombre(){
      return this.CreateForm.controls.nombre

    }   
    get docente(){
      return this.CreateForm.controls.docente
    }
  


   
   create() {
     console.log(this.CreateForm.value,'aver el formulario')
   
    this.grupoService.Create(this.CreateForm.value ).subscribe({
      next:(userdata)=>{
        this.succes()
      },
      error:(errordata)=>{
         this.error()
      },
      complete:()=>{
        this.grupoService.findAll().subscribe({
          next:(userdata)=>{ 
             this.modulos=userdata
          },
        }) 
        //this.router.navigateByUrl('/facultad/index')
      }
    }) 
  
 }
   
  
 /* getAula(): void {
  this.grupoService.findAll().subscribe((data: []) => {
    //this.aulas = data;
    if (data !== null) {
    
    } else {
      // Manejar el caso cuando data.nombre es null
    }
    

  });
 }  */


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
