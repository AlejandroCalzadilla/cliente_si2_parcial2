import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {
  isDivVisible: boolean = false;
  isDivVisibleMovil: boolean = false;

  toggleDivVisibility() {
    console.log('hola mundo')
    this.isDivVisible = !this.isDivVisible;
  }

  toggleDivVisibilityMovil() {
    console.log('hola mundo movil')
    this.isDivVisibleMovil = !this.isDivVisibleMovil;
  }

}
