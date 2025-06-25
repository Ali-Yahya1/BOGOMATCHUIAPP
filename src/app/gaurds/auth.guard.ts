import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';



export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toast = inject(HotToastService);

  const token  = !!localStorage.getItem('token'); 
  const isAuthenticated = !!token;

  if (isAuthenticated) {
    return true;
  } else {
    toast.error('Please Login First!');
    router.navigate(['/login'],{ queryParams: { returnUrl: state.url } });
    return false;
  }
};
