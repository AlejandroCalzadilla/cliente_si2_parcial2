import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { MateriaService } from '../../Materia/materia.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Carrera } from '../Model/carrera';
import { CarreraService } from '../carrera.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../components/navbar/navbar.component';

@Component({
  selector: 'app-carreracreate',
  standalone: true,
  imports: [RouterLink,RouterOutlet,CommonModule,ReactiveFormsModule,NavbarComponent],
  templateUrl: './carreracreate.component.html',
  //styleUrl: './carreracreate.component.css'
})
export class CarreracreateComponent {
  @Input() id!: string; 
  
  
  logierror:string=""
  data:Carrera | undefined
  CreateForm=this.formbuilder.group({
    nombre:['',[Validators.required,]],
    codigo:['',[Validators.required,]],
    
  })
  carreras:Carrera[]=[] 
  constructor( private router: Router,private carreraService:CarreraService,private formbuilder:FormBuilder){ }
  
  ngOnInit(): void {
    //this.create();
    this.carreraService.findAll().subscribe({
      next: (userdata) => {
        console.log(userdata, 'el docente')
        this.carreras = userdata
      },
      error: (errordata) => {
        //this.logierror=errordata.error.message 
      },
      complete: () => {
      }
    })
 
  }
   
   get nombre(){
    return this.CreateForm.controls.nombre
   }
   get codigo(){
    return this.CreateForm.controls.codigo
   }

 
   token(){
     return localStorage.getItem('idfacultad')
   }

   
   create(): void {
  
    if(this.CreateForm.valid){ 
    this.carreraService.Create(this.CreateForm.value as unknown  as Carrera,Number(this.token())).subscribe({
      next:(userdata)=>{
        this.sucessCreate()
      },
      error:(errordata)=>{
         this.error()
      },
      complete:()=>{
        this.carreraService.findAll().subscribe({
          next:(userdata)=>{ 
             console.log(userdata,'carreras actulizadas')
             this.carreras=userdata
            
            },  
        }) 
      }
    }) 
  }
 }
    
 menuOpen: boolean[] = [];

 toggleMenu(index: number) {
   this.menuOpen[index] = !this.menuOpen[index];  // Toggle state for specific index
 }


 



 confirmarEliminacioncarrera(id: any) {
   const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta Carrera?');
   if (confirmacion) {
     this.eliminarcarrera(id);
   }
 }


 eliminarcarrera(id: string): void {
   this.carreraService.delete(id).subscribe({
       next: () => {
         this.sucessDelete()
         this.carreraService.findAll().subscribe({
           next: (userdata) => {
             this.carreras = userdata
           },

         })
       },
       error: (error) => {
         this.error()
       },
     }
   );
 }





 sucessCreate(){
  Swal.fire  ({
    title: "Carrera  creada con éxito!",
    icon: "success",
    
  });

}
 
  sucessDelete(){
    Swal.fire  ({
      title: "Carrera  eliminada con éxito!",
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
