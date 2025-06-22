import { Component, ChangeDetectionStrategy } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Navbar } from "@components/navbar/navbar";
import { Footer } from "@components/footer/footer";
import { NgClass } from "@angular/common";

@Component({
  selector: "app-signup",
  imports: [RouterLink, Footer, Navbar, NgClass],
  templateUrl: "./signup.html",
  styleUrl: "./signup.css",
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SignUp
{
  type: string = 'password';
  eyeIcon: string = 'fa-eye-slash';
  isText: boolean = false;

  togglePasswordVisibility()
  {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

}
