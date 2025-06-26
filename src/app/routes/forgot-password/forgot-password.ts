import { Component, inject, signal } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from "@angular/forms";
import { NgClass } from "@angular/common";
import { HotToastService } from "@ngxpert/hot-toast";
import { Navbar } from "@components/navbar/navbar";
import { Footer } from "@components/footer/footer";
import { Loader } from "@components/loader/loader";
import { ResetPasswordService } from "@services/resetPassword.service";
import validateForm from "@helpers/validateForm";

@Component({
  selector: "app-forgot-password",
  imports: [RouterLink, NgClass, ReactiveFormsModule, Navbar, Footer, Loader],
  templateUrl: "./forgot-password.html",
  styleUrl: "./forgot-password.css"
})

export class ForgotPassword
{
  private router = inject(Router);
  private resetService = inject(ResetPasswordService);
  private toaster = inject(HotToastService);

  loading = signal(false);

  // Inputs
  theForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email])
  });

  // Validate
  validate(name: string): boolean
  {
    if (this.theForm.get(name)?.touched && this.theForm.get(name)?.invalid)
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
    if (this.theForm.valid)
    {
      this.loading.set(true);

      this.resetService.sendResetPasswordLink(this.theForm.value["email"]).subscribe(
        {
          next: () =>
          {
            this.toaster.success("We've sent a password reset email to your account. Please check your inbox.");
            this.router.navigate(["signin"]);
          },
          error: () =>
          {
            this.loading.set(false);
            this.toaster.error("Something went wrong. Please try again later.");
          }
        }
      );
    }
    else
    {
      validateForm(this.theForm);
    }
  }
}
