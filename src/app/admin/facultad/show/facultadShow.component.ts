import { Component } from '@angular/core';
import { PrincipalComponent } from '../../principal/principal.component';

@Component({
  selector: 'app-show',
  standalone: true,
  imports: [PrincipalComponent],
  templateUrl: './show.component.html',
  styleUrl: './show.component.css'
})
export class FacultadShowComponent {

}
