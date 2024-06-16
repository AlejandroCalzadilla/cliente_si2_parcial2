import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Modulo } from '../Model/modulo';
import { ModuloService } from '../modulo.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../components/navbar/navbar.component';

@Component({
  selector: 'app-moduloindex',
  standalone: true,
  imports: [ CommonModule,RouterLink,RouterOutlet,NavbarComponent],
  templateUrl: './moduloindex.component.html',
  //styleUrl: './moduloindex.component.css'
})
export class ModuloindexComponent {
  modulos: Modulo[] = []

  constructor(private moduloService: ModuloService, private router: Router) { }

  menuOpen: boolean[] = [];

  toggleMenu(index: number) {
    this.menuOpen[index] = !this.menuOpen[index];  // Toggle state for specific index
  }


  ngOnInit(): void {

    this.moduloService.findAll().subscribe({
      next: (userdata) => {
        console.log(userdata, 'el docente')
        this.modulos = userdata
      },
      error: (errordata) => {
        //this.logierror=errordata.error.message

      },
      complete: () => {
        console.info("login esta completo")
        //this.router.navigateByUrl('dashboard')
      }
    })

  }



  confirmarEliminacion(id: any,numero:any) {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este Modulo?');
    if (confirmacion) {
      this.eliminarUsuario(id,numero);
    }
  }


  eliminarUsuario(id: string,numero:any): void {
    this.moduloService.delete(id).subscribe({
        next: () => {
          this.sucess(numero)
          this.moduloService.findAll().subscribe({
            next: (userdata) => {
              this.modulos = userdata
            },

          })
        },
        error: (error) => {
          this.error()
        },
      }
    );
  }




  sucess(modulo:any) {

    Swal.fire({
      title: "Modulo nro:"+modulo+" fue eliminado " ,
      icon: "success",
    });

  }

  error() {
    Swal.fire({
      title: "Hubo algun error!",
      icon: "error",

    });
  }



} 
