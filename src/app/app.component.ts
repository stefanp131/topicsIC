import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'topics-app';

  constructor(private accountService: AccountService, private auth: AngularFireAuth) {
    this.accountService.isAuthenticated = !!this.auth.currentUser;
  }
}

