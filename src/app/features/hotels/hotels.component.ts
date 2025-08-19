import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { HotelDashboardService } from '../../shared/api/services';
import { Hotel } from '../../shared/api/types';
import { DataTableColumn } from '../../shared/components/data-table/data-table-column';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import { FormField } from '../../shared/components/form-dialog/form-dialog-data';
import { FormDialogComponent } from '../../shared/components/form-dialog/form-dialog.component';

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [DataTableComponent, MatButtonModule],
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelsComponent {
  private hotelService = inject(HotelDashboardService);
  private dialog = inject(MatDialog);
  private fb = inject(FormBuilder);

  data = signal<Hotel[]>([]);

  constructor() {
    this.hotelService.getHotelsList().subscribe(hotels => {
      this.data.set(hotels);
    });
  }

  columns: DataTableColumn[] = [
    { name: 'Arabic Title', dataKey: 'ar_title', isSortable: true },
    { name: 'English Title', dataKey: 'en_title', isSortable: true },
    { name: 'Actions', dataKey: 'actions', isAction: true },
  ];

  openFormDialog(hotel?: Hotel): void {
    const isEdit = !!hotel;
    const formGroup = this.fb.group({
      ar_title: [hotel?.ar_title || '', Validators.required],
      en_title: [hotel?.en_title || '', Validators.required],
      image: [null, !isEdit ? Validators.required : []],
    });

    const fields: FormField[] = [
      { name: 'ar_title', label: 'Arabic Title', type: 'text' },
      { name: 'en_title', label: 'English Title', type: 'text' },
      { name: 'image', label: 'Image', type: 'file' },
    ];

    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '500px',
      data: { title: isEdit ? 'Edit Hotel' : 'Create Hotel', formGroup, fields },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (isEdit) {
          // this.hotelService.updateHotel({ ...hotel, ...result }).subscribe(...);
        } else {
          this.hotelService.createHotel(result).subscribe(res => {
            this.data.update(hotels => [...hotels, res.hotel]);
          });
        }
      }
    });
  }

  onDeleteHotel(hotel: Hotel): void {
    // Implement delete logic, perhaps with a confirmation dialog
    this.hotelService.deleteHotel({ hotel_id: hotel.id }).subscribe();
  }
}
