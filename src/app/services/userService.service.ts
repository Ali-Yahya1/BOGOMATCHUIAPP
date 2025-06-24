import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: "root" })

export class UserStoreService
{
  private name$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");

  // Get Name
  getName(): Observable<string>
  {
    return this.name$.asObservable();
  }

  // Set Name
  setName(name:string){
    this.name$.next(name);
  }

  // Get Role
  getRole(): Observable<string>
  {
    return this.role$.asObservable();
  }

  // Set Role
  setRole(role: string)
  {
    this.role$.next(role);
  }
}