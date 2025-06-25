import { Component, inject } from "@angular/core";
import { NgClass } from "@angular/common";
import { AuthService } from "@services/auth.service";
import { UserStoreService } from "@services/userService.service";

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
    }
  ];

@Component({
  selector: "app-dashboard",
  imports: [NgClass],
  standalone: true,
  templateUrl: "./dashboard.html",
  styleUrl: "./dashboard.css"
})


export class Dashboard
{
  private auth = inject(AuthService);
  private userStore = inject(UserStoreService);
  name = "";

  // Sidebar & Dropdown
  sidebarOpen = false;
  isDropdownOpen = false;

  sidebarLinks = sidebarlinks;
  dropdownLinks = dropdownLinks;

  // Toggle Dropdown
  toggleDropdown()
  {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Close Dropdown
  closeDropdown(event: Event)
  {
    const target: HTMLElement = event.target as HTMLElement;
    const button: HTMLElement | null = document.getElementById("dropdown-button");
    const menu: HTMLElement | null = document.getElementById("dropdown-menu");

    if (button && menu && !button.contains(target) && !menu.contains(target))
    {
      this.isDropdownOpen = false;
    }
  }

  // Logout
  logout(): void
  {
    this.auth.signOut();
  }

  // On Mount
  ngOnInit()
  {
    window.addEventListener("click", this.closeDropdown.bind(this));

    this.userStore.getName().subscribe((val: string) =>
    {
      this.name = val;
    });
  }

  // On Destroy
  ngOnDestroy()
  {
    window.removeEventListener("click", this.closeDropdown.bind(this));
  }
}