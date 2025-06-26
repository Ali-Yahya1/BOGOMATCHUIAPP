import { Component, Input } from "@angular/core";

@Component({
  selector: "app-loader",
  imports: [],
  templateUrl: "./loader.html",
  styleUrl: "./loader.css"
})

export class Loader
{
  @Input() show: boolean = false;
}
