import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { TourDashboardService } from '../../shared/api/services';
import { Tour } from '../../shared/api/types';
import { DataTableColumn } from '../../shared/components/data-table/data-table-column';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import { FormField } from '../../shared/components/form-dialog/form-dialog-data';
import { FormDialogComponent } from '../../shared/components/form-dialog/form-dialog.component';

@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [DataTableComponent, MatButtonModule],
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToursComponent {
  private tourService = inject(TourDashboardService);
  private dialog = inject(MatDialog);
  private fb = inject(FormBuilder);

  data = signal<Tour[]>([]);

  constructor() {
    this.tourService.getToursList().subscribe(tours => {
      this.data.set(tours);
    });
  }
  columns: DataTableColumn[] = [
    { name: 'ID', dataKey: 'id', isSortable: true },
    { name: 'English Title', dataKey: 'en_title', isSortable: true },
    { name: 'Arabic Title', dataKey: 'ar_title' },
    { name: 'Actions', dataKey: 'actions', isAction: true },
  ];

  openFormDialog(tour?: Tour): void {
    const isEdit = !!tour;
    const formGroup = this.fb.group({
      en_title: [tour?.en_title || '', Validators.required],
      ar_title: [tour?.ar_title || '', Validators.required],
      image: [null, !isEdit ? Validators.required : []],
    });

    const fields: FormField[] = [
      { name: 'en_title', label: 'English Name', type: 'text' },
      { name: 'ar_title', label: 'Arabic Name', type: 'text' },
      { name: 'image', label: 'Image', type: 'file' },
    ];

    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '500px',
      data: { title: isEdit ? 'Edit Tour' : 'Create Tour', formGroup, fields },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (isEdit) {
          // this.tourService.updateTour({ ...tour, ...result }).subscribe(...);
        } else {
          this.tourService.createTour(result).subscribe(res => {
            this.data.update(tours => [...tours, res.tour]);
          });
        }
      }
    });
  }

  onDeleteTour(tour: Tour): void {
    this.tourService.deleteTour({ tour_id: tour.id }).subscribe();
  }
}
