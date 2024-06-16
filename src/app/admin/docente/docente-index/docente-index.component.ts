import { Component, ElementRef, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { PrincipalComponent } from '../../principal/principal.component';
import { Router, RouterLink, RouterOutlet, Routes } from '@angular/router';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ReporteComponent } from '../reporte/reporte.component';
import { CommonModule } from '@angular/common';
import { DocenteService } from '../docente.service';
import { Docente } from '../Model/docente';
import { FormsModule } from '@angular/forms';
import { DocenteShowComponent } from '../docente-show/docente-show.component';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-docente-index',
  standalone: true,
  imports: [PrincipalComponent, RouterOutlet, RouterLink, NavbarComponent, ReporteComponent, CommonModule, FormsModule],
  templateUrl: './docente-index.component.html',

  //styleUrl: './docente-index.component.css'
})
export class DocenteIndexComponent {
  docentes: Docente[] = []

  constructor(private docenteservice: DocenteService, private router: Router) { }

  menuOpen: boolean[] = [];

  toggleMenu(index: number) {
    this.menuOpen[index] = !this.menuOpen[index];  // Toggle state for specific index
  }


  ngOnInit(): void {

    this.docenteservice.findAll().subscribe({
      next: (userdata) => {
        console.log(userdata, 'el docente')
        this.docentes = userdata
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
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (confirmacion) {
      this.eliminarUsuario(id);
    }
  }


  eliminarUsuario(id: string): void {
    this.docenteservice.delete(id).subscribe({
        next: () => {
          this.sucess()
          this.docenteservice.findAll().subscribe({
            next: (userdata) => {
              this.docentes = userdata
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
      title: "Docente eliminado",
      icon: "success",
    });

  }

  error() {
    Swal.fire({
      title: "Hubo algun error!",
      icon: "error",

    });
  }




  @ViewChild('pdfTemplate', { static: true }) pdfTemplate!: TemplateRef<any>;
  exportarPDF() {
    const DATA = document.getElementById('htmlData');
    //DATA!.style.display = 'block';
    DATA!.style.backgroundColor = '#1F2937';
    html2canvas(DATA!).then(canvas => {
      //DATA!.style.display = 'none';
      let fileWidth = 200;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;

      // Crear una nueva imagen y asignarle el src del canvas
      let img = new Image();
      img.onload = () => {

        // Asegurarse de que la imagen se cargue antes de añadirla al PDF
        PDF.addImage(img, 'PNG', 0, position, fileWidth, fileHeight);
        PDF.save('mi-archivo.pdf');

      };
      img.onerror = (error) => {
        // Manejar el error aquí
        console.error('Error al cargar la imagen:', error);
      };
      img.src = FILEURI;
    });
  }






}
