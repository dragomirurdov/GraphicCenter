import { AuthService } from './auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'graphic-center';
  image: string;
  constructor(private authService: AuthService) {
    authService.initUser();
    this.authService.user.subscribe((user) => {
      this.image = user.photoURL;
    });
  }
}
