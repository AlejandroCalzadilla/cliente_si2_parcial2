import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { LoginService } from '../../auth/login/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
//import { Aula } from './Model/aula';
import { Facultad } from '../facultad/Model/Facultad';
import { Modulo } from '../Modulo/Model/modulo';
import { HorarioCreate } from './Model/horarioCreate';
import { HorarioGet } from './Model/horarioGet';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private apiUrl = environment.domain + '/horarios';
  private carrerasSubject = new BehaviorSubject<HorarioCreate[]>([]);
  carreras$ = this.carrerasSubject.asObservable(); 


  constructor(private http: HttpClient,private loginservice:LoginService) { }

  

  findAll(): Observable<HorarioCreate[]> {
    const endpoint = this.apiUrl;
    const token=this.loginservice.gettoken()
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    //return this.http.get(this.apiUrl, { headers });
    return this.http.get<HorarioCreate[]>(endpoint,{headers});
  } 
  findAllC(): Observable<HorarioGet[]> {
    const endpoint = this.apiUrl;
    const token=this.loginservice.gettoken()
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    //return this.http.get(this.apiUrl, { headers });
    return this.http.get<HorarioGet[]>(endpoint,{headers});
  }




  findCarreraById(id: string): Observable<HorarioGet> {
    const endpoint = `${this.apiUrl}/${id}`;
    const token = this.loginservice.gettoken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.get<HorarioGet>(endpoint, { headers });
  }
  
  

  Create(horario:any): Observable<HorarioCreate> {
    const Moduloid=localStorage.getItem('idmodulo')
    // console.log(docentes,'aver ahora')
     /* const registero={
      numero:Number(aula.numero),
      tipo:aula.tipo,
      capacidad:Number(aula.capacidad),
      modulo:{
          id:id
      }
      
     } */
     //console.log(registero,'dajdhsajdsadjkasdj')
   // console.log(carrera,'dasdnbsabdh')
    const horariomap=this.transformToHorarioCreate(horario) 
    console.log(horariomap,'horario terminado')
   const endpoint = `${this.apiUrl}`;
    const token = this.loginservice.gettoken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<HorarioCreate>(endpoint,horariomap,{ headers });
  }
 



  edit(carrera: any,id:number): Observable<HorarioCreate> {
    console.log('llego el id por aca',id ,carrera)
    const endpoint = `${this.apiUrl}/${id}`;
    const token = this.loginservice.gettoken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const horariomap=this.transformToHorarioCreate(carrera)
     
    return this.http.put<HorarioCreate>(endpoint, horariomap,{ headers });
  }
 

  delete(id: any): Observable<any> {
    const endpoint = `${this.apiUrl}/${id}`;
    const token = this.loginservice.gettoken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.delete<any>(endpoint,{ headers });
  }



  transformToHorarioCreate(formValue: any): HorarioCreate {
    return {
      dia: formValue.dia,
      horaInicio: `${formValue.horaInicio}:00`,
      horaFin: `${formValue.horaFin}:00`,
      aula: {
        id: formValue.aula
      },
      grupo: {
        id: formValue.grupo
      }
    };
  }






}
