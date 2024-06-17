import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { Facultad } from '../../facultad/Model/Facultad';
import { FacultadService } from '../../facultad/facultad.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { CarreracreateComponent } from '../../Carrera/carreracreate/carreracreate.component';
import { AulaService } from '../aula.service';
import { MenssgeService } from '../../../components/mensajes/mensajes.service';
import { Aula } from '../Model/aula';

@Component({
  selector: 'app-aulaesit',
  standalone: true,
  imports: [NavbarComponent,RouterLink,RouterOutlet,ReactiveFormsModule,CommonModule,CarreracreateComponent],
  templateUrl: './aulaesit.component.html',
  //styleUrl: './aulaesit.component.css'
})
export class AulaeditComponent {
  registros: Aula[] = []
  logierror:string=""
  totalItems: number = 0;
  paginaActual: number = 1;
  itemsPorPagina: number = 3;
  docenteId: string='';
  data:Aula | undefined
  CreateForm=this.formbuilder.group({
    numero:['',[Validators.required,]],
    tipo:['',[Validators.required,]],
    capacidad:['',[Validators.required,]],

  })
  usuariosFiltrados: Aula[] = [];
  criterioBusqueda: string = '';






  

  pages: number[] = [];

  constructor(private routeid:ActivatedRoute ,private aulaService:AulaService , private router: Router,private formbuilder:FormBuilder,private mensajeService:MenssgeService) { }

  menuOpen: boolean[] = [];

  toggleMenu(index: number) {
    this.menuOpen[index] = !this.menuOpen[index];  // Toggle state for specific index
  }
  

  ngOnInit(): void {

    this.routeid.paramMap.subscribe(params => {
      this.docenteId = params.get('id')!;
      localStorage.setItem('idfacultad',this.docenteId)
       this.getCarrera()
       
    });

  }
 
  getCarrera(): void {
    this.aulaService.findCarreraById(this.docenteId).subscribe((data: Aula) => {
     // this.carrera = data;
      if (data.numero !== null) {  
        this.CreateForm.setValue({
          numero:data.numero.toString(),
          tipo:data.tipo.toString(),
          capacidad:data.capacidad.toString()
          //telefono: data.telefono ? data.telefono.toString() : null,

          // Otros controles de formulario
        });

      } else {
        // Manejar el caso cuando data.nombre es null
      }
      

    });
   } 












  cambiarPagina(pagina: number): void {
   /*  if (pagina < 1 || pagina > this.totalPaginas()) {
      return;
    }
    this.paginaActual = pagina;
    this.paginaActual = pagina;
    //this.actualizarUsuariosFiltrados();
  //}
    const inicio = (pagina - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    this.usuariosFiltrados = this.registros.slice(inicio, fin); */
  }

  

  buscar(): void {
    if (this.criterioBusqueda.trim()) {
      const criterio = this.criterioBusqueda.toLowerCase();
      this.usuariosFiltrados = this.registros.filter(usuario => 
        usuario.numero.toString().includes(criterio) ||
        usuario.tipo.toLowerCase().includes(criterio) ||
        usuario.capacidad.toString().includes(criterio)

      );
      this.totalItems = this.usuariosFiltrados.length;
      //this.cambiarPagina(1); 
    } else {
      this.usuariosFiltrados = this.registros;
      this.totalItems = this.registros.length;
      //this.cambiarPagina(this.paginaActual);
      //this.usuariosFiltrados = [...this.registros];
    }
    //this.totalItems = this.usuariosFiltrados.length;
    //this.cambiarPagina(1);
  }

 /*  actualizarUsuariosFiltrados(): void {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    this.usuariosFiltrados = this.usuariosFiltrados.slice(inicio, fin);
  } */



  //calcula y artuzaliza las paginas 
  calcularPaginas() {
    /* const totalPaginas = Math.ceil(this.totalItems / this.itemsPorPagina);
    const paginas = [];
    for (let i = 1; i <= totalPaginas; i++) {
      paginas.push(i);
    }
    return paginas; */
  }
  
  //calcula el total de paginas
  totalPaginas(): number {
    return Math.ceil(this.totalItems / this.itemsPorPagina);
  }
  

  token(){
    return localStorage.getItem('idmodulo')
  }

  confirmarEliminacion(id: any) {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta facultad?');
    if (confirmacion) {
      this.eliminarUsuario(id);
    }
  }


  eliminarUsuario(id: string): void {
    this.aulaService.delete(id).subscribe({
        next: () => {
          this.mensajeService.messageSucess("el aula fue elimnada con exito")
          this.aulaService.findAll().subscribe({
            next: (userdata) => {
              this.registros= userdata
              this.totalItems=userdata.length
             this.usuariosFiltrados=userdata
              
            },

          })
        },
        error: (error) => {
          this.error()
        },
      }
    );
  }


 
  facultades:Aula[]=[] 
  
   
   get numero(){
    return this.CreateForm.controls.numero
   }
   get tipo(){
    return this.CreateForm.controls.tipo
   }
   get capacidad(){
    return this.CreateForm.controls.capacidad
   }
   
 


   
   edit(): void {
    if(this.CreateForm.valid){ 
    this.aulaService.edit(this.CreateForm.value as unknown  as Aula,Number(this.token()),Number(this.docenteId)).subscribe({
      next:(userdata)=>{
        this.mensajeService.messageSucess("el aula fue edit con exito");
        this.aulaService.findAll().subscribe({
          next:(userdata)=>{ 
             this.registros=userdata
             this.totalItems=userdata.length
             this.usuariosFiltrados=userdata
            },
        }) 
        const idmodulo=Number(this.token())  
        this.router.navigateByUrl(`/modulo/edit/${idmodulo}`)

      },
      error:(errordata)=>{
         this.error()
      },
     
    }) 
  }
 }
























  error() {
    Swal.fire({
      title: "Hubo algun error!",
      icon: "error",

    });
  }
}
