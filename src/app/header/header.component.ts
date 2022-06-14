import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  displayName: string;
  constructor(
    public accountService: AccountService,
    public auth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    

    this.auth.user.subscribe((data) => {
      this.displayName = data?.displayName;
    });
  }

  logout() {
    this.accountService.logout();
  }
}
