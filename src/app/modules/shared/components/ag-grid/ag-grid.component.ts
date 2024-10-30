import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.scss']
})
export class AgGridComponent implements OnChanges {
  @Input() data!: Array<any>;
  @Input() colDefs!: Array<any>;
  @Input() pagination: boolean = true;
  @Input() paginationPageSize: number = 10;
  previousPage: number = 1;
  @Output() onRowSelection: EventEmitter<any> = new EventEmitter();
  @Output() pageSelection: EventEmitter<any> = new EventEmitter();

  rowData: any[] = [];
  constructor(){
  
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.rowData = [...this.data];
    }
  }

  themeClass = "ag-theme-quartz";

  onRowSelected(event:any){
  }
  
  onSelectionChanged(event:any){
    const selectedNodes = event.api.getSelectedNodes()[0]?.data;
    if(selectedNodes){
      this.onRowSelection.emit(selectedNodes);
    }
    else{
      this.onRowSelection.emit(undefined);
    }
  }

  onPaginationChanged(params: any) {
    const currentPage = params.api.paginationGetCurrentPage() + 1;
    if (currentPage !== this.previousPage) {
      this.previousPage = currentPage;
      const pageSize = this.paginationPageSize;
      this.pageSelection.emit({ currentPage, pageSize });
    }
    }

  
}
