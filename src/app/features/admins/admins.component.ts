import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { AdminDashboardService } from '../../shared/api/services';
import { User } from '../../shared/api/types';
import { DataTableColumn } from '../../shared/components/data-table/data-table-column';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import { FormField } from '../../shared/components/form-dialog/form-dialog-data';
import { FormDialogComponent } from '../../shared/components/form-dialog/form-dialog.component';

@Component({
  selector: 'app-admins',
  standalone: true,
  imports: [DataTableComponent, MatButtonModule],
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminsComponent {
  private adminService = inject(AdminDashboardService);
  private dialog = inject(MatDialog);
  private fb = inject(FormBuilder);

  data = signal<User[]>([]);

  constructor() {
    this.adminService.getUsers().pipe(
      map(res => res.users)
    ).subscribe(users => {
      this.data.set(users);
    });
  }

  columns: DataTableColumn[] = [
    { name: 'ID', dataKey: 'id', isSortable: true },
    { name: 'Username', dataKey: 'username', isSortable: true },
    { name: 'Email', dataKey: 'email' },
    { name: 'Actions', dataKey: 'actions', isAction: true },
  ];

  openFormDialog(user?: User): void {
    const isEdit = !!user;
    const formGroup = this.fb.group({
      name: [user?.username || '', Validators.required],
      email: [user?.email || '', [Validators.required, Validators.email]],
      password: ['', !isEdit ? Validators.required : []],
      role: ['admin', Validators.required],
    });

    const fields: FormField[] = [
      { name: 'name', label: 'Name', type: 'text' },
      { name: 'email', label: 'Email', type: 'text' },
      { name: 'password', label: 'Password', type: 'password' },
      { name: 'role', label: 'Role', type: 'select', options: [
        { value: 'super-admin', viewValue: 'Super Admin' },
        { value: 'admin', viewValue: 'Admin' },
        { value: 'manager', viewValue: 'Manager' },
      ] },
    ];

    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '500px',
      data: { title: isEdit ? 'Edit User' : 'Create Admin', formGroup, fields },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (isEdit) {
          // Not implemented
        } else {
          this.adminService.createAdmin(result).subscribe(res => {
            this.data.update(users => [...users, res.user]);
          });
        }
      }
    });
  }

  onDeleteAdmin(user: User): void {
    this.adminService.deleteAdmin({ admin_id: user.id }).subscribe(() => {
      this.data.update(users => users.filter(u => u.id !== user.id));
    });
  }
}
