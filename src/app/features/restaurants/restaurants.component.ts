import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { RestaurantDashboardService } from '../../shared/api/services';
import { Restaurant } from '../../shared/api/types';
import { DataTableColumn } from '../../shared/components/data-table/data-table-column';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import { FormField } from '../../shared/components/form-dialog/form-dialog-data';
import { FormDialogComponent } from '../../shared/components/form-dialog/form-dialog.component';

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [DataTableComponent, MatButtonModule],
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestaurantsComponent {
  private restaurantService = inject(RestaurantDashboardService);
  private dialog = inject(MatDialog);
  private fb = inject(FormBuilder);

  data = signal<Restaurant[]>([]);

  constructor() {
    this.restaurantService.getRestaurantsList().subscribe(restaurants => {
      this.data.set(restaurants);
    });
  }

  columns: DataTableColumn[] = [
    { name: 'Arabic Title', dataKey: 'ar_title', isSortable: true },
    { name: 'English Title', dataKey: 'en_title', isSortable: true },
    { name: 'Actions', dataKey: 'actions', isAction: true },
  ];

  openFormDialog(restaurant?: Restaurant): void {
    const isEdit = !!restaurant;
    const formGroup = this.fb.group({
      ar_title: [restaurant?.ar_title || '', Validators.required],
      en_title: [restaurant?.en_title || '', Validators.required],
      image: [null, !isEdit ? Validators.required : []],
    });

    const fields: FormField[] = [
      { name: 'ar_title', label: 'Arabic Name', type: 'text' },
      { name: 'en_title', label: 'English Name', type: 'text' },
      { name: 'image', label: 'Image', type: 'file' },
    ];

    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '500px',
      data: { title: isEdit ? 'Edit Restaurant' : 'Create Restaurant', formGroup, fields },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (isEdit) {
          // this.restaurantService.updateRestaurant({ ...restaurant, ...result }).subscribe(...);
        } else {
          this.restaurantService.createRestaurant(result).subscribe(res => {
            this.data.update(restaurants => [...restaurants, res.restaurant]);
          });
        }
      }
    });
  }

  onDeleteRestaurant(restaurant: Restaurant): void {
    this.restaurantService.deleteRestaurant({ restaurant_id: restaurant.id }).subscribe();
  }
}
