import { Component, ChangeDetectionStrategy, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from "@angular/forms";
import { NgClass } from "@angular/common";
import { Navbar } from "@components/navbar/navbar";
import { Footer } from "@components/footer/footer";
import { AuthService } from "@services/auth.service";
import { UserStoreService } from "@services/userService.service";
import ValidateForm from "@app/Helper/ValidateForm";

@Component({
  selector: "app-signin",
  imports: [RouterLink, NgClass, ReactiveFormsModule, Navbar, Footer],
  templateUrl: "./signin.html",
  styleUrl: "./signin.css",
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SignIn
{
  private router = inject(Router);
  private auth = inject(AuthService);
  private userStore = inject(UserStoreService);

  // Password Eye
  type: string = "password";
  eyeIcon: string = "fa-eye-slash";
  isText: boolean = false;

  // Password Eye Toggler
  togglePasswordVisibility(): void
  {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  // Inputs
  loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(5)])
  });

  // Validate
  validate(name: string): boolean
  {
    if (this.loginForm.get(name)?.touched && this.loginForm.get(name)?.invalid)
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  // On Submit
  onSubmit(): void
  {
    if (this.loginForm.valid)
    {
      this.auth.signIn(this.loginForm.value)
        .subscribe({
          next: (res) =>
          {
            this.loginForm.reset();
            this.auth.storeToken(res.accessToken);
            this.auth.refreshToken(res.refreshToken);
            const tokenPayload  = this.auth.decodeToken();
            this.userStore.setName(tokenPayload.Name);
            this.userStore.setRole(tokenPayload.Role);
            //this.toast.success("You have successfully loggedIn", "SUCCESS");
            console.log(tokenPayload);
            const name = tokenPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
            const role = tokenPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            this.userStore.setName(name);
            this.userStore.setRole(role);
            if(role === "Admin"){
               this.router.navigate(['dashboard']);   
            }
            else{
             this.router.navigate(['']);   
            }
         },
        error:(err) => {
          //this.toast.error("Something went wrong? please try again", "ERROR");
        }
      })
    }
    else{
      ValidateForm.validateAllFormFields(this.loginForm);
      console.log("this is not valid");
    }}
}
