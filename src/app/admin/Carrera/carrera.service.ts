import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { LoginService } from '../../auth/login/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Carrera } from './Model/carrera';
import { Facultad } from '../facultad/Model/Facultad';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {
  private apiUrl = environment.domain + '/carreras';
  private carrerasSubject = new BehaviorSubject<Carrera[]>([]);
  carreras$ = this.carrerasSubject.asObservable(); 


  constructor(private http: HttpClient,private loginservice:LoginService) { }

  

  findAll(): Observable<Carrera[]> {
    const endpoint = this.apiUrl;
    const token=this.loginservice.gettoken()
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    //return this.http.get(this.apiUrl, { headers });
    return this.http.get<Carrera[]>(endpoint,{headers});
  } 




  findCarreraById(id: string): Observable<Carrera> {
    const endpoint = `${this.apiUrl}/${id}`;
    const token = this.loginservice.gettoken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.get<Carrera>(endpoint, { headers });
  }
  
  

  Create(carrera: Carrera,id:number): Observable<Carrera> {
    const facultadid=localStorage.getItem('idfacultad')
    // console.log(docentes,'aver ahora')
     const registero={
      nombre:carrera.nombre,
      codigo:Number(carrera.codigo),
      facultad:{
          id:id
      }
  
     }
     console.log(registero,'dajdhsajdsadjkasdj')
   // console.log(carrera,'dasdnbsabdh')
    const endpoint = `${this.apiUrl}`;
    const token = this.loginservice.gettoken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Carrera>(endpoint,registero,{ headers });
  }
 



  edit(carrera: any,id:number,idfacu:number): Observable<Carrera> {
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
     
    return this.http.put<Carrera>(endpoint, registero,{ headers });
  }
 

  delete(id: any): Observable<any> {
    const endpoint = `${this.apiUrl}/${id}`;
    const token = this.loginservice.gettoken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.delete<any>(endpoint,{ headers });
  }



 





}
