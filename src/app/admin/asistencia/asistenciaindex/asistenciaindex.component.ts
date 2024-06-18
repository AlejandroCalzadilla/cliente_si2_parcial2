import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AsistenciaGet } from '../Model/asistenciaget';
//import { HorarioService } from '../horario.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
//import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
//import { HorarioGet } from '../Model/horarioGet';
import jsPDF from 'jspdf';
import 'jspdf-autotable'
import autoTable from 'jspdf-autotable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import * as XLSX from 'xlsx';
import { AsistenciaService } from '../asistencia.service';
@Component({
  selector: 'app-asistenciaindex',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet,NavbarComponent,ReactiveFormsModule, NgxPaginationModule,FormsModule],
  templateUrl: './asistenciaindex.component.html',
  styleUrl: './asistenciaindex.component.css'
})
export class AsistenciaindexComponent {
  registros: AsistenciaGet[] = []
  menuOpen: boolean[] = [];
  filterOpen: boolean =false
  filters: { [key: string]: boolean } = {}
  selectedSort: string = ''

  filtrados: AsistenciaGet[] = [];
  criterioBusqueda: string = '';
  criterioBusqueda2: string = '';
  totalItems: number = 0;






  sortedHorarios: AsistenciaGet[] = [];
  constructor(private asistenciaService: AsistenciaService, private router: Router) { }

  
  


  ngOnInit(): void {

    this.asistenciaService.findAll().subscribe({
      next: (userdata) => {
        console.log(userdata, 'el docente')
        this.registros = userdata
        this.filtrados = userdata
        this.totalItems = userdata.length;
       // this.sortedHorarios = this.registros;
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

/*   buscar(): void {
    if (this.criterioBusqueda.trim()) {
      const criterio = this.criterioBusqueda.replace(/\s+/g, '').toLowerCase(); // Eliminar todos los espacios y convertir a minúsculas
      console.log(criterio, 'que está devolviendo el filter');
      this.filtrados = this.registros.filter(usuario => 
        usuario.dia.replace(/\s+/g, '').toLowerCase().includes(criterio) ||
        usuario.aula.numero.toString().replace(/\s+/g, '').includes(criterio) ||
        usuario.grupo.materia.nombre.replace(/\s+/g, '').toLowerCase().includes(criterio) ||
        usuario.grupo.profesor.nombre.replace(/\s+/g, '').toLowerCase().includes(criterio) ||
        usuario.grupo.carrera.nombre.replace(/\s+/g, '').toLowerCase().includes(criterio) ||
        usuario.horaInicio.replace(/\s+/g, '').includes(criterio) ||
        usuario.grupo.nombre.replace(/\s+/g, '').includes(criterio),
         
        
        console.log('dasndjasdasdajsd')
      );
      this.totalItems = this.filtrados.length;
    
    } else {
      this.filtrados = this.registros;
      this.totalItems = this.registros.length;
    }
  } */

  
  buscar(): void {
    const criterio1 = this.criterioBusqueda.replace(/\s+/g, '').toLowerCase(); // Eliminar todos los espacios y convertir a minúsculas
    const criterio2 = this.criterioBusqueda2.replace(/\s+/g, '').toLowerCase(); // Eliminar todos los espacios y convertir a minúsculas
  
    console.log(criterio1, 'criterio de búsqueda 1');
    console.log(criterio2, 'criterio de búsqueda 2');
  
    if (criterio1 || criterio2) {
      this.filtrados = this.registros.filter(usuario => 
        (usuario.fecha.replace(/\s+/g, '').toLowerCase().includes(criterio1) ||
        usuario.hora.replace(/\s+/g, '').toLowerCase().includes(criterio1) ||
        usuario.estado.toString().replace(/\s+/g, '').includes(criterio1) || 
        usuario.grupo.materia.nombre.replace(/\s+/g, '').toLowerCase().includes(criterio1) ||
        usuario.grupo.profesor.nombre.replace(/\s+/g, '').toLowerCase().includes(criterio1) ||
        usuario.grupo.carrera.nombre.replace(/\s+/g, '').toLowerCase().includes(criterio1) ||
        //usuario.horaInicio.replace(/\s+/g, '').includes(criterio1) ||
        usuario.grupo.nombre.replace(/\s+/g, '').toLowerCase().includes(criterio1)) &&
  
        (
          usuario.fecha.replace(/\s+/g, '').toLowerCase().includes(criterio1) ||  
        usuario.hora.replace(/\s+/g, '').toLowerCase().includes(criterio2) ||
        usuario.estado.toString().replace(/\s+/g, '').includes(criterio2) ||
        usuario.grupo.materia.nombre.replace(/\s+/g, '').toLowerCase().includes(criterio2) ||
        usuario.grupo.profesor.nombre.replace(/\s+/g, '').toLowerCase().includes(criterio2) ||
        usuario.grupo.carrera.nombre.replace(/\s+/g, '').toLowerCase().includes(criterio2) ||
        //usuario.horaInicio.replace(/\s+/g, '').includes(criterio2) ||
        usuario.grupo.nombre.replace(/\s+/g, '').toLowerCase().includes(criterio2))
      );
      this.totalItems = this.filtrados.length;
    } else {
      this.filtrados = this.registros;
      this.totalItems = this.registros.length;
    }
  }
  










  toggleMenu(index: number) {
    this.menuOpen[index] = !this.menuOpen[index];  // Toggle state for specific index
  }

 







  confirmarEliminacion(id: any) {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este Modulo?');
    if (confirmacion) {
      this.eliminarUsuario(id);
    }
  }


  eliminarUsuario(id: string): void {
    console.log('este el id deberia llegar',id)
    this.asistenciaService.delete(id).subscribe({
        next: () => {
          this.sucess()
          this.asistenciaService.findAll().subscribe({
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
    const col = ["fecha" ,"hora", "estado", "materia", "profesor", "carrera","grupo"];
    const rows: any[] = [];

    this.filtrados.forEach(record => {
      const temp = [
        record.fecha,
        record.hora,
        record.estado,
        record.grupo.materia.nombre,
        record.grupo.carrera.nombre,
        record.grupo.profesor.nombre,
        record.grupo.nombre,
        
      ];
      rows.push(temp);
    });

    autoTable(doc,{
      head: [col],
      body: rows,
    });

    doc.save('horario.pdf');
  }






  generateExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.prepareData());
    const workbook: XLSX.WorkBook = { Sheets: { 'Horario': worksheet }, SheetNames: ['Horario'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'horario');
  }

  prepareData(): any[] {
    return this.filtrados.map(record => ({
      'fecha': record.fecha,
      'hora': record.hora,
      'estado': record.estado,
      
      'Materia': record.grupo.materia.nombre,
      'Pofesor': record.grupo.profesor.nombre,
      'Carrera': record.grupo.carrera.nombre,
      'Grupo': record.grupo.nombre, 
    }));
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(data);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${fileName}_export_${new Date().getTime()}.xlsx`;
    anchor.click();
    window.URL.revokeObjectURL(url);
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
