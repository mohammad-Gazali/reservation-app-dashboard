import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnChanges, SimpleChanges, computed, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DataTableColumn } from './data-table-column';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    TitleCasePipe,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent<T extends { [key: string]: any }> implements OnChanges {
  data = input.required<T[]>();
  columns = input.required<DataTableColumn[]>();

  editClicked = output<T>();
  deleteClicked = output<T>();

  dataSource = new MatTableDataSource<T>([]);
  displayedColumns = computed(() => this.columns().map(c => c.name));

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.dataSource.data = this.data();
    }
  }
  onEdit(element: T) {
    this.editClicked.emit(element);
  }

  onDelete(element: T) {
    this.deleteClicked.emit(element);
  }
}
