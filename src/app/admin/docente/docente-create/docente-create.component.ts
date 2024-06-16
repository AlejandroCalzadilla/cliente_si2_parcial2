import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { BotomsaveComponent } from '../../../components/botomsave/botomsave.component';
import { Router } from '@angular/router';
import { DocenteService } from '../docente.service';
import { Docente } from '../Model/docente';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
//import { CreateDocente } from '../Model/createdocente';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-docente-create',
  standalone: true,
  imports: [CommonModule,NavbarComponent,BotomsaveComponent,ReactiveFormsModule],
  templateUrl: './docente-create.component.html',
  //styleUrl: './docente-create.component.css'
})
export class DocenteCreateComponent {
  logierror:string=""
  data:Docente | undefined
  docenteCreateForm=this.formbuilder.group({
    nombre:['',[Validators.required,]],
    telefono:['',[Validators.required]],
    direccion:['',[Validators.required]],
    username:['',[Validators.required]],
    password:['',Validators.required],

  })
  docentes:Docente[]=[] 
  constructor( private router: Router,private docenteservice:DocenteService,private formbuilder:FormBuilder){ }
  
  ngOnInit(): void {
    //this.create();
   
  }
   
   get nombre(){
    return this.docenteCreateForm.controls.nombre
   }
   get password(){
    return this.docenteCreateForm.controls.password
   }

   get telefono(){
    return this.docenteCreateForm.controls.telefono
   }

   get username(){
    return this.docenteCreateForm.controls.username
   }
   get direccion(){
    return this.docenteCreateForm.controls.direccion
   }

 


   
   create(): void {
    if(this.docenteCreateForm.valid){ 
    this.docenteservice.Create(this.docenteCreateForm.value  as Docente).subscribe({
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
      title: "Docente creado con éxito!",
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
