import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { Docente } from '../Model/docente';
import { DocenteService } from '../docente.service';

@Component({
  selector: 'app-docente-show',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './docente-show.component.html',
  styleUrl: './docente-show.component.css'
})
export class DocenteShowComponent {
  docenteId: string='';
  docente!: Docente; 
  
  constructor( private routeid: ActivatedRoute,private docenteservice:DocenteService){}
 
   ngOnInit(): void {
    this.routeid.paramMap.subscribe(params => {
      this.docenteId = params.get('id')!;
      this.getDocente();
    });
  }

   
  getDocente(): void {
     this.docenteservice.findDocenteById(this.docenteId).subscribe((data: Docente) => {
      this.docente = data;
    });
  }

}
