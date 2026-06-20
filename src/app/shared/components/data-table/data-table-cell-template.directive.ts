import { Directive, TemplateRef, input } from '@angular/core';
import { DataTableCellContext } from './data-table.models';

@Directive({
  selector: 'ng-template[appDataTableCell]',
  standalone: true,
})
export class DataTableCellTemplateDirective<TRow extends object = object> {
  readonly field = input.required<string>({ alias: 'appDataTableCell' });

  constructor(readonly templateRef: TemplateRef<DataTableCellContext<TRow>>) {}
}
