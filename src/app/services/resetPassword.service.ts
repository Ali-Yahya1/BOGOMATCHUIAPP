import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { resetPassword } from '@app/Models/reset-password.model';


@Injectable({
  providedIn: 'root'
})

export class ResetPasswordService
{
  private http = inject(HttpClient);
  private baseUrl: string = "https://localhost:7066/api/User";

  sendResetPasswordLink(email: string)
  {
    return this.http.post<any>(`${ this.baseUrl }/SendResetEmail/${ email }`, {});
  }

  resetPassword(resetPasswordObj: resetPassword)
  {
    return this.http.post<any>(`${ this.baseUrl }/ResetPassword/`, resetPasswordObj);
  }

}
