import { Component, signal } from "@angular/core";
import { RouterLink } from "@angular/router";

// Links
interface Link
{
  name: string;
  url: string;
}

const fisrtLinks: Link[] =
  [
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about" },
    { name: "Deals", url: "/deals" }
  ];

const secondLinks: Link[] =
  [
    { name: "Contact", url: "/contact" },
    { name: "FAQs", url: "/faqs" },
    { name: "Terms & Conditions", url: "/terms" },
    { name: "Privacy Policy", url: "/privacy" }
  ];

const thirdLinks: Link[] =
  [
    { name: "Return Items", url: "/return" },
    { name: "Eligible Items for Return", url: "/eligible" },
    { name: "Become a patner", url: "/patners" }
  ];

const images: string[] = ["./applepay.png", "./visa.png", "./discover.png", "./mastercard.png", "securePayment.png"];

@Component({
  selector: "app-footer",
  imports: [RouterLink],
  templateUrl: "./footer.html",
  styleUrl: "./footer.css"
})

export class Footer
{
  firstLinks = signal(fisrtLinks);
  secondLinks = signal(secondLinks);
  thirdLinks = signal(thirdLinks);

  images = signal(images);

  // Footer Year
  currentYear = new Date().getFullYear();
}
