import { Component, inject, OnInit } from "@angular/core";
import { Router, RouterLink, ActivatedRoute } from "@angular/router";
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from "@angular/forms";
import { NgClass } from "@angular/common";
import { Navbar } from "@components/navbar/navbar";
import { Footer } from "@components/footer/footer";
import { ResetPasswordService } from "@services/resetPassword.service";
import type { ResetPasswordAPI } from "@lib/types";

@Component({
  selector: "app-reset-password",
  imports: [RouterLink, NgClass, ReactiveFormsModule, Navbar, Footer],
  templateUrl: "./reset-password.html",
  styleUrl: "./reset-password.css"
})

export class ResetPassword implements OnInit
{
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private resetService = inject(ResetPasswordService);

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
    this.route.queryParamMap.subscribe((params) =>
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
    if (this.theForm.valid && this.theForm.value["password"] === this.theForm.value["repassword"] && this.email && this.emailToken)
    {
      const obj: ResetPasswordAPI =
      {
        email: this.email,
        emailToken: this.emailToken,
        newPassword: this.theForm.value["password"],
        confirmPassword: this.theForm.value["repassword"]
      };

      this.resetService.resetPassword(obj).subscribe(
        {
          next: (res) =>
          {
            // Toast Success Message Here
            this.router.navigate(["signin"]);
          },
          error: (err) =>
          {
            console.log("Error");
          }
        });
    }
  }
}
