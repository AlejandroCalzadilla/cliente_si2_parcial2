import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Aula } from '../Model/aula';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { AulaService } from '../aula.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenssgeService } from '../../../components/mensajes/mensajes.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-aulacreate',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet,NavbarComponent,ReactiveFormsModule, NgxPaginationModule,
    FormsModule],
  templateUrl: './aulacreate.component.html',
  //styleUrl: './aulacreate.component.css'
})
export class AulacreateComponent {
  registros: Aula[] = []
  logierror:string=""
  totalItems: number = 0;
  paginaActual: number = 1;
  itemsPorPagina: number = 3;
 
  data:Aula | undefined
  CreateForm=this.formbuilder.group({
    numero:['',[Validators.required,]],
    tipo:['',[Validators.required,]],
    capacidad:['',[Validators.required,]],

  })
  usuariosFiltrados: Aula[] = [];
  criterioBusqueda: string = '';






  

  pages: number[] = [];

  constructor(private aulaService:AulaService , private router: Router,private formbuilder:FormBuilder,private mensajeService:MenssgeService) { }

  menuOpen: boolean[] = [];

  toggleMenu(index: number) {
    this.menuOpen[index] = !this.menuOpen[index];  // Toggle state for specific index
  }
  

  ngOnInit(): void {

    this.aulaService.findAll().subscribe({
      next: (aulas) => {
        this.registros = aulas
        this.usuariosFiltrados = aulas
        this.totalItems = aulas.length;
        //this.buscar();  
        //this.cambiarPagina(1); 

      },
      error: (errordata) => {
        
        //this.logierror=errordata.error.message
      },
    })

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
   
 


   
   create(): void {
    if(this.CreateForm.valid){ 
    this.aulaService.Create(this.CreateForm.value as unknown  as Aula,Number(this.token())).subscribe({
      next:(userdata)=>{
        this.mensajeService.messageSucess("el aula fue creada con exito");
        this.aulaService.findAll().subscribe({
          next:(userdata)=>{ 
             this.registros=userdata
             this.totalItems=userdata.length
             this.usuariosFiltrados=userdata
            },
        }) 
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
