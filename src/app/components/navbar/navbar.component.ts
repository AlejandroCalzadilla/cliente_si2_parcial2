import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginService } from '../../auth/login/login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet],
  templateUrl: './navbar.component.html',
  
})
export class NavbarComponent {

  
  isDivVisible: boolean = false;
  isDivVisibleMovil: boolean = false;
 
    constructor(private loginService:LoginService,private router:Router){}
    
  toggleDivVisibility() {
    console.log('hola mundo')
    this.isDivVisible = !this.isDivVisible;
  }

  toggleDivVisibilityMovil() {
    console.log('hola mundo movil')
    this.isDivVisibleMovil = !this.isDivVisibleMovil;
  }


   cerrarsesioon(){

     this.loginService.logout();

     console.log('el token ', this.loginService.gettoken())
     
     this.router.navigateByUrl('')
 

   }



}
