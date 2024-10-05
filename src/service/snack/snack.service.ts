import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackService {

  constructor(private snack: MatSnackBar) { }

  showMessage(msg: string, isError: boolean = false, time:number = 16000): void {

      this.snack.open(msg, "X", {
        duration: time,
        horizontalPosition: "right",
        verticalPosition: "top",
        panelClass: isError ? ["msg-error"] : ["msg-success"],
      });
  }
}
