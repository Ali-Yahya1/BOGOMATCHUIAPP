import { Component, ChangeDetectionStrategy, inject, signal } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from "@angular/forms";
import { NgClass } from "@angular/common";
import { HotToastService } from "@ngxpert/hot-toast";
import { Navbar } from "@components/navbar/navbar";
import { Footer } from "@components/footer/footer";
import { AuthService } from "@services/auth.service";
import { UserStoreService } from "@services/userService.service";
import { Loader } from "@components/loader/loader";
import validateForm from "@helpers/validateForm";
import type { TokenAPI } from "@models/types";

@Component({
  selector: "app-signin",
  imports: [RouterLink, NgClass, ReactiveFormsModule, Navbar, Footer, Loader],
  templateUrl: "./signin.html",
  styleUrl: "./signin.css",
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SignIn
{
  private router = inject(Router);
  private auth = inject(AuthService);
  private userStore = inject(UserStoreService);
  private toaster = inject(HotToastService);

  loading = signal(false);

  // Password Eye
  type: string = "password";
  eyeIcon: string = "fa-eye-slash";
  isText: boolean = false;

  // Password Eye Toggler
  togglePasswordVisibility(): void
  {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  // Inputs
  loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(5)])
  });

  // Validate
  validate(name: string): boolean
  {
    if (this.loginForm.get(name)?.touched && this.loginForm.get(name)?.invalid)
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  // On Submit
  onSubmit(): void
  {
    if (this.loginForm.valid)
    {
      this.loading.set(true);

      this.auth.signIn(this.loginForm.value)
        .subscribe({
          next: (res: TokenAPI) =>
          {
            this.loginForm.reset();
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
            this.loading.set(false);
            this.toaster.error("Something went wrong. Please try again later.");
          }
        });
    }
    else
    {
      validateForm(this.loginForm);
    }
  }

  // Handle Google Login
  handleGoogleLogin(): void
  {
    const clientId: string = "537360055994-o35srlpeqtilnsigned5ovgah01geegb.apps.googleusercontent.com";
    const redirectURI: string = "http://localhost:4200/oauth";

    const url: string = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${ clientId }` +
      `&redirect_uri=${ encodeURIComponent(redirectURI) }` +
      `&response_type=token` +
      `&scope=openid%20email%20profile` +
      `&include_granted_scopes=true` +
      `&state=secure_random_state_string`;

    window.location.href = url;
  }
}
