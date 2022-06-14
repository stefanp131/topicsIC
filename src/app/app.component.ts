import { Component } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { first, tap } from 'rxjs';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'topics-app';

  constructor(
    private accountService: AccountService,
    private auth: AngularFireAuth
  ) {

    //check if user is already logged in in firebase
    this.auth.authState
      .pipe(
        first(),
        tap((user) => {
          console.log(!!user);
          this.accountService.isAuthenticated.next(!!user);
        })
      )
      .subscribe();
  }
}
