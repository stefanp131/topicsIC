import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  isAuthenticated$: Observable<boolean>;
  displayName: string;

  constructor(private auth: AngularFireAuth, private router: Router) {
    this.isAuthenticated$ = this.isAuthenticated.asObservable();
  }

  public login(user: User) {
    this.auth
      .signInWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        console.log(result);
        this.displayName = result.user.displayName;
        this.isAuthenticated.next(true);
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
        this.isAuthenticated.next(false);
        this.displayName = '';
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
        result.user.updateProfile({ displayName: user.displayName });
        this.displayName = user.displayName;
        this.isAuthenticated.next(true);
        this.router.navigate(['']);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
