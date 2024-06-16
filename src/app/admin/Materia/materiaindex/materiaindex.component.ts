import { Component } from '@angular/core';
import { ModuloService } from '../../Modulo/modulo.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Modulo } from '../../Modulo/Model/modulo';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { MateriaService } from '../materia.service';
import { Materia } from '../Models/materia';

@Component({
  selector: 'app-materiaindex',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet,NavbarComponent],
  templateUrl: './materiaindex.component.html',
  styleUrl: './materiaindex.component.css'
})
export class MateriaindexComponent {
  materias: Materia[] = []

  constructor(private materiaService: MateriaService, private router: Router) { }

  menuOpen: boolean[] = [];

  toggleMenu(index: number) {
    this.menuOpen[index] = !this.menuOpen[index];  // Toggle state for specific index
  }


  ngOnInit(): void {

    this.materiaService.findAll().subscribe({
      next: (userdata) => {
        //console.log(userdata, 'el docente')
        this.materias = userdata
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
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta materia?');
    if (confirmacion) {
      this.eliminarUsuario(id);
    }
  }


  eliminarUsuario(id: string): void {
    this.materiaService.delete(id).subscribe({
        next: () => {
          this.sucess()
          this.materiaService.findAll().subscribe({
            next: (userdata) => {
              this.materias = userdata
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
      title: "Materia eliminada",
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
