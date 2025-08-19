import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { EventHallDashboardService } from '../../shared/api/services';
import { EventHall } from '../../shared/api/types';
import { DataTableColumn } from '../../shared/components/data-table/data-table-column';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import { FormField } from '../../shared/components/form-dialog/form-dialog-data';
import { FormDialogComponent } from '../../shared/components/form-dialog/form-dialog.component';

@Component({
  selector: 'app-event-halls',
  standalone: true,
  imports: [DataTableComponent, MatButtonModule],
  templateUrl: './event-halls.component.html',
  styleUrls: ['./event-halls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventHallsComponent {
  private eventHallService = inject(EventHallDashboardService);
  private dialog = inject(MatDialog);
  private fb = inject(FormBuilder);

  data = signal<EventHall[]>([]);

  constructor() {
    this.eventHallService.getEventHallsList().subscribe(eventHalls => {
      this.data.set(eventHalls);
    });
  }

  columns: DataTableColumn[] = [
    { name: 'ID', dataKey: 'id', isSortable: true },
    { name: 'English Title', dataKey: 'en_title', isSortable: true },
    { name: 'Arabic Title', dataKey: 'ar_title' },
    { name: 'Actions', dataKey: 'actions', isAction: true },
  ];

  openFormDialog(eventHall?: EventHall): void {
    const isEdit = !!eventHall;
    const formGroup = this.fb.group({
      en_title: [eventHall?.en_title || '', Validators.required],
      ar_title: [eventHall?.ar_title || '', Validators.required],
      image: [null, !isEdit ? Validators.required : []],
    });

    const fields: FormField[] = [
      { name: 'en_title', label: 'English title', type: 'text', value: eventHall?.en_title },
      { name: 'ar_title', label: 'Arabic title', type: 'text', value: eventHall?.ar_title },
      { name: 'image', label: 'Image', type: 'file' },
    ];

    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '500px',
      data: {
        title: isEdit ? 'Edit Event Hall' : 'Add New Event Hall',
        formGroup,
        fields,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (isEdit) {
          // Update logic here
        } else {
          this.eventHallService.createEventHall(result).subscribe(res => {
            this.data.update(currentHalls => [...currentHalls, res.event_hall]);
          });
        }
      }
    });
  }

  onDeleteEventHall(eventHall: EventHall): void {
    this.eventHallService.deleteEventHall({ event_hall_id: eventHall.id }).subscribe();
  }
}
