import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormDialogData } from './form-dialog-data';
import { FileInputComponent } from "../file-input/file-input.component";
import { FileInput } from '../file-input/file-input.model';

@Component({
  selector: 'app-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FileInputComponent
],
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormDialogData
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.data.formGroup.valid) {
      for (const key in this.data.formGroup.value) {
        if (this.data.formGroup.value[key] instanceof FileInput) {
          this.data.formGroup.value[key] = this.data.formGroup.value[key].files[0];
        }
      }

      this.dialogRef.close(this.data.formGroup.value);
    }
  }

  onFileSelected(event: Event, fieldName: string) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.data.formGroup.patchValue({ [fieldName]: file });
    }
  }
}
