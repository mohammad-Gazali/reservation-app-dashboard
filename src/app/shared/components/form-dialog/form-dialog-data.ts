import { FormGroup } from '@angular/forms';

export interface FormDialogData {
  title: string;
  formGroup: FormGroup;
  fields: FormField[];
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'textarea' | 'select' | 'file' | 'password';
  options?: { value: any; viewValue: string }[];
  value?: any;
}
