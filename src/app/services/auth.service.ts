import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import type { Observable } from "rxjs";
import type { SignUpType, SignInType, TokenAPI } from "@models/types";

@Injectable({ providedIn: "root" })

export class AuthService
{
  private http = inject(HttpClient);
  private router = inject(Router);

  private baseURL: string = "https://localhost:7066/api/User";

  // Sign Up
  signUp(userObj: SignUpType): Observable<object>
  {
    return this.http.post<object>(`${ this.baseURL }/Register`, userObj);
  }

  // Sign In
  signIn(loginObj: SignInType): Observable<TokenAPI>
  {
    return this.http.post<TokenAPI>(`${ this.baseURL }/Login`, loginObj);
  }

  // Sign Out
  signOut(): void
  {
    localStorage.clear();
    this.router.navigate(["signin"]);
  }

  // Store Token
  storeToken(tokenValue: string): void
  {
    localStorage.setItem("token", tokenValue);
  }

  // Get Token
  getToken(): string | null
  {
    return localStorage.getItem("token");
  }

  // Store Refresh Token
  storeRefreshToken(tokenValue: string): void
  {
    localStorage.setItem("refreshToken", tokenValue);
  }

  // Get Refresh Token
  getRefreshToken(): string | null
  {
    return localStorage.getItem("refreshToken");
  }

  // Check Logged In
  isLoggedIn(): boolean
  {
    if (this.getToken())
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  // Decode Token
  decodeToken(): object | null
  {
    const token: string | null = this.getToken();

    if (token)
    {
      const jwtHelper: JwtHelperService = new JwtHelperService();

      try
      {
        return jwtHelper.decodeToken(token);
      }
      catch (error)
      {
        console.error("Invalid JWT token:", error);
        return null;
      }
    }

    return null;
  }

  // Renew Token
  renewToken(tokenAPI: TokenAPI): Observable<TokenAPI>
  {
    return this.http.post<TokenAPI>(`${ this.baseURL }/refresh`, tokenAPI);
  }
}