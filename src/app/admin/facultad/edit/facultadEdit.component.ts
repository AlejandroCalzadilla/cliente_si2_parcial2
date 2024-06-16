import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { Facultad } from '../Model/Facultad';
import { FacultadService } from '../facultad.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
//import { CarreraindexComponent } from '../../Carrera/carreraindex/carreraindex.component';
import { CarreracreateComponent } from '../../Carrera/carreracreate/carreracreate.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [NavbarComponent,RouterLink,RouterOutlet,ReactiveFormsModule,CommonModule,CarreracreateComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class FacultadEditComponent {
  docenteId: string='';
  docente!: Facultad; 
  logierror:string=""
  data:Facultad | undefined
  facultadCreateForm=this.formbuilder.group({
    nombre:['',[Validators.required,]],
    descripcion:['',[Validators.required]],
   

  })
  facultades:Facultad[]=[] 
  constructor(private routeid: ActivatedRoute ,private router: Router,private facultadService:FacultadService,private formbuilder:FormBuilder){ }
  
  ngOnInit(): void {
    this.routeid.paramMap.subscribe(params => {
      this.docenteId = params.get('id')!;
      localStorage.setItem('idfacultad',this.docenteId)
       this.getDocente()
       
    });
  }
   
   get nombre(){
    return this.facultadCreateForm.controls.nombre
   }
   

   

   
   get descripcion(){
    return this.facultadCreateForm.controls.descripcion
   }

 
   getDocente(): void {
    this.facultadService.findDocenteById(this.docenteId).subscribe((data: Facultad) => {
      this.docente = data;
      if (data.nombre !== null) {
        this.facultadCreateForm.setValue({
          nombre: data.nombre,
          descripcion:data.descripcion,
          //telefono: data.telefono ? data.telefono.toString() : null,

          // Otros controles de formulario
        });
      } else {
        // Manejar el caso cuando data.nombre es null
      }
      

    });
   } 

   
   edit(): void {
    if(this.facultadCreateForm.valid){ 
    this.facultadService.edit(this.facultadCreateForm.value  as Facultad,this.docenteId).subscribe({
      next:(userdata)=>{
        this.succes()
      },
      error:(errordata)=>{
         this.error()
      },
      complete:()=>{
        this.facultadService.findAll().subscribe({
          next:(userdata)=>{ 
             this.facultades=userdata
          },
        }) 
        this.router.navigateByUrl('/docente/index')
      }
    }) 
  }
 }
   
 
  succes(){
    Swal.fire  ({
      title: "Datos de la Facultad Editados con éxito!",
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
