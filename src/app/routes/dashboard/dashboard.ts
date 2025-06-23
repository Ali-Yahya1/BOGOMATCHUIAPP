import { Component } from "@angular/core";
import { NgClass } from "@angular/common";

// Link Interface
interface Link
{
  name: string;
  icon: string;
  url: string;
  selected: boolean;
}

// Sidebar Links
const sidebarlinks: Link[] =
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

// Dropdown Links
const dropdownLinks: Link[] =
  [
    {
      name: "Edit Profile",
      icon: "user-edit",
      url: "/edit-profile",
      selected: false
    },
    {
      name: "View Profile",
      icon: "id-badge",
      url: "/profile",
      selected: false
    },
    {
      name: "Logout",
      icon: "sign-out-alt",
      url: "/logout",
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

  sidebarLinks = sidebarlinks;
  dropdownLinks = dropdownLinks;

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
