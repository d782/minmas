import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const authSvc=inject(AuthService);
  const router=inject(Router);
  const isAuth=authSvc.isAuth();
  if(isAuth){
    return true;
  }
  router.navigateByUrl("");
  return false;
};
