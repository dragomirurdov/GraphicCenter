import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';

import { AuthService } from './auth/auth.service';

import { ThemingService } from './shared/services/theming.service';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'graphic-center';
  image: string;

  @HostBinding('class') public cssClass: string;

  private subs = new SubSink();

  constructor(
    private authService: AuthService,
    private themingService: ThemingService,
    private overlayContainer: OverlayContainer
  ) {
    authService.initUser();
    this.subs.add(
      this.authService.user.subscribe((user) => {
        this.image = user.photoURL;
      })
    );
  }

  ngOnInit(): void {
    this.themingService.theme.subscribe((theme: string) => {
      this.cssClass = theme;
      this.applyThemeOnOverlays();
    });
  }

  /**
   * Apply the current theme on components with overlay (e.g. Dropdowns, Dialogs)
   */
  private applyThemeOnOverlays() {
    // remove old theme class and add new theme class
    // we're removing any css class that contains '-theme' string but your theme classes can follow any pattern
    const overlayContainerClasses = this.overlayContainer.getContainerElement()
      .classList;
    const themeClassesToRemove = Array.from(this.themingService.themes);
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(this.cssClass);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
