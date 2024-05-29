import { Component } from '@angular/core';
import { PrincipalComponent } from '../../principal/principal.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-docente-index',
  standalone: true,
  imports: [PrincipalComponent,RouterOutlet,RouterLink],
  templateUrl: './docente-index.component.html',
  styleUrl: './docente-index.component.css'
})
export class DocenteIndexComponent {

}
