import { Component, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from "@angular/forms";
import { NgClass } from "@angular/common";
import { Navbar } from "@components/navbar/navbar";
import { Footer } from "@components/footer/footer";
import { AuthService } from "@services/auth.service";

@Component({
  selector: "app-forgot-password",
  imports: [RouterLink, NgClass, ReactiveFormsModule, Navbar, Footer],
  templateUrl: "./forgot-password.html",
  styleUrl: "./forgot-password.css"
})

export class ForgotPassword
{
  private router = inject(Router);
  private auth = inject(AuthService);

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

    }
  }
}
