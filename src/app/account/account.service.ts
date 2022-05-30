import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private auth: AngularFireAuth, private router: Router) {}
  isAuthenticated = false;

  public login(user: User) {
    this.auth
      .signInWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        console.log(result);
        this.isAuthenticated = true;
        this.router.navigate(['']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public logout() {
    this.auth
      .signOut()
      .then((result) => {
        console.log(result);
        this.isAuthenticated = false;
        this.router.navigate(['login']);
      })
      .catch((err) => {
        console.log(err);
      });
    this.router.navigate(['login']);
  }

  public register(user: User) {
    this.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        console.log(result);
        this.isAuthenticated = true;
        this.router.navigate(['']);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
