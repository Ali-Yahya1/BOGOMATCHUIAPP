import { Component, OnInit, inject } from "@angular/core";
import { Router } from "@angular/router";
import { HotToastService } from "@ngxpert/hot-toast";
import { AuthService } from "@services/auth.service";
import { UserStoreService } from "@services/userService.service";
import { Loader } from "@components/loader/loader";
import type { TokenAPI, GoogleTokenAPI } from "@models/types";

@Component({
  selector: "app-oauth",
  imports: [Loader],
  templateUrl: "./oauth.html",
  styleUrl: "./oauth.css"
})

export class OAuth implements OnInit
{
  private router = inject(Router);
  private auth = inject(AuthService);
  private userStore = inject(UserStoreService);
  private toaster = inject(HotToastService);

  // On Mount
  ngOnInit(): void
  {
    const fragment: string = window.location.hash.substring(1);
    const params: URLSearchParams = new URLSearchParams(fragment);
    const token: string | null = params.get("access_token");

    if (token)
    {
      const obj: GoogleTokenAPI = { googleAccessToken: token };

      this.auth.signInGoogle(obj)
        .subscribe({
          next: (res: TokenAPI) =>
          {
            this.auth.storeToken(res.accessToken);
            this.auth.storeRefreshToken(res.refreshToken);

            const tokenPayload: object | null = this.auth.decodeToken();

            if (tokenPayload)
            {
              const name: string = tokenPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]!;
              const role: string = tokenPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]!;

              this.userStore.setName(name);
              this.userStore.setRole(role);

              this.toaster.success("Signed in successfully");

              if (role === "Admin")
              {
                this.router.navigate(["dashboard"]);
              }
              else
              {
                this.router.navigate([""]);
              }
            }
          },
          error: () =>
          {
            this.toaster.error(`Authentication with Google OAuth failed.`);
            this.router.navigate(["signin"]);
          }
        });
    }
    else
    {
      this.router.navigate(["signin"]);
    }
  }
}
