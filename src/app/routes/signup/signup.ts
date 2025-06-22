import { Component, ChangeDetectionStrategy } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Navbar } from "@components/navbar/navbar";
import { Footer } from "@components/footer/footer";

@Component({
  selector: "app-signup",
  imports: [RouterLink, Footer, Navbar],
  templateUrl: "./signup.html",
  styleUrl: "./signup.css",
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SignUp
{

}
