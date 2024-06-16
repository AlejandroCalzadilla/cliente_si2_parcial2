import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { BotomsaveComponent } from '../../../components/botomsave/botomsave.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Facultad } from '../Model/Facultad';
import { FacultadService } from '../facultad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet,NavbarComponent,BotomsaveComponent,ReactiveFormsModule],
  templateUrl: './create.component.html',
  
})
export class FacultadCreateComponent {
  logierror:string=""
  data:Facultad | undefined
  facultadCreateForm=this.formbuilder.group({
    nombre:['',[Validators.required,]],
    descripcion:['',[Validators.required,]],    

  })
  facultades:Facultad[]=[] 
  constructor( private router: Router,private facultadService:FacultadService,private formbuilder:FormBuilder){ }
  
  ngOnInit(): void {
    //this.create();
   
  }
   
   get nombre(){
    return this.facultadCreateForm.controls.nombre
   }
   get descripcion(){
    return this.facultadCreateForm.controls.descripcion
   }

   
 


   
   create(): void {
    if(this.facultadCreateForm.valid){ 
    this.facultadService.Create(this.facultadCreateForm.value  as Facultad).subscribe({
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
        this.router.navigateByUrl('/facultad/index')
      }
    }) 
  }
 }
   
 
  succes(){
    Swal.fire  ({
      title: "Facultad creada con éxito!",
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
