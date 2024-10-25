import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.scss']
})
export class AgGridComponent implements OnChanges {
  paginationPageSize = 10;
  paginationPageSizeSelector = [10, 20, 30,40,50];
  @Input() data!: Array<any>;
  @Input() colDefs!: Array<any>;
  @Output() onRowSelection: EventEmitter<any> = new EventEmitter();

  rowData: any[] = [];
  constructor(){
  
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('colDefs',this.colDefs)
    console.log('data',this.data)
    if (changes['data'] && this.data) {
      this.rowData = [...this.data];
    }
  }

  themeClass = "ag-theme-quartz";

  onRowSelected(event:any){
    this.onRowSelection.emit(event.data);
  }

  onSelectionChange(event:any){
    console.log(event);
  }

  
}
