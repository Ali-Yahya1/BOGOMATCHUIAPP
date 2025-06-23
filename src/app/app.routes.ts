import { Routes } from "@angular/router";
import { Home } from "@routes/home/home";
import { SignIn } from "@routes/signin/signin";
import { SignUp } from "@routes/signup/signup";
import { Dashboard } from "./routes/dashboard/dashboard";

export const routes: Routes =
  [
    { path: "", component: Home },
    { path: "signin", component: SignIn },
    { path: "signup", component: SignUp },
    { path: "dashboard", component: Dashboard }
  ];
