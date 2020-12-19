import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  constructor(private snackbar: MatSnackBar) {}

  success(message: string, action?: string): void {
    this.snackbar.open(message, action, {
      duration: 2000,
      panelClass: ['snackbar-success'],
    });
  }

  warning(message: string, action?: string): void {
    this.snackbar.open(message, action, {
      duration: 2000,
      panelClass: ['snackbar-warning'],
    });
  }

  error(message: string, action?: string): void {
    this.snackbar.open(message, action, {
      duration: 2000,
      panelClass: ['snackbar-error'],
    });
  }
}
