import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public accountService: AccountService,
    public auth: AngularFireAuth
  ) {}

  ngOnInit(): void {}

  logout() {
    this.accountService.logout();
  }
}
