import { Component } from '@angular/core';
import { PrincipalComponent } from '../../principal/principal.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [PrincipalComponent,RouterLink,RouterOutlet],
  templateUrl: './facultadIndex.component.html',
  styleUrl: './index.component.css'
})
export class FacultadIndexComponent {

}
