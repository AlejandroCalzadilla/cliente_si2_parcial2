import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { LoginService } from '../../auth/login/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Docente } from '../docente/Model/docente';
import { Facultad } from './Model/Facultad';

@Injectable({
  providedIn: 'root'
})
export class FacultadService {

  private apiUrl = environment.domain + '/facultad';
  constructor(private http: HttpClient,private loginservice:LoginService) { }



  findAll(): Observable<Facultad[]> {
    const endpoint = this.apiUrl;
    const token=this.loginservice.gettoken()
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    //return this.http.get(this.apiUrl, { headers });
    return this.http.get<Facultad[]>(endpoint,{headers});
  } 

  findDocenteById(id: string): Observable<Facultad> {
    const endpoint = `${this.apiUrl}/${id}`;
    const token = this.loginservice.gettoken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.get<Facultad>(endpoint, { headers });
  }
  
  

  Create(facultad: any): Observable<Facultad> {
    
    // console.log(docentes,'aver ahora')
    const endpoint = `${this.apiUrl}`;
    const token = this.loginservice.gettoken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.post<Facultad>(endpoint, facultad,{ headers });
  }
 



  edit(facultad: any,id:any): Observable<Docente> {
    const endpoint = `${this.apiUrl}/${id}`;
    const token = this.loginservice.gettoken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.put<Docente>(endpoint, facultad,{ headers });
  }
 

  delete(id: any): Observable<any> {
    const endpoint = `${this.apiUrl}/${id}`;
    const token = this.loginservice.gettoken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.delete<any>(endpoint,{ headers });
  }


}
