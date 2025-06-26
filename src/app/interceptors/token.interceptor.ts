import { inject, Injectable } from '@angular/core';
import
  {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
  } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { Router } from '@angular/router';
import { TokenApiModel } from '@app/models/token-api.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor
{

  private auth = inject(AuthService);
  private router = inject(Router);
  private toast = inject(HotToastService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>
  {
    const myToken = this.auth.getToken();
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
            this.toast.error('Token is expired, Please Login again');
            this.router.navigate(['/login']);
            //handle
            return this.handleUnAuthorizedError(request, next);
          }
        }
        return throwError(() => err);
      })
    );
  }
  handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler)
  {
    let tokeApiModel = new TokenApiModel();
    tokeApiModel.accessToken = this.auth.getToken()!;
    tokeApiModel.refreshToken = this.auth.getRefreshToken()!;
    return this.auth.renewToken(tokeApiModel)
      .pipe(
        switchMap((data: TokenApiModel) =>
        {
          this.auth.storeRefreshToken(data.refreshToken);
          this.auth.storeToken(data.accessToken);
          req = req.clone({
            setHeaders: { Authorization: `Bearer ${ data.accessToken }` }  // "Bearer "+myToken
          });
          return next.handle(req);
        }),
        catchError((err) =>
        {
          return throwError(() =>
          {
            this.toast.warning("Token is expired, Please Login again");
            this.router.navigate(['login']);
          });
        })
      );
  }
}
