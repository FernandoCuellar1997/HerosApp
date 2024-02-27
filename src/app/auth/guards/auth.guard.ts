import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, map, tap } from 'rxjs';
import { inject } from '@angular/core';

const checkAuthStatus=():Observable<boolean>=>{
  const authService=inject(AuthService);
  const router=inject(Router);
  return authService.checkAuthentication()
  .pipe(
    tap( isAutenticated=>{
      if(!isAutenticated){
        router.navigate(['./auth/login'])
      }else{
        router.navigate(['./'])
      }
    }),
    map(isAutenticated=>!isAutenticated),
  );
}


export const canActivadedGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
  ) => {
    return checkAuthStatus();

}

export const canMatchGuard: CanMatchFn=(
  route: Route,
  segments:UrlSegment[]
)=>{
  return checkAuthStatus();
}


