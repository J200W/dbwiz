import {Component, inject, model} from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef, MatDialogTitle
} from "@angular/material/dialog";
import {DialogData} from "../../interfaces/dialog-data.interface";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-logout-dialog',
    imports: [
        MatDialogContent,
        MatDialogActions,
        MatButton,
        MatDialogTitle
    ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
    readonly dialogRef = inject(MatDialogRef<DialogComponent>);
    readonly data = inject<DialogData>(MAT_DIALOG_DATA);

    onNoClick(): void {
        this.dialogRef.close(false);
    }

    onYesClick(): void {
        this.dialogRef.close(true);
    }
}
