import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from "@angular/common/http";
import { HotToastService } from "@ngxpert/hot-toast";
import { Observable, switchMap, throwError, catchError } from "rxjs";
import { AuthService } from "@services/auth.service";
import type { TokenAPI } from "@models/types";

@Injectable()
export class TokenInterceptor implements HttpInterceptor
{
  private router = inject(Router);
  private toast = inject(HotToastService);
  private auth = inject(AuthService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>
  {
    const myToken: string | null = this.auth.getToken();

    if (myToken)
    {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${ myToken }` }
      });
    }

    return next.handle(request).pipe(
      catchError((err: any) =>
      {
        if (err instanceof HttpErrorResponse)
        {
          if (err.status === 401)
          {
            this.toast.error("Your session has expired. Please log in again.");
            this.router.navigate(["signin"]);

            return this.handleUnAuthorizedError(request, next);
          }
        }

        return throwError(() => err);
      })
    );
  }

  handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler)
  {
    let tokeApiModel: TokenAPI = { accessToken: "", refreshToken: "" };

    tokeApiModel.accessToken = this.auth.getToken()!;
    tokeApiModel.refreshToken = this.auth.getRefreshToken()!;

    return this.auth.renewToken(tokeApiModel)
      .pipe(
        switchMap((data: TokenAPI) =>
        {
          this.auth.storeRefreshToken(data.refreshToken);
          this.auth.storeToken(data.accessToken);

          req = req.clone({
            setHeaders: { Authorization: `Bearer ${ data.accessToken }` }
          });

          return next.handle(req);
        }),
        catchError(() =>
        {
          return throwError(() =>
          {
            this.toast.warning("Your session has expired. Please log in again.");
            this.router.navigate(["signin"]);
          });
        })
      );
  }
}