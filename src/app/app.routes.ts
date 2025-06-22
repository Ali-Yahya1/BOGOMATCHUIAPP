import { Routes } from "@angular/router";
import { SignIn } from "./signin/signin";
import { SignUp } from "./signup/signup";

export const routes: Routes =
  [
    { path: "", component: SignIn },
    { path: "signin", component: SignIn },
    { path: "signup", component: SignUp }
  ];
