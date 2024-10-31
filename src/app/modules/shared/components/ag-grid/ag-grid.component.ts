import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IPagination } from 'src/app/model/organization';
import { GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.scss']
})
export class AgGridComponent implements OnChanges ,OnInit{
  @Input() data!: any;
  @Input() colDefs!: Array<any>;
  @Input() pagination: boolean = true;
  @Input() paginationPageSize: number = 10;
  @Input() paginationObj!: any;
  previousPage: number = 1;
  private gridApi!: GridApi;

  @Output() onRowSelection: EventEmitter<any> = new EventEmitter();
  @Output() pageSelection: EventEmitter<any> = new EventEmitter();

  rowData: any[] = [];
  paginatedRowData: any;
  themeClass = "ag-theme-quartz";

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('dasdas',this.pagination)
    if (changes['data'] && this.data) {
      this.rowData = this.data;
      console.log('this.rowData',this.rowData);
    }
    if (changes['paginationObj'] && this.paginationObj) {   
      console.log('paginationObj',this.paginationObj) 
    }
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
  

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.paginatedRowData = this.rowData
    // this.gridApi.paginationGoToPage(this.paginationObj?.currentPage - 1);
  }
  
  onPaginationChanged(event: any) {
    const currentPage = event.api.paginationGetCurrentPage() + 1;
    console.log('event',currentPage !== this.previousPage)
    if (currentPage !== this.previousPage) {
      this.previousPage = currentPage;
      this.paginationObj.currentPage = currentPage;
      console.log('kdhaksjd')
      this.pageSelection.emit({ currentPage, pageSize: this.paginationPageSize });
      
    }
  }


  updatePaginatedRowData() {
    if (this.gridApi) {
      this.gridApi.paginationSetPageSize(this.paginationObj?.perPage);
      this.gridApi.paginationGoToPage(this.paginationObj?.currentPage - 1);
    }
  }
}
