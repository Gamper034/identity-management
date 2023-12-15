// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

export const AuthGuard = () => {
  const router = inject(Router);

  if(! AuthenticationService.isLoggedIn()) {
    router.navigate(['/login']).then((e) => {
      if (!e){
        console.error('Navigation has failed !');
      }
    });
    return false;
    
  }
  return true;
}