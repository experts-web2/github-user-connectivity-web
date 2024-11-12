import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridComponent } from '../components/ag-grid/ag-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [AgGridComponent],
  imports: [
    CommonModule,
    AgGridModule,
    MatPaginatorModule
  ],
  exports:[AgGridComponent]
})
export class SharedModule { }
