import { Component, OnInit, inject, signal } from "@angular/core";
import { Router, ActivatedRoute, type ParamMap } from "@angular/router";
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from "@angular/forms";
import { NgClass } from "@angular/common";
import { HotToastService } from "@ngxpert/hot-toast";
import { Navbar } from "@components/navbar/navbar";
import { Footer } from "@components/footer/footer";
import { Loader } from "@components/loader/loader";
import { ResetPasswordService } from "@services/resetPassword.service";
import validateForm from "@helpers/validateForm";
import type { ResetPasswordAPI } from "@models/types";

@Component({
  selector: "app-reset-password",
  imports: [NgClass, ReactiveFormsModule, Navbar, Footer, Loader],
  templateUrl: "./reset-password.html",
  styleUrl: "./reset-password.css"
})

export class ResetPassword implements OnInit
{
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private resetService = inject(ResetPasswordService);
  private toaster = inject(HotToastService);

  loading = signal(false);

  email: string | null = "";
  emailToken: string | null = "";

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

  // On Mount
  ngOnInit(): void
  {
    this.route.queryParamMap.subscribe((params: ParamMap) =>
    {
      this.email = params.get("email");
      this.emailToken = params.get("code");
    });
  }

  // Inputs
  theForm: FormGroup = new FormGroup({
    password: new FormControl("", [Validators.required]),
    repassword: new FormControl("", [Validators.required])
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
    if (this.theForm.valid && this.email && this.emailToken)
    {
      if (this.theForm.value["password"] === this.theForm.value["repassword"])
      {
        this.loading.set(true);

        const obj: ResetPasswordAPI =
        {
          email: this.email,
          emailToken: this.emailToken,
          newPassword: this.theForm.value["password"],
          confirmPassword: this.theForm.value["repassword"]
        };

        this.resetService.resetPassword(obj).subscribe(
          {
            next: () =>
            {
              this.toaster.success("Password reset successfully.");
              this.router.navigate(["signin"]);
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
        this.toaster.error("Passwords do not match.");
      }
    }
    else
    {
      validateForm(this.theForm);
    }
  }
}
