import { Routes } from "@angular/router";
import { Home } from "@routes/home/home";
import { SignIn } from "@routes/signin/signin";
import { SignUp } from "@routes/signup/signup";
import { Dashboard } from "@routes/dashboard/dashboard";
import { ForgotPassword } from "@routes/forgot-password/forgot-password";
import { ResetPassword } from "@routes/reset-password/reset-password";

export const routes: Routes =
  [
    { path: "", component: Home },
    { path: "signin", component: SignIn },
    { path: "signup", component: SignUp },
    { path: "dashboard", component: Dashboard },
    { path: "forgot-password", component: ForgotPassword },
    { path: "reset-password", component: ResetPassword }
  ];
