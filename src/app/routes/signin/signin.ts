import { Component, ChangeDetectionStrategy, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from "@angular/forms";
import { NgClass } from "@angular/common";
import { Navbar } from "@components/navbar/navbar";
import { Footer } from "@components/footer/footer";
import { AuthService } from "@services/auth.service";

@Component({
  selector: "app-signin",
  imports: [RouterLink, NgClass, ReactiveFormsModule, Navbar, Footer],
  templateUrl: "./signin.html",
  styleUrl: "./signin.css",
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SignIn
{
  private router = inject(Router);
  private auth = inject(AuthService);

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
      this.auth.signIn(this.loginForm.value)
        .subscribe({
          next: (res) =>
          {
            this.loginForm.reset();
            this.auth.storeToken(res.accessToken);
            this.auth.refreshToken(res.refreshToken);

            const role: string | null = this.auth.getRole();

            if (role && role === "Admin")
            {
              this.router.navigate(["dashboard"]);
            }
            else if (role && role === "Guest")
            {
              this.router.navigate([""]);
            }
          },
          error: (err) =>
          {
            console.log(err);
          }
        });
    }
  }
}
