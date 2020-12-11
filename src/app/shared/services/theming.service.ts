import { ApplicationRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemingService {
  themes = ['dark-theme', 'light-theme'];
  chosenTheme = localStorage.getItem('theme');
  theme = new BehaviorSubject(
    this.chosenTheme || this.chosenTheme === 'system'
      ? this.chosenTheme
      : 'light-theme'
  );

  constructor(private ref: ApplicationRef) {
    // initially trigger dark mode if preference is set to dark mode on system
    if (this.chosenTheme === 'system') {
      const darkModeOn =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (darkModeOn) {
        this.theme.next('dark-theme');
      }
      // watch for changes of the preference
      window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
        console.log('Match media => ', e);
        const turnOn = e.matches;
        this.theme.next(turnOn ? 'dark-theme' : 'light-theme');

        // trigger refresh of UI
        this.ref.tick();
      });
    }
  }
}
