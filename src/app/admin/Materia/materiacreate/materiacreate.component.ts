import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { Materia } from '../Models/materia';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MateriaService } from '../materia.service';
import { NavbarComponent } from '../../../components/navbar/navbar.component';

@Component({
  selector: 'app-materiacreate',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet,ReactiveFormsModule,NavbarComponent],
  templateUrl: './materiacreate.component.html',
  styleUrl: './materiacreate.component.css'
})
export class MateriacreateComponent {
  logierror:string=""
  data:Materia | undefined
  CreateForm=this.formbuilder.group({
    nombre:['',[Validators.required,]],
    sigla:['',[Validators.required,]],
    semestre:['',[Validators.required,]],

  })
  facultades:Materia[]=[] 
  constructor( private router: Router,private materiaService:MateriaService,private formbuilder:FormBuilder){ }
  
  ngOnInit(): void {
    //this.create();
   
  }
   
   get nombre(){
    return this.CreateForm.controls.nombre
   }
   get sigla(){
    return this.CreateForm.controls.sigla
   }
   get semestre(){
    return this.CreateForm.controls.semestre
   }
   
 


   
   create(): void {
    if(this.CreateForm.valid){ 
    this.materiaService.Create(this.CreateForm.value as unknown  as Materia).subscribe({
      next:(userdata)=>{
        this.succes()
      },
      error:(errordata)=>{
         this.error()
      },
      complete:()=>{
        this.materiaService.findAll().subscribe({
          next:(userdata)=>{ 
             this.facultades=userdata
          },
        }) 
        this.router.navigateByUrl('/materia/index')
      }
    }) 
  }
 }
   
 
  succes(){
    Swal.fire  ({
      title: "Materia  creada con éxito!",
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
