import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import type { Observable } from "rxjs";
import type { SignUpType, SignInType, TokenAPI, Token } from "@lib/types";

@Injectable({ providedIn: "root" })

export class AuthService
{
  private http = inject(HttpClient);
  private router = inject(Router);
  private jwtHelper = new JwtHelperService();

  private baseURL: string = "https://localhost:7066/api/User";

  // Sign Up
  signUp(userObj: SignUpType): Observable<Object>
  {
    return this.http.post<Object>(`${ this.baseURL }/Register`, userObj);
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

  // Refresh Token
  refreshToken(tokenAPI: string): Observable<Object>
  {
    return this.http.post<Object>(`${ this.baseURL }/refreshtoken`, tokenAPI);
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
  decodeToken() {
    const token = this.getToken();
    if (token) {
      const jwtHelper = new JwtHelperService();
      try {
        return jwtHelper.decodeToken(token);
      } catch (error) {
        console.error('Invalid JWT token:', error);
        return null;
      }
    }
    return null;
  }

  // Get Name
  getName(): string | null
  {
    const decoded: Token | null = this.decodeToken();

    return decoded ? decoded.Name : null;
  }

  // Get Role
  getRole(): string | null
  {
    const decoded: Token | null = this.decodeToken();

    return decoded ? decoded.Role : null;
  }
}