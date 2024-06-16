import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../../auth/login/login.service';
import { Materia } from './Models/materia';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {
   
  private apiUrl = environment.domain + '/materia';
  constructor(private http: HttpClient,private loginservice:LoginService) { }



  findAll(): Observable<Materia[]> {
    const endpoint = this.apiUrl;
    const token=this.loginservice.gettoken()
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    //return this.http.get(this.apiUrl, { headers });
    return this.http.get<Materia[]>(endpoint,{headers});
  } 

  findDocenteById(id: string): Observable<Materia> {
    const endpoint = `${this.apiUrl}/${id}`;
    const token = this.loginservice.gettoken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.get<Materia>(endpoint, { headers });
  }
  
  

  Create(modulo: any): Observable<Materia> {
    
    // console.log(docentes,'aver ahora')
    const endpoint = `${this.apiUrl}`;
    const token = this.loginservice.gettoken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.post<Materia>(endpoint, modulo,{ headers });
  }
 



  edit(facultad: any,id:any): Observable<Materia> {
    const endpoint = `${this.apiUrl}/${id}`;
    const token = this.loginservice.gettoken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.put<Materia>(endpoint, facultad,{ headers });
  }
 

  delete(id: any): Observable<any> {
    const endpoint = `${this.apiUrl}/${id}`;
    const token = this.loginservice.gettoken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.delete<any>(endpoint,{ headers });
  }
}
