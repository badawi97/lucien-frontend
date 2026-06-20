import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
  computed,
  input,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { DataTableCellTemplateDirective } from './data-table-cell-template.directive';
import {
  DataTableAction,
  DataTableActionClick,
  DataTableColumn,
} from './data-table.models';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, ButtonModule, InputTextModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent<TRow extends object = object> {
  readonly columns = input.required<readonly DataTableColumn<TRow>[]>();
  readonly rows = input<readonly TRow[]>([]);
  readonly actions = input<readonly DataTableAction<TRow>[]>([]);
  readonly dataKey = input<string>();
  readonly loading = input(false);
  readonly paginator = input(true);
  readonly rowsPerPage = input(10);
  readonly rowsPerPageOptions = input<readonly number[]>([10, 25, 50]);
  readonly globalFilter = input(true);
  readonly globalFilterPlaceholder = input('Search');
  readonly emptyMessage = input('No records found.');

  readonly actionClick = output<DataTableActionClick<TRow>>();

  @ContentChildren(DataTableCellTemplateDirective)
  private readonly cellTemplates?: QueryList<DataTableCellTemplateDirective<TRow>>;

  readonly tableColumns = computed<DataTableColumn<TRow>[]>(() => [...this.columns()]);
  readonly tableRows = computed<TRow[]>(() => [...this.rows()]);
  readonly pageSizeOptions = computed<number[]>(() => [...this.rowsPerPageOptions()]);
  readonly globalFilterFields = computed(() => this.columns().map((column) => column.field));

  getColumnStyle(column: DataTableColumn<TRow>): Record<string, string> | null {
    if (!column.width) {
      return null;
    }

    return { width: column.width };
  }

  getCellValue(row: TRow, column: DataTableColumn<TRow>): unknown {
    return this.resolveFieldValue(row, column.field);
  }

  getCellText(row: TRow, column: DataTableColumn<TRow>): string {
    const value = this.getCellValue(row, column);

    if (value === null || value === undefined || value === '') {
      return column.emptyText ?? '-';
    }

    return String(value);
  }

  getCellTemplate(field: string): DataTableCellTemplateDirective<TRow> | undefined {
    return this.cellTemplates?.find((template) => template.field() === field);
  }

  isActionVisible(action: DataTableAction<TRow>, row: TRow): boolean {
    return action.visible ? action.visible(row) : true;
  }

  isActionDisabled(action: DataTableAction<TRow>, row: TRow): boolean {
    return action.disabled ? action.disabled(row) : false;
  }

  getActionIcon(action: DataTableAction<TRow>): string {
    return action.icon ?? '';
  }

  onActionClick(action: DataTableAction<TRow>, row: TRow): void {
    this.actionClick.emit({ action, row });
  }

  onGlobalFilter(event: Event, table: Table): void {
    const inputElement = event.target as HTMLInputElement | null;
    table.filterGlobal(inputElement?.value ?? '', 'contains');
  }

  private resolveFieldValue(row: TRow, field: string): unknown {
    return field.split('.').reduce<unknown>((currentValue, pathSegment) => {
      if (!this.isRecord(currentValue)) {
        return undefined;
      }

      return currentValue[pathSegment];
    }, row);
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }
}
