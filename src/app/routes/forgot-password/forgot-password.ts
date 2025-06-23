import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { Navbar } from "@components/navbar/navbar";
import { Footer } from "@components/footer/footer";

@Component({
  selector: "app-forgot-password",
  imports: [RouterLink, Footer, Navbar, FormsModule],
  templateUrl: "./forgot-password.html",
  styleUrl: "./forgot-password.css"
})

export class ForgotPassword
{
  email: string = "";
}
