import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { GridApi, GridOptions, IGetRowsParams } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.scss'],
})
export class AgGridComponent implements OnChanges, OnInit {
  @ViewChild('myGrid') mgGrid!: AgGridAngular;
  @Input() data!: any;
  @Input() colDefs!: Array<any>;
  @Input() totalRecords!: number;

  @Output() onRowSelection: EventEmitter<any> = new EventEmitter();
  @Output() onPageChangeEvent: EventEmitter<any> = new EventEmitter();

  rowData: any;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.rowData = this.data;
    }
  }

  onSelectionChanged(event: any) {
    const selectedNodes = event.api.getSelectedNodes()[0]?.data;
    if (selectedNodes) {
      this.onRowSelection.emit(selectedNodes);
    } else {
      this.onRowSelection.emit(undefined);
    }
  }

  onPageChange(event: any) {
    this.onPageChangeEvent.emit(event);
  }
}
