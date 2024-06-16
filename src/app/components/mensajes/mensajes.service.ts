import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { LoginService } from '../../auth/login/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class MenssgeService {
  private apiUrl = environment.domain + '/carreras';




  constructor(private http: HttpClient) { }

  




   
 messageSucess(mensaje:string ){
    Swal.fire  ({
      title: mensaje,
      icon: "success",
      
    });
  
  }
   
    messageError(mensaje:string){
      Swal.fire  ({
        title: mensaje,
        icon: "error",
        
      });
  
    }





}
