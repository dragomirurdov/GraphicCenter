import { AuthService } from './../../auth/auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  sidenavToggle: boolean;
  isAuth: boolean;
  profilePhoto: string;

  @Output() toggleDrawer = new EventEmitter<void>();

  constructor(private authService: AuthService) {
    authService.user.subscribe((user) => {
      this.isAuth = !!user;
      this.profilePhoto = user.photoURL;
    });
  }

  ngOnInit(): void {}

  openSidenav(): void {
    this.sidenavToggle = true;
  }

  googleLogin() {
    this.authService.googleLogin();
  }

  logout() {
    this.authService.logout();
  }
}
