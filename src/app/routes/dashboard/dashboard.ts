import { Component, signal } from "@angular/core";
import { NgClass } from "@angular/common";

// Link Interface
interface Link
{
  name: string;
  icon: string;
  url: string;
  selected: boolean;
}

// Dashboard Links
const links: Link[] =
  [
    {
      name: "Dashboard",
      icon: "tachometer-alt",
      url: "/dashboard",
      selected: true
    },
    {
      name: "Items",
      icon: "boxes",
      url: "/dashboard",
      selected: false
    },
    {
      name: "Sales",
      icon: "chart-line",
      url: "/dashboard",
      selected: false
    }
  ];

@Component({
  selector: "app-dashboard",
  imports: [NgClass],
  templateUrl: "./dashboard.html",
  styleUrl: "./dashboard.css"
})

export class Dashboard
{
  sidebarOpen = false;
  isDropdownOpen = false;

  links = signal(links);

  toggleDropdown()
  {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(event: Event)
  {
    const target = event.target as HTMLElement;
    const button = document.getElementById("dropdown-button");
    const menu = document.getElementById("dropdown-menu");
    if (button && menu && !button.contains(target) && !menu.contains(target))
    {
      this.isDropdownOpen = false;
    }
  }

  ngOnInit()
  {
    window.addEventListener("click", this.closeDropdown.bind(this));
  }
  ngOnDestroy()
  {
    window.removeEventListener("click", this.closeDropdown.bind(this));
  }
}
