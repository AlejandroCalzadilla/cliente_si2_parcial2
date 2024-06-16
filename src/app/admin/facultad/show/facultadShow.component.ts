import { Component } from '@angular/core';
import { PrincipalComponent } from '../../principal/principal.component';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { Docente } from '../../docente/Model/docente';
import { DocenteService } from '../../docente/docente.service';
import { ActivatedRoute } from '@angular/router';
import { Facultad } from '../Model/Facultad';
import { FacultadService } from '../facultad.service';

@Component({
  selector: 'app-show',
  standalone: true,
  imports: [PrincipalComponent,NavbarComponent],
  templateUrl: './show.component.html',
  
})
export class FacultadShowComponent {
  facultadId: string='';
  facultad!: Facultad; 
  
  constructor( private routeid: ActivatedRoute,private facultadservice:FacultadService){}
 
   ngOnInit(): void {
    this.routeid.paramMap.subscribe(params => {
      this.facultadId = params.get('id')!;
      this.getDocente();
    });
  }

   
  getDocente(): void {
     this.facultadservice.findDocenteById(this.facultadId).subscribe((data: Facultad) => {
      this.facultad = data;
    });
  }



}
