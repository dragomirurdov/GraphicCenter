import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { BehaviorSubject } from 'rxjs';

import { OverlayContainer } from '@angular/cdk/overlay';
import { MatIconRegistry } from '@angular/material/icon';

@Injectable({ providedIn: 'root' })
export class ThemingService {
  themes = ['light-theme', 'dark-theme', 'system-theme'];
  icons = ['google', 'facebook'];

  defaultTheme = localStorage.getItem('theme');
  activeTheme = new BehaviorSubject(
    this.defaultTheme ? this.defaultTheme : 'system-theme'
  );

  constructor(
    private domSanitizer: DomSanitizer,
    private overlayContainer: OverlayContainer,
    private iconRegistry: MatIconRegistry
  ) {
    this.registerIcons();
    this.changeOverlayTheme(this.defaultTheme);
  }

  changeTheme(theme: string): void {
    localStorage.setItem('theme', theme);
    this.activeTheme.next(theme);
    this.changeOverlayTheme(theme);
  }

  private changeOverlayTheme(theme: string): void {
    const overlayContainerClasses = this.overlayContainer.getContainerElement()
      .classList;
    const themeClassesToRemove = Array.from(this.themes);
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
