import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { LoginService } from '../../auth/login/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Aula } from './Model/aula';
import { Facultad } from '../facultad/Model/Facultad';
import { Modulo } from '../Modulo/Model/modulo';
import { AulaGet } from './Model/aulaGet';

@Injectable({
  providedIn: 'root'
})
export class AulaService {
  private apiUrl = environment.domain + '/aulas';
  private carrerasSubject = new BehaviorSubject<Aula[]>([]);
  carreras$ = this.carrerasSubject.asObservable(); 


  constructor(private http: HttpClient,private loginservice:LoginService) { }
 

  findAllC(): Observable<AulaGet[]> {
    const endpoint = this.apiUrl;
    const token=this.loginservice.gettoken()
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    //return this.http.get(this.apiUrl, { headers });
    return this.http.get<AulaGet[]>(endpoint,{headers});
  } 
  

  findAll(): Observable<Aula[]> {
    const endpoint = this.apiUrl;
    const token=this.loginservice.gettoken()
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    //return this.http.get(this.apiUrl, { headers });
    return this.http.get<Aula[]>(endpoint,{headers});
  } 




  findCarreraById(id: string): Observable<Aula> {
    const endpoint = `${this.apiUrl}/${id}`;
    const token = this.loginservice.gettoken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.get<Aula>(endpoint, { headers });
  }
  
  

  Create(aula: Aula,id:number): Observable<Aula> {
    const Moduloid=localStorage.getItem('idmodulo')
    // console.log(docentes,'aver ahora')
     const registero={
      numero:Number(aula.numero),
      tipo:aula.tipo,
      capacidad:Number(aula.capacidad),
      modulo:{
          id:id
      }
      
     }
     console.log(registero,'dajdhsajdsadjkasdj')
   // console.log(carrera,'dasdnbsabdh')
    const endpoint = `${this.apiUrl}`;
    const token = this.loginservice.gettoken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Aula>(endpoint,registero,{ headers });
  }
 



  edit(carrera: any,id:number,idfacu:number): Observable<Aula> {
    console.log('llego el id por aca',id ,carrera)
    const endpoint = `${this.apiUrl}/${id}`;
    const token = this.loginservice.gettoken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const registero={
      nombre:carrera.nombre,
      codigo:Number(carrera.codigo),
      facultad:{
          id:idfacu
      }
  
     } 
     
    return this.http.put<Aula>(endpoint, registero,{ headers });
  }
 

  delete(id: any): Observable<any> {
    const endpoint = `${this.apiUrl}/${id}`;
    const token = this.loginservice.gettoken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.delete<any>(endpoint,{ headers });
  }



 





}
