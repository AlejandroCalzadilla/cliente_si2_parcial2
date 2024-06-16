import { Component } from '@angular/core';
import { PrincipalComponent } from '../../principal/principal.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { BotomNewComponent } from '../../../components/botom-new/botom-new.component';
import { Facultad } from '../Model/Facultad';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { DocenteService } from '../../docente/docente.service';
import { Docente } from '../../docente/Model/docente';
import { FacultadService } from '../facultad.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [PrincipalComponent,RouterLink,RouterOutlet,NavbarComponent,CommonModule],
  templateUrl: './facultadIndex.component.html',
  
})
export class FacultadIndexComponent {
  facultades: Facultad[] = []

  constructor(private facultadservice: FacultadService, private router: Router) { }

  menuOpen: boolean[] = [];

  toggleMenu(index: number) {
    this.menuOpen[index] = !this.menuOpen[index];  // Toggle state for specific index
  }


  ngOnInit(): void {

    this.facultadservice.findAll().subscribe({
      next: (userdata) => {
        console.log(userdata, 'el docente')
        this.facultades = userdata
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



  confirmarEliminacion(id: any) {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta facultad?');
    if (confirmacion) {
      this.eliminarUsuario(id);
    }
  }


  eliminarUsuario(id: string): void {
    this.facultadservice.delete(id).subscribe({
        next: () => {
          this.sucess()
          this.facultadservice.findAll().subscribe({
            next: (userdata) => {
              this.facultades = userdata
            },

          })
        },
        error: (error) => {
          this.error()
        },
      }
    );
  }




  sucess() {

    Swal.fire({
      title: "Facultad eliminada",
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
