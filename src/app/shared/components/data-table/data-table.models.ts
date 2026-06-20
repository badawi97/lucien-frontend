export type DataTableAlign = 'left' | 'center' | 'right';

export type DataTableActionSeverity =
  | 'success'
  | 'info'
  | 'warn'
  | 'danger'
  | 'help'
  | 'primary'
  | 'secondary'
  | 'contrast';

export interface DataTableColumn<TRow extends object = object> {
  field: Extract<keyof TRow, string> | string;
  header: string;
  sortable?: boolean;
  width?: string;
  align?: DataTableAlign;
  emptyText?: string;
}

export interface DataTableAction<TRow extends object = object> {
  id: string;
  label: string;
  icon?: string;
  severity?: DataTableActionSeverity;
  outlined?: boolean;
  disabled?: (row: TRow) => boolean;
  visible?: (row: TRow) => boolean;
}

export interface DataTableActionClick<TRow extends object = object> {
  action: DataTableAction<TRow>;
  row: TRow;
}

export interface DataTableCellContext<TRow extends object = object> {
  $implicit: TRow;
  row: TRow;
  value: unknown;
  column: DataTableColumn<TRow>;
}
