import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { IPagination } from 'src/app/model/organization';
import { GridApi, GridOptions, IGetRowsParams } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.scss']
})
export class AgGridComponent implements OnChanges ,OnInit{
  @ViewChild('myGrid') mgGrid!: AgGridAngular;
  gridOptions!: Partial<GridOptions>
  @Input() data!: any;
  @Input() colDefs!: Array<any>;
  @Input() pagination: boolean = true;
  @Input() paginationPageSize: number = 10;
  @Input() paginationObj!: any;
  previousPage: number = 1;
  private gridApi!: GridApi;

  @Output() onRowSelection: EventEmitter<any> = new EventEmitter();
  @Output() pageSelection: EventEmitter<any> = new EventEmitter();

  rowData: any;
  paginatedRowData: any;
  themeClass = "ag-theme-quartz";
  gridColumnApi: any;

  constructor(){
    this.gridOptions = {
      cacheBlockSize:10,
      paginationPageSize:10,
      rowModelType:"infinite",
      pagination:true,
      suppressPaginationPanel: true
    }
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.gridOptions.rowData = this.data;
      this.gridOptions.paginationPageSize = this.data?.data?.length;
      this.rowData = this.data;
      if(this.rowData.data && this.gridApi) {
        var dataSource = {
          getRows:(params:IGetRowsParams)=>{
            params.successCallback(this.rowData.data,this.rowData.totalRecords)
          },
        }
        this.gridApi.setDatasource(dataSource)
      }

    }
    if (changes['colDefs'] && this.colDefs) {   
      this.gridOptions.columnDefs = this.colDefs

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
    this.gridColumnApi = params.gridColumnApi;
    // this.paginatedRowData = this.rowData.data
    var dataSource = {
      getRows:(params:IGetRowsParams)=>{
        params.successCallback(this.rowData.data,this.rowData.totalRecords)
      },
    }
    this.gridApi.setDatasource(dataSource)
    // this.gridApi.paginationGoToPage(this.paginationObj?.currentPage - 1);
  }
  
  onPaginationChanged(event: any) {
    const currentPage = event.api.paginationGetCurrentPage() + 1;
    if (currentPage !== this.previousPage) {
      this.previousPage = currentPage;
      this.paginationObj.currentPage = currentPage;
      this.pageSelection.emit({ currentPage, pageSize: this.paginationPageSize });
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.paginationObj.totalPages) {
      this.paginationObj.currentPage = page;
      this.pageSelection.emit({ currentPage: page, perPage: this.paginationObj.perPage });
      this.updatePaginatedRowData();
    }
  }

  updatePaginatedRowData() {
    if (this.gridApi) {
      this.gridApi.paginationSetPageSize(this.paginationObj?.perPage);
      this.gridApi.paginationGoToPage(this.paginationObj?.currentPage - 1);
    }
  }
}
