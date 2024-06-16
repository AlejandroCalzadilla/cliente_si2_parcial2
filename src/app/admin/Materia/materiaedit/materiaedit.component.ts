import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Modulo } from '../../Modulo/Model/modulo';
import { ModuloService } from '../../Modulo/modulo.service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MateriaService } from '../materia.service';
import { Materia } from '../Models/materia';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../components/navbar/navbar.component';

@Component({
  selector: 'app-materiaedit',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,NavbarComponent,RouterLink,RouterOutlet],
  templateUrl: './materiaedit.component.html',
  styleUrl: './materiaedit.component.css'
})
export class MateriaeditComponent {
  docenteId: string='';
  docente!: Materia; 
  
  logierror:string=""
  data:Modulo | undefined
  CreateForm=this.formbuilder.group({
    nombre:['',[Validators.required,]],
    sigla:['',[Validators.required,]], 
    semestre:['',[Validators.required,]],    

  })
  materias:Materia[]=[] 
  constructor( private routeid: ActivatedRoute,private router: Router,private materiaService:MateriaService,private formbuilder:FormBuilder){ }
  
  ngOnInit(): void {
    //this.create();
    this.routeid.paramMap.subscribe(params => {
      this.docenteId = params.get('id')!;
      
       this.getDocente()
       
    });
   
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
   
 


   
   getDocente(): void {
    this.materiaService.findDocenteById(this.docenteId).subscribe((data: Materia) => {
      this.docente = data;
      if (data.semestre !== null) {
        this.CreateForm.setValue({
          nombre: data.nombre,
          sigla:data.sigla,
          semestre:data.semestre.toString()
          //telefono: data.telefono ? data.telefono.toString() : null,

          // Otros controles de formulario
        });
      } else {
        // Manejar el caso cuando data.nombre es null
      }
      

    });
   } 

   
   edit(): void {
    if(this.CreateForm.valid){ 
    this.materiaService.edit(this.CreateForm.value as unknown  as Modulo,this.docenteId).subscribe({
      next:(userdata)=>{
        this.succes()
      },
      error:(errordata)=>{
         this.error()
      },
      complete:()=>{
        this.materiaService.findAll().subscribe({
          next:(userdata)=>{ 
             this.materias=userdata
          },
        }) 
        this.router.navigateByUrl('/materia/index')
      }
    }) 
  }
 }
 
  succes(){
    Swal.fire  ({
      title: "Materia Editada con éxito!",
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
