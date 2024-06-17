import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GrupoService } from '../grupo.service';
import { CarreraService } from '../../Carrera/carrera.service';
import { MateriaService } from '../../Materia/materia.service';
import { DocenteService } from '../../docente/docente.service';
import { GrupoCreate } from '../Model/grupoCreate';
import { Materia } from '../../Materia/Models/materia';
import { Carrera } from '../../Carrera/Model/carrera';
import { Docente } from '../../docente/Model/docente';
import { GrupoGet } from '../Model/grupoGet';
import { AulaGet } from '../../Aula/Model/aulaGet';
import { HorarioCreate } from '../../horario/Model/horarioCreate';

@Component({
  selector: 'app-grupoedit',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet,NavbarComponent,ReactiveFormsModule],
  templateUrl: './grupoedit.component.html',
  styleUrl: './grupoedit.component.css'
})
export class GrupoeditComponent {
  dias: string[] = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"]; 
  logierror:string=""
  docentes:Docente[]=[]
  materias:Materia[]=[]
  carreras:Carrera[]=[]
  docenteId:string=''
  grupos:GrupoGet[]=[]
  data:HorarioCreate | undefined
  CreateForm!: FormGroup;
  
  modulos:HorarioCreate[]=[] 
  constructor(private routeid:ActivatedRoute  , private router: Router,private grupoService:GrupoService,private formbuilder:FormBuilder,private docenteService:DocenteService
  ,private materiaService:MateriaService,private carreraService:CarreraService

  ){ }
  
  ngOnInit(): void {
    //this.create();
    this.routeid.paramMap.subscribe(params => {
      this.docenteId = params.get('id')!;
      localStorage.setItem('idfacultad',this.docenteId)
       this.getHorario()
       
    });

    this.CreateForm=this.formbuilder.group({
      docente:['',[Validators.required,]],
      materia:['',[Validators.required,]], 
      carrera:['',[Validators.required,]],
      nombre:['',[Validators.required,]],      
  
    })    

 

    this.docenteService.findAll().subscribe({
      next: (aulas) => {
        this.docentes=aulas
      },
      error: (errordata) => {   
        //this.logierror=errordata.error.message
      },
    })
    
    this.carreraService.findAll().subscribe({
      next: (materias) => {
        this.carreras=materias
        console.log(materias,'aver que esta devolviendo en grupo')
      },
      error: (errordata) => {   
        //this.logierror=errordata.error.message
      },
    })

    this.materiaService.findAll().subscribe({
      next: (materias) => {
        this.materias=materias
        console.log(materias,'aver que esta devolviendo en grupo')
      },
      error: (errordata) => {   
        //this.logierror=errordata.error.message
      },
    })
     

   
  }
   
   get docente(){
    return this.CreateForm.controls['docente']
   }
   get materia(){
    return this.CreateForm.controls['materia']
   }
    
    get carrera(){
      return this.CreateForm.controls['carrera']

     }   
     get nombre(){
      return this.CreateForm.controls['nombre']

    }   

    /* get dia(){
      return this.CreateForm.controls['dia']
    } */
  


   
   edit() {
    if(this.CreateForm.valid){ 
      console.log('aver posi el form edit o nega')
    this.grupoService.edit(this.CreateForm.value ,Number(this.docenteId)).subscribe({
      next:(userdata)=>{
        this.succes()
      },
      error:(errordata)=>{
         this.error()
      },
      complete:()=>{
        this.grupoService.findAll().subscribe({
          next:(userdata)=>{ 
             this.grupos=userdata
          },
        }) 
        this.router.navigateByUrl('/grupo/index')
      }
    }) 
  }
 }
   
  
  

getHorario(): void {
  this.grupoService.findCarreraById(this.docenteId).subscribe((data: GrupoGet) => {
    //this.docenteId = data;
    if (data.carrera !== null) {
       console.log('esta devolviendo nel',data)
       
       
       this.CreateForm.setValue({
        docente:data.profesor.idProfesor,
        materia:data.materia.id, 
        carrera:data.carrera.id,
        nombre:data.nombre,     
        
       
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
