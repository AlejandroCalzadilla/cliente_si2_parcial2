import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../auth/login/login.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const token =inject(LoginService)
  const router = inject(Router)
  /* if(token.userRol==='admin'){
    console.log('entro a damin o nada')
    return true
  } */

  console.log('nega paso aca')
   router.navigateByUrl('dashboard')
  //console.log(token.tokef(),'prueba')
  return false ;
};
