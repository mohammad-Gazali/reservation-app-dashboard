export interface DataTableColumn {
  name: string; // column name
  dataKey: string; // key of the data in the row object
  isSortable?: boolean;
  isAction?: boolean; // to render action buttons
}
