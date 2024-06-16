import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../dto/user.dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,RouterOutlet,ReactiveFormsModule],
  templateUrl: './login.component.html',
 
})
export class LoginComponent {

  token:string=""
  logierror:string=""
  data:User | undefined
  loginForm=this.formbuilder.group({
    username:['',[Validators.required]],
    password:['',Validators.required],
  })
  constructor( private loginservice:LoginService,private router: Router,private formbuilder:FormBuilder){ }
  sessionToken!: string;
  ngOnInit():void{}
  

  get username(){
    return this.loginForm.controls.username
   }
   get password(){
    return this.loginForm.controls.password
   }




   Login(){
    if(this.loginForm.valid){  
      const respuesta=this.loginservice.Login(this.loginForm.value as User).subscribe({
      next:(userdata)=>{
      },
      error:(errordata)=>{
        this.logierror=errordata.error.message
        
      },
      complete:()=>{
        console.info("login esta completo")
        this.router.navigateByUrl('dashboard')
      }
    }) 
    
  }
     
  }
  
    

   
   
  





}
