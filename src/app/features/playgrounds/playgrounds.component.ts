import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { PlaygroundDashboardService } from '../../shared/api/services';
import { PlayGround } from '../../shared/api/types';
import { DataTableColumn } from '../../shared/components/data-table/data-table-column';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import { FormField } from '../../shared/components/form-dialog/form-dialog-data';
import { FormDialogComponent } from '../../shared/components/form-dialog/form-dialog.component';

@Component({
  selector: 'app-playgrounds',
  standalone: true,
  imports: [DataTableComponent, MatButtonModule],
  templateUrl: './playgrounds.component.html',
  styleUrls: ['./playgrounds.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundsComponent {
  private playgroundService = inject(PlaygroundDashboardService);
  private dialog = inject(MatDialog);
  private fb = inject(FormBuilder);

  data = signal<PlayGround[]>([]);

  constructor() {
    this.playgroundService.getPlaygroundsList().pipe(
    ).subscribe(playgrounds => {
      this.data.set(playgrounds);
    });
  }

  columns: DataTableColumn[] = [
    { name: 'ID', dataKey: 'id', isSortable: true },
    { name: 'English Title', dataKey: 'en_title', isSortable: true },
    { name: 'Arabic Title', dataKey: 'ar_title' },
    { name: 'Sport', dataKey: 'sport' },
    { name: 'Actions', dataKey: 'actions', isAction: true },
  ];

  openFormDialog(playground?: PlayGround): void {
    const isEdit = !!playground;
    const formGroup = this.fb.group({
      en_title: [playground?.en_title || '', Validators.required],
      ar_title: [playground?.ar_title || '', Validators.required],
      sport: [playground?.sport || '', Validators.required],
      price: [playground?.price || 0, [Validators.required, Validators.min(0)]],
      capacity: [playground?.capicity || 0, [Validators.required, Validators.min(1)]],
      en_location: [playground?.en_location || '', Validators.required],
      ar_location: [playground?.ar_location || '', Validators.required],
      image: [null, !isEdit ? Validators.required : []],
    });

    const fields: FormField[] = [
      { name: 'en_title', label: 'English Title', type: 'text' },
      { name: 'ar_title', label: 'Arabic Title', type: 'text' },
      {
        name: 'sport', label: 'Sport', type: 'select', options: [
          { value: 'Football', viewValue: 'Football' },
          { value: 'Basketball', viewValue: 'Basketball' },
          { value: 'Tennis', viewValue: 'Tennis' },
        ]
      },
      { name: 'price', label: 'Price', type: 'number' },
      { name: 'capacity', label: 'Capacity', type: 'number' },
      { name: 'en_location', label: 'English Location', type: 'text' },
      { name: 'ar_location', label: 'Arabic Location', type: 'text' },
      { name: 'image', label: 'Image', type: 'file' },
    ];

    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '500px',
      data: { title: isEdit ? 'Edit Playground' : 'Create Playground', formGroup, fields },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (isEdit) {
          // this.playgroundService.updatePlayground({ ...playground, ...result }).subscribe(...);
        } else {
          this.playgroundService.createPlayground(result).subscribe(res => {
            this.data.update(playgrounds => [...playgrounds, res.playground]);
          });
        }
      }
    });
  }

  onDeletePlayground(playground: PlayGround): void {
    this.playgroundService.deletePlayground({ play_ground_id: playground.id }).subscribe();
  }
}
