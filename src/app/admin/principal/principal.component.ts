import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { LoginService } from '../../auth/login/login.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet,NavbarComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {
  isDivVisible: boolean = false;
  isDivVisibleMovil: boolean = false;

  
  constructor( private loginservice:LoginService,private formbuilder:FormBuilder){ }
  sessionToken!: string;  

  toggleDivVisibility() {
    console.log('hola mundo')
    this.isDivVisible = !this.isDivVisible;
  }

  toggleDivVisibilityMovil() {
    console.log('hola mundo movil')
    this.isDivVisibleMovil = !this.isDivVisibleMovil;
  }


  

}
