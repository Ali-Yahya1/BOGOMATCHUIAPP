import { Component, ChangeDetectionStrategy } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Navbar } from "../navbar/navbar";
import { Footer } from "../footer/footer";

@Component({
  selector: "app-signin",
  imports: [RouterLink, Footer, Navbar],
  templateUrl: "./signin.html",
  styleUrl: "./signin.css",
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SignIn
{

}
