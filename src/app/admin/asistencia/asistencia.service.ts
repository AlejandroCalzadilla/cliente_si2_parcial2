import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { LoginService } from '../../auth/login/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
//import { Aula } from './Model/aula';
import { Facultad } from '../facultad/Model/Facultad';
import { Modulo } from '../Modulo/Model/modulo';
//import { GrupoCreate } from './Model/grupoCreate';
//import { HorarioCreate } from './Model/horarioCreate';
import { Carrera } from '../Carrera/Model/carrera';
import { GrupoCreate } from '../grupo/Model/grupoCreate';
import { GrupoGet } from '../grupo/Model/grupoGet';
import { AsistenciaGet } from './Model/asistenciaget';
//import { GrupoGet } from './Model/grupoGet';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  private apiUrl = environment.domain + '/asistencias';
  private carrerasSubject = new BehaviorSubject<GrupoCreate[]>([]);
  carreras$ = this.carrerasSubject.asObservable(); 


  constructor(private http: HttpClient,private loginservice:LoginService) { }

  

  findAll(): Observable<AsistenciaGet[]> {
    const endpoint = this.apiUrl;
    const token=this.loginservice.gettoken()
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    //return this.http.get(this.apiUrl, { headers });
    return this.http.get<AsistenciaGet[]>(endpoint,{headers});
  } 




  findCarreraById(id: string): Observable<GrupoGet> {
    const endpoint = `${this.apiUrl}/${id}`;
    const token = this.loginservice.gettoken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.get<GrupoGet>(endpoint, { headers });
  }
  
  

  Create(horario:any): Observable<GrupoCreate> {
    const Moduloid=localStorage.getItem('idmodulo')
    
   console.log('llego al services dasdashdas') 
   const horariomap=this.transformToHorarioCreate(horario) 
    console.log(horariomap,'horario terminado')
   const endpoint = `${this.apiUrl}`;
    const token = this.loginservice.gettoken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<GrupoCreate>(endpoint,horariomap,{ headers });
  }
 



  edit(carrera: any,id:number): Observable<GrupoCreate> {
    console.log('llego el id por aca',id ,carrera)
    const endpoint = `${this.apiUrl}/${id}`;
    const token = this.loginservice.gettoken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const registero=this.transformToHorarioCreate(carrera)
    return this.http.put<GrupoCreate>(endpoint, registero,{ headers });
  }
 

  delete(id: any): Observable<any> {
    const endpoint = `${this.apiUrl}/${id}`;
    const token = this.loginservice.gettoken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.delete<any>(endpoint,{ headers });
  }



  transformToHorarioCreate(formValue: any): GrupoCreate {
    return {
      nombre: formValue.nombre,
     
      carrera: {
        id:Number (formValue.carrera)
      },
      materia: {
        id: Number(formValue.materia)
      },
      profesor:{
        idProfesor:Number(formValue.docente)
      }
    };
  }
}