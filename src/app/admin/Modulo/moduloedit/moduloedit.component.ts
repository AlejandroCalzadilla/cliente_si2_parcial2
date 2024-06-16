import { Component } from '@angular/core';
import { Modulo } from '../Model/modulo';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ModuloService } from '../modulo.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { AulacreateComponent } from '../../Aula/aulacreate/aulacreate.component';

@Component({
  selector: 'app-moduloedit',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet,ReactiveFormsModule ,NavbarComponent,AulacreateComponent],
  templateUrl: './moduloedit.component.html',
  //styleUrl: './moduloedit.component.css'
})
export class ModuloeditComponent {
  docenteId: string='';
  docente!: Modulo; 
  
  logierror:string=""
  data:Modulo | undefined
  moduloCreateForm=this.formbuilder.group({
    numero:['',[Validators.required,]],
    longitud:['',[Validators.required,]], 
    latitud:['',[Validators.required,]],    

  })
  modulos:Modulo[]=[] 
  constructor(private routeid: ActivatedRoute, private router: Router,private moduloService:ModuloService,private formbuilder:FormBuilder){ }
  
  ngOnInit(): void {
    //this.create();
    this.routeid.paramMap.subscribe(params => {
      this.docenteId = params.get('id')!;
      localStorage.setItem('idmodulo',this.docenteId) 
       this.getDocente()
       
    });
   
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
   
 


   
   getDocente(): void {
    this.moduloService.findDocenteById(this.docenteId).subscribe((data: Modulo) => {
      this.docente = data;
      if (data.numero !== null) {
        this.moduloCreateForm.setValue({
          numero: data.numero.toString(),
          latitud:data.latitud.toString(),
          longitud:data.longitud.toString()
          //telefono: data.telefono ? data.telefono.toString() : null,

          // Otros controles de formulario
        });
      } else {
        // Manejar el caso cuando data.nombre es null
      }
      

    });
   } 

   
   edit(): void {
    if(this.moduloCreateForm.valid){ 
    this.moduloService.edit(this.moduloCreateForm.value as unknown  as Modulo,this.docenteId).subscribe({
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
        this.router.navigateByUrl('/modulo/index')
      }
    }) 
  }
 }
 
  succes(){
    Swal.fire  ({
      title: "Modulo editado con éxito!",
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
