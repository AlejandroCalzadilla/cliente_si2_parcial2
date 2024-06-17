import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../auth/login/login.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const token =inject(LoginService)
  const router = inject(Router)
  if(token.gettoken()){
    return true
  }
   router.navigateByUrl('')
  //console.log(token.tokef(),'prueba')
  return false ;
};
