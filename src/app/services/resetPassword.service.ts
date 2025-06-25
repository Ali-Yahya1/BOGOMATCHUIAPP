import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import type { ResetPasswordAPI } from "@lib/types";

@Injectable({ providedIn: "root" })

export class ResetPasswordService
{
  private http = inject(HttpClient);

  private baseUrl: string = "https://localhost:7066/api/User";

  // Send Reset Password Link
  sendResetPasswordLink(email: string)
  {
    return this.http.post<any>(`${ this.baseUrl }/Send-Reset-Email/${ email }`, {});
  }

  // Reset Password Link
  resetPassword(resetPasswordObj)
  {
    return this.http.post<any>(`${ this.baseUrl }/Reset-Password/`, resetPasswordObj);
  }
}
