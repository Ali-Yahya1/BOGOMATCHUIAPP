import { Component, ChangeDetectionStrategy, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from "@angular/forms";
import { NgClass } from "@angular/common";
import { HotToastService } from "@ngxpert/hot-toast";
import { Navbar } from "@components/navbar/navbar";
import { Footer } from "@components/footer/footer";
import { AuthService } from "@services/auth.service";
import validateForm from "@lib/validateForm";

@Component({
  selector: "app-signup",
  imports: [RouterLink, NgClass, ReactiveFormsModule, Navbar, Footer],
  templateUrl: "./signup.html",
  styleUrl: "./signup.css",
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SignUp
{
  private router = inject(Router);
  private auth = inject(AuthService);
  private toaster = inject(HotToastService);

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
  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    secondName: new FormControl("", [Validators.required]),
    dob: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required])
  });

  // Validate
  validate(name: string): boolean
  {
    if (this.registerForm.get(name)?.touched && this.registerForm.get(name)?.invalid)
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
    if (this.registerForm.valid)
    {
      this.auth.signUp(this.registerForm.value)
        .subscribe({
          next: () =>
          {
            this.registerForm.reset();
            this.toaster.success("User account created successfully.");
            this.router.navigate(["signin"]);
          },
          error: () =>
          {
            this.toaster.error("Something went wrong. Please try again later.");
          }
        });
    }
    else
    {
      validateForm(this.registerForm);
    }
  }
}
