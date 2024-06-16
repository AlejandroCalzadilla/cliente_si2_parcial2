import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import Swal from 'sweetalert2';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Modulo } from '../Model/modulo';
import { ModuloService } from '../modulo.service';

@Component({
  selector: 'app-modulocreate',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet,NavbarComponent,ReactiveFormsModule],
  templateUrl: './modulocreate.component.html',
  styleUrl: './modulocreate.component.css'
})
export class ModulocreateComponent {
  logierror:string=""
  data:Modulo | undefined
  moduloCreateForm=this.formbuilder.group({
    numero:['',[Validators.required,]],
    longitud:['',[Validators.required,]], 
    latitud:['',[Validators.required,]],    

  })
  modulos:Modulo[]=[] 
  constructor( private router: Router,private moduloService:ModuloService,private formbuilder:FormBuilder){ }
  
  ngOnInit(): void {
    //this.create();
    
    
  }
   
   get latitud(){
    return this.moduloCreateForm.controls.latitud
   }
   get longitud(){
    return this.moduloCreateForm.controls.longitud
   }
    get numero(){
      return this.moduloCreateForm.controls.numero

    }   
 


   
   create() {
    if(this.moduloCreateForm.valid){ 
    this.moduloService.Create(this.moduloCreateForm.value as unknown  as Modulo).subscribe({
      next:(userdata)=>{
        this.succes()
      },
      error:(errordata)=>{
         this.error()
      },
      complete:()=>{
        this.moduloService.findAll().subscribe({
          next:(userdata)=>{ 
             this.modulos=userdata
          },
        }) 
        this.router.navigateByUrl('/facultad/index')
      }
    }) 
  }
 }
   
 
  succes(){
    Swal.fire  ({
      title: "Modulo creado con éxito!",
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
