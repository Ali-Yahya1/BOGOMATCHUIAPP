import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { Navbar } from "@components/navbar/navbar";
import { Footer } from "@components/footer/footer";

@Component({
  selector: "app-reset-password",
  imports: [RouterLink, Footer, Navbar, FormsModule],
  templateUrl: "./reset-password.html",
  styleUrl: "./reset-password.css"
})

export class ResetPassword
{
  password: string = "";
  rePassword: string = "";
}
