import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { resetPassword } from '@app/Models/reset-password.model';


@Injectable({
  providedIn: 'root'
})
export class ResetpasswordService {

  private baseUrl: string ="https://localhost:7066/api/User"
  constructor(private http:HttpClient) { }

  sendResetPasswordLink(email:string){
   return this.http.post<any>(`${this.baseUrl}/send-reset-email/${email}`,{});
  }
   
  resetPassword(resetPasswordObj: resetPassword){
    return this.http.post<any>(`${this.baseUrl}/reset-password/`, resetPasswordObj);
  }

}
