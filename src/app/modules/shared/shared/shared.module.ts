import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridComponent } from '../components/ag-grid/ag-grid.component';
import { AgGridModule } from 'ag-grid-angular';



@NgModule({
  declarations: [AgGridComponent],
  imports: [
    CommonModule,
    AgGridModule
  ],
  exports:[AgGridComponent]
})
export class SharedModule { }
