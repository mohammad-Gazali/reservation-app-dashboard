import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, SimpleChanges, computed, input, output } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TitleCasePipe } from '@angular/common';
import { DataTableColumn } from './data-table-column';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    TitleCasePipe,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
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
  totalRows = input(0);
  pageSize = input(10);
  pageSizeOptions = input([5, 10, 25, 100]);

  sortChanged = output<Sort>();
  pageChanged = output<PageEvent>();
  editClicked = output<T>();
  deleteClicked = output<T>();

  dataSource = new MatTableDataSource<T>([]);
  displayedColumns = computed(() => this.columns().map(c => c.name));

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.dataSource.data = this.data();
    }
  }

  onSortChange(sort: Sort) {
    this.sortChanged.emit(sort);
  }

  onPageChange(event: PageEvent) {
    this.pageChanged.emit(event);
  }

  onEdit(element: T) {
    this.editClicked.emit(element);
  }

  onDelete(element: T) {
    this.deleteClicked.emit(element);
  }
}
