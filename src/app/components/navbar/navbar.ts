import { Component, signal } from "@angular/core";
import { RouterLink } from "@angular/router";

const icons: string[] = ["fas fa-bell", "fas fa-user", "fas fa-shopping-cart", "fas fa-tags"];

@Component({
  selector: "app-navbar",
  imports: [RouterLink],
  templateUrl: "./navbar.html",
  styleUrl: "./navbar.css"
})

export class Navbar
{
  icons = signal(icons);
}