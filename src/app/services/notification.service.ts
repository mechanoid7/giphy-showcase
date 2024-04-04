import {
    Component,
    Inject,
    Injectable,
} from "@angular/core";
import {MatButton} from "@angular/material/button";
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
    providedIn: "root",
})
export class NotificationService {
    constructor(
        private readonly snackBar: MatSnackBar,
        public dialog: MatDialog,
    ) {
    }

    public success(message: string) {
        this.openSnackBar(message, "", "success-snackbar");
    }

    public error(message: string, duration: number = 2500) {
        this.openSnackBar(message, "", "error-snackbar", duration);
    }

    public confirmation(
        message: string,
        okCallback: () => void,
        title = "Are you sure?",
        cancelCallback: () => any = () => {
        },
    ) {
        const dialogRef = this.dialog.open(ConfirmationDialog, {
            width: "250px",
            data: {message: message, title: title},
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result && okCallback) {
                okCallback();
            }
            if (!result && cancelCallback) {
                cancelCallback();
            }
        });
    }

    public alert(message: string, title = "Notice", okCallback: () => void = () => {
    }) {
        const dialogRef = this.dialog.open(AlertDialog, {
            width: "250px",
            data: {message: message, title: title},
            disableClose: true,
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result && okCallback) {
                okCallback();
            }
        });
    }

    public openSnackBar(
        message: string,
        action: string,
        className = "",
        duration = 2500,
    ) {
        this.snackBar.open(message, action, {
            duration: duration,
            panelClass: [className],
        });
    }
}

export interface DialogData {
    message: string;
    title: string;
}

@Component({
    template: `
        <h1 mat-dialog-title>{{ data.title }}</h1>
        <div mat-dialog-content>
            {{ data.message }}
        </div>
        <div mat-dialog-actions>
            <button mat-raised-button color="warn" (click)="onNoClick()">
                Cancel
            </button>
            <button mat-raised-button color="primary" (click)="onYesClick()">
                Ok
            </button>
        </div>
    `,
    standalone: true,
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatButton,
    ],
})
export class ConfirmationDialog {
    constructor(
        public dialogRef: MatDialogRef<ConfirmationDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {
    }

    onNoClick(): void {
        this.dialogRef.close(false);
    }

    onYesClick(): void {
        this.dialogRef.close(true);
    }
}

@Component({
    template: `
        <h1 mat-dialog-title>{{ data.title }}</h1>
        <div mat-dialog-content>
            {{ data.message }}
        </div>
        <div mat-dialog-actions>
            <button mat-raised-button color="primary" (click)="onYesClick()">
                Ok
            </button>
        </div>
    `,
    standalone: true,
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatButton,
    ],
})
export class AlertDialog {
    constructor(
        public dialogRef: MatDialogRef<AlertDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {
    }

    onYesClick(): void {
        this.dialogRef.close(true);
    }
}
