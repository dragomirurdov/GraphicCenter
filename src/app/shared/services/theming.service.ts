import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { BehaviorSubject } from 'rxjs';

import { OverlayContainer } from '@angular/cdk/overlay';
import { MatIconRegistry } from '@angular/material/icon';

@Injectable({ providedIn: 'root' })
export class ThemingService {
  themes = ['light-theme', 'dark-theme', 'system-theme'];
  icons = ['google', 'facebook'];

  activeTheme: BehaviorSubject<string>;

  constructor(
    private domSanitizer: DomSanitizer,
    private overlayContainer: OverlayContainer,
    private iconRegistry: MatIconRegistry,
    private configService: ConfigService
  ) {
    let defaultTheme = 'light-theme';
    if (configService.isBrowser) {
      defaultTheme = localStorage.getItem('theme') || 'system-theme';
    }
    this.activeTheme = new BehaviorSubject(defaultTheme);
    this.changeOverlayTheme(this.activeTheme.value);
    this.registerIcons();
  }

  changeTheme(theme: string): void {
    if (this.configService.isServer && theme === 'system-theme') {
      return;
    }
    localStorage.setItem('theme', theme);
    this.activeTheme.next(theme);
    this.changeOverlayTheme(theme);
  }

  private changeOverlayTheme(theme: string): void {
    const overlayContainerClasses = this.overlayContainer.getContainerElement()
      .classList;
    const themeClassesToRemove = this.themes;
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(theme);
  }

  private registerIcons(): void {
    this.icons.forEach((icon) => {
      this.iconRegistry.addSvgIcon(
        icon,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          `assets/icons/${icon}.svg`
        )
      );
    });
  }
}
