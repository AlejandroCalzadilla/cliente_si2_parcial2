import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../../auth/login/login.service';
import { Modulo } from './Model/modulo';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {

  private apiUrl = environment.domain + '/modulo';
  constructor(private http: HttpClient,private loginservice:LoginService) { }



  findAll(): Observable<Modulo[]> {
    const endpoint = this.apiUrl;
    const token=this.loginservice.gettoken()
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    //return this.http.get(this.apiUrl, { headers });
    return this.http.get<Modulo[]>(endpoint,{headers});
  } 

  findDocenteById(id: string): Observable<Modulo> {
    const endpoint = `${this.apiUrl}/${id}`;
    const token = this.loginservice.gettoken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.get<Modulo>(endpoint, { headers });
  }
  
  

  Create(modulo: any): Observable<Modulo> {
    
    // console.log(docentes,'aver ahora')
    const endpoint = `${this.apiUrl}`;
    const token = this.loginservice.gettoken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.post<Modulo>(endpoint, modulo,{ headers });
  }
 



  edit(facultad: any,id:any): Observable<Modulo> {
    const endpoint = `${this.apiUrl}/${id}`;
    const token = this.loginservice.gettoken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.put<Modulo>(endpoint, facultad,{ headers });
  }
 

  delete(id: any): Observable<any> {
    const endpoint = `${this.apiUrl}/${id}`;
    const token = this.loginservice.gettoken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.delete<any>(endpoint,{ headers });
  }
}
