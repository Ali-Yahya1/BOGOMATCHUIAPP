import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { HotToastService } from "@ngxpert/hot-toast";

export const authGuard: CanActivateFn = (route, state): boolean =>
{
  const router: Router = inject(Router);
  const toaster: HotToastService = inject(HotToastService);

  if (localStorage.getItem("token"))
  {
    return true;
  }
  else
  {
    toaster.error("Access denied. Please log in first.");
    router.navigate(["/signin"], { queryParams: { returnUrl: state.url } });

    return false;
  }
};