import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { BotomsaveComponent } from '../../../components/botomsave/botomsave.component';
import { DocenteService } from '../docente.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Docente } from '../Model/docente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-docente-edit',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet,NavbarComponent,ReactiveFormsModule],
  templateUrl: './docente-edit.component.html',
  //styleUrl: './docente-edit.component.css'
})
export class DocenteEditComponent {
  docenteId: string='';
  docente!: Docente; 
  logierror:string=""
  data:Docente | undefined
  docenteCreateForm=this.formbuilder.group({
    nombre:['',[Validators.required,]],
    telefono:['',[Validators.required]],
    direccion:['',[Validators.required]],
   

  })
  docentes:Docente[]=[] 
  constructor(private routeid: ActivatedRoute ,private router: Router,private docenteservice:DocenteService,private formbuilder:FormBuilder){ }
  
  ngOnInit(): void {
    this.routeid.paramMap.subscribe(params => {
      this.docenteId = params.get('id')!;
      
       this.getDocente()
       
    });
  }
   
   get nombre(){
    return this.docenteCreateForm.controls.nombre
   }
   

   get telefono(){
    return this.docenteCreateForm.controls.telefono
   }

   
   get direccion(){
    return this.docenteCreateForm.controls.direccion
   }

 
   getDocente(): void {
    this.docenteservice.findDocenteById(this.docenteId).subscribe((data: Docente) => {
      this.docente = data;
      if (data.nombre !== null) {
        this.docenteCreateForm.setValue({
          nombre: data.nombre,
          direccion:data.direccion,
          telefono: data.telefono ? data.telefono.toString() : null,

          // Otros controles de formulario
        });
      } else {
        // Manejar el caso cuando data.nombre es null
      }
      

    });
   } 

   
   edit(): void {
    if(this.docenteCreateForm.valid){ 
    this.docenteservice.edit(this.docenteCreateForm.value  as Docente,this.docenteId).subscribe({
      next:(userdata)=>{
        this.succes()
      },
      error:(errordata)=>{
         this.error()
      },
      complete:()=>{
        this.docenteservice.findAll().subscribe({
          next:(userdata)=>{ 
             this.docentes=userdata
          },
        }) 
        this.router.navigateByUrl('/docente/index')
      }
    }) 
  }
 }
   
 
  succes(){
    Swal.fire  ({
      title: "Datos del Docente Editados con éxito!",
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
