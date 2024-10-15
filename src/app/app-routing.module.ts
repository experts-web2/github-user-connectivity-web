import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConectivityComponent } from './component/conectivity/conectivity.component';

const routes: Routes = [ {
  path: '',
  component: ConectivityComponent,
  pathMatch: 'full',
},
{
  path: 'connectivity',
  component: ConectivityComponent ,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
