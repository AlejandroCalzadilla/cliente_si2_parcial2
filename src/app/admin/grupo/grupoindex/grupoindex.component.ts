import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { GrupoService } from '../grupo.service';
import { GrupoCreate } from '../Model/grupoCreate';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { MateriaService } from '../../Materia/materia.service';
import { GrupoGet } from '../Model/grupoGet';

@Component({
  selector: 'app-grupoindex',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet,NavbarComponent],
  templateUrl: './grupoindex.component.html',
  styleUrl: './grupoindex.component.css'
})
export class GrupoindexComponent {
  registros: GrupoGet[] = []

  constructor(private grupoService: GrupoService, private router: Router,private materiaService:MateriaService) { }

  menuOpen: boolean[] = [];

  toggleMenu(index: number) {
    this.menuOpen[index] = !this.menuOpen[index];  // Toggle state for specific index
  }


  ngOnInit(): void {

    this.grupoService.findAll().subscribe({
      next: (userdata) => {
        console.log(userdata, 'el docente')
        this.registros = userdata
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
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este Modulo?');
    if (confirmacion) {
      this.eliminarUsuario(id);
    }
  }


  eliminarUsuario(id: string): void {
    this.grupoService.delete(id).subscribe({
        next: () => {
          this.sucess()
          this.grupoService.findAll().subscribe({
            next: (userdata) => {
              this.registros = userdata
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
      title: "Grupo fue eliminado " ,
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
