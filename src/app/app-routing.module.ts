import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConectivityComponent } from './component/conectivity/conectivity.component';
import { ROUTES } from './constants/routes';

const routes: Routes = [
  {
    path: ROUTES.HOME,
    component: ConectivityComponent,
    pathMatch: 'full',
  },
  {
    path: ROUTES.CONNECTIVITY,
    component: ConectivityComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
