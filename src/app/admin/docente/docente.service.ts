import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Docente } from './Model/docente';
import { LoginService } from '../../auth/login/login.service';
//import { CreateDocente } from './Model/createdocente';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {
  private apiUrl = environment.domain + '/profesor';
  constructor(private http: HttpClient,private loginservice:LoginService) { }



  findAll(): Observable<Docente[]> {
    const endpoint = this.apiUrl;
    const token=this.loginservice.gettoken()
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    //return this.http.get(this.apiUrl, { headers });
    return this.http.get<Docente[]>(endpoint,{headers});
  } 

  findDocenteById(id: string): Observable<Docente> {
    const endpoint = `${this.apiUrl}/${id}`;
    const token = this.loginservice.gettoken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.get<Docente>(endpoint, { headers });
  }
  
  

  Create(docente: any): Observable<Docente> {
    //console.log(docente,'aver que llega')
     const docentes={
        nombre:docente.nombre,
        telefono:docente.telefono,
        direccion:docente.direccion,
        user:{
           username:docente.username,
           password:docente.password
        }   

     }
     console.log(docentes,'aver ahora')
    const endpoint = `${this.apiUrl}/register`;
    const token = this.loginservice.gettoken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.post<Docente>(endpoint, docentes,{ headers });
  }
 



  edit(docente: any,id:any): Observable<Docente> {
    const endpoint = `${this.apiUrl}/${id}`;
    const token = this.loginservice.gettoken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.put<Docente>(endpoint, docente,{ headers });
  }
 

  delete(id: any): Observable<any> {
    const endpoint = `${this.apiUrl}/${id}`;
    const token = this.loginservice.gettoken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.delete<any>(endpoint,{ headers });
  }















}
