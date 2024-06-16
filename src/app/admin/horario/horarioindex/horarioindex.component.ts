import { Component } from '@angular/core';
import { HorarioCreate } from '../Model/horarioCreate';
import { HorarioService } from '../horario.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { HorarioGet } from '../Model/horarioGet';
import jsPDF from 'jspdf';
import 'jspdf-autotable'
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-horarioindex',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet,NavbarComponent],
  templateUrl: './horarioindex.component.html',
  //styleUrl: './horarioindex.component.css'
})
export class HorarioindexComponent {
  registros: HorarioGet[] = []
  menuOpen: boolean[] = [];
  filterOpen: boolean =false
  filters: { [key: string]: boolean } = {}
  constructor(private horarioService: HorarioService, private router: Router) { }

  
  


  ngOnInit(): void {

    this.horarioService.findAllC().subscribe({
      next: (userdata) => {
        console.log(userdata, 'el docente')
        this.registros = userdata
        console.log('que pasa con el horario',userdata)
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

  toggleMenu(index: number) {
    this.menuOpen[index] = !this.menuOpen[index];  // Toggle state for specific index
  }

  toggfiltros() {
    console.log('se puede o nel',this.filterOpen)
    this.filterOpen = !this.filterOpen;  // Toggle state for specific index
  }
 

  onFilterChange(event: any, filter: string): void {
    this.filters[filter] = event.target.checked;
    console.log('Estado de los filtros:', this.filters);
    // Puedes agregar lógica adicional aquí para aplicar los filtros a tus datos
  }

  confirmarEliminacion(id: any) {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este Modulo?');
    if (confirmacion) {
      this.eliminarUsuario(id);
    }
  }


  eliminarUsuario(id: string): void {
    console.log('este el id deberia llegar',id)
    this.horarioService.delete(id).subscribe({
        next: () => {
          this.sucess()
          this.horarioService.findAllC().subscribe({
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

  generatePDF(): void {
    const doc = new jsPDF();
    const col = ["Día", "Hora Inicio", "Hora Fin", "Aula", "Grupo"];
    const rows: any[] = [];

    this.registros.forEach(record => {
      const temp = [
        record.dia,
        record.horaInicio,
        record.horaFin,
        record.aula.id,
        record.grupo.id
      ];
      rows.push(temp);
    });

    autoTable(doc,{
      head: [col],
      body: rows,
    });

    doc.save('horario.pdf');
  }


  sucess() {

    Swal.fire({
      title: "horario nro: fue eliminado " ,
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
