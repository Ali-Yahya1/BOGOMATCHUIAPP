import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import type { LinkType } from "@models/types";

// First Links
const firstLinks: LinkType[] =
  [
    {
      name: "Home",
      icon: "",
      url: "/",
      selected: false
    },
    {
      name: "About Us",
      icon: "",
      url: "/about-us",
      selected: false
    },
    {
      name: "Deals",
      icon: "",
      url: "/deals",
      selected: false
    }
  ];

// Second Links
const secondLinks: LinkType[] =
  [
    {
      name: "Contact",
      icon: "",
      url: "/contact",
      selected: false
    },
    {
      name: "FAQs",
      icon: "",
      url: "/faqs",
      selected: false
    },
    {
      name: "Terms & Conditions",
      icon: "",
      url: "/terms-and-conditions",
      selected: false
    },
    {
      name: "Privacy Policy",
      icon: "",
      url: "/privacy-policy",
      selected: false
    }
  ];

// Third Links
const thirdLinks: LinkType[] =
  [
    {
      name: "Return Items",
      icon: "",
      url: "/return-items",
      selected: false
    },
    {
      name: "Eligible Items for Return",
      icon: "",
      url: "/eligible-items-for-return",
      selected: false
    },
    {
      name: "Become a patner",
      icon: "",
      url: "/become-a-patner",
      selected: false
    }
  ];

// Images
const images: string[] = ["./applepay.png", "./visa.png", "./discover.png", "./mastercard.png", "securePayment.png"];

@Component({
  selector: "app-footer",
  imports: [RouterLink],
  templateUrl: "./footer.html",
  styleUrl: "./footer.css"
})

export class Footer
{
  firstLinks = firstLinks;
  secondLinks = secondLinks;
  thirdLinks = thirdLinks;

  images = images;

  // Footer Year
  currentYear = new Date().getFullYear();
}
