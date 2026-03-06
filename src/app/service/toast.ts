import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}
  success(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }
  error(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 10000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: 'error-snackbar',
    });
  }
}
