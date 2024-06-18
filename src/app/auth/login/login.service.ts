import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { User } from '../dto/user.dto';
import { OdooConfig} from '../login/user2';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
   token='';
   tokenkey='token_key';
   private apiUrl = environment.domain + '/login';
     

  constructor(private http: HttpClient,private cookieService: CookieService) {
   }

  

   

   

    Login(credentials:User):Observable<User>{
    
    const endpoint="http://18.218.118.43/login"
    return this.http.post<User>(endpoint,credentials).pipe(
      tap((userData: User) => {  
        localStorage.setItem('token_key',userData.token!)
      }),
     )
    } 
     
    gettoken(){
     return localStorage.getItem('token_key') || ''
    }

   

    


   logout() {
    // Limpiar el token y los datos del usuario al cerrar sesión
      this.token ='';
      localStorage.removeItem(this.tokenkey);
    }


    
  
 

 

  private handledError(error: HttpErrorResponse): Observable<any> {

      // let errorMessage = error.error.message ? error.error.message[0] : 'Error desconocido';
      //let errorMessage = error.error.message ? error.error: 'Error desconocido';
      //console.log('aver que paso ',errorMessage)
      return throwError(() => new Error(error.error));
    
  }





  
 
}
