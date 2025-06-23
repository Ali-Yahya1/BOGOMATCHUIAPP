import { Component, ChangeDetectionStrategy } from "@angular/core";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NgClass } from "@angular/common";
import { Navbar } from "@components/navbar/navbar";
import { Footer } from "@components/footer/footer";

@Component({
  selector: "app-signin",
  imports: [RouterLink, Footer, Navbar, NgClass, FormsModule],
  templateUrl: "./signin.html",
  styleUrl: "./signin.css",
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SignIn
{
  type: string = "password";
  eyeIcon: string = "fa-eye-slash";
  isText: boolean = false;

  togglePasswordVisibility()
  {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  email: string = "";
  password: string = "";
}
