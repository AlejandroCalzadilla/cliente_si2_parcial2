
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { User } from '../dto/user.dto';
import { OdooConfig} from '../login/user2';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment.development';

import { map, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class OdooService{
  
   

  



} 