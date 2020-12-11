import { ThemingService } from './../../shared/services/theming.service';
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

  constructor(
    private authService: AuthService,
    private themingService: ThemingService
  ) {
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

  changeTheme(theme: string) {
    localStorage.setItem('theme', theme);
    if (theme === 'system') {
      const darkModeOn =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (darkModeOn) {
        this.themingService.theme.next('dark-theme');
      } else {
        this.themingService.theme.next('light-theme');
      }
      return;
    } else {
      this.themingService.theme.next(theme);
    }
  }
}
