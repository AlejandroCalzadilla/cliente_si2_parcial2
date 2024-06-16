import { Component } from '@angular/core';
import { Carrera } from '../Model/carrera';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FacultadService } from '../../facultad/facultad.service';
import { CarreraService } from '../carrera.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { CarreraById } from '../Model/carreraById';

@Component({
  selector: 'app-carreraedit',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet,ReactiveFormsModule],
  templateUrl: './carreraedit.component.html',
  //styleUrl: './carreraedit.component.css'
})
export class CarreraeditComponent {
  docenteId: string='';
  carrera!: Carrera; 
  logierror:string=""
  data:Carrera | undefined
  carreraCreateForm=this.formbuilder.group({
    nombre:['',[Validators.required,]],
    codigo:['',[Validators.required]],
   

  })
  carreras:Carrera[]=[] 
  idfacu!:CarreraById
  constructor(private routeid: ActivatedRoute ,private router: Router,private carreraService:CarreraService,private formbuilder:FormBuilder){ }
  
  ngOnInit(): void {
    this.routeid.paramMap.subscribe(params => {
      this.docenteId = params.get('id')!;
      console.log('el id de la carrera',this.docenteId)
       this.getCarrera()
       
    });
  }
   
   get nombre(){
    return this.carreraCreateForm.controls.nombre
   }
   

   

   
   get codigo(){
    return this.carreraCreateForm.controls.codigo
   }

 
   getCarrera(): void {
    this.carreraService.findCarreraById(this.docenteId).subscribe((data: Carrera) => {
      this.carrera = data;
      if (data.nombre !== null) {  
        this.carreraCreateForm.setValue({
          nombre: data.nombre,
          codigo:data.codigo.toString(),
          //telefono: data.telefono ? data.telefono.toString() : null,

          // Otros controles de formulario
        });

      } else {
        // Manejar el caso cuando data.nombre es null
      }
      

    });
   } 

   
   edit(): void {
    if(this.carreraCreateForm.valid){ 

    this.carreraService.edit(this.carreraCreateForm.value as unknown  as Carrera,Number(this.docenteId),Number(this.carrera.facultad.id)).subscribe({
      next:(userdata)=>{
        this.succes()
      },
      error:(errordata)=>{
        console.log('llego por aca') 
        this.error()
      },
      complete:()=>{
        this.carreraService.findAll().subscribe({
          next:(userdata)=>{ 
             this.carreras=userdata
         
            },
        }) 
        const id=this.carrera.facultad.id
        this.router.navigateByUrl(`/facultad/edit/${id}`)
         
        
      }
    }) 
    }
  }
   
 
  succes(){
    Swal.fire  ({
      title: "Datos de la Carrera Editados con éxito!",
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
