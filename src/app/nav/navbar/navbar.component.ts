import { ThemingService } from './../../shared/services/theming.service';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isAuth: boolean;
  profilePhoto: string;

  selectedTheme: string;

  constructor(private authService: AuthService, private theme: ThemingService) {
    authService.user.subscribe((user) => {
      this.isAuth = !!user;
      this.profilePhoto = user.photoURL;
    });
  }

  ngOnInit(): void {
    this.theme.activeTheme.subscribe((theme) => {
      this.selectedTheme = theme;
    });
  }

  changeTheme(theme: string): void {
    this.theme.changeTheme(theme);
  }

  googleLogin(): void {
    this.authService.googleLogin();
  }

  logout(): void {
    this.authService.logout();
  }
}
