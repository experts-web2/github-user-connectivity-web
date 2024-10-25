import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';


@Component({
  selector: 'app-repo-details',
  templateUrl: './repo-details.component.html',
  styleUrls: ['./repo-details.component.scss']
})
export class RepoDetailsComponent {
  colDetailsDefs: ColDef<any>[] = [
    { headerName: "UserId", field: 'id', filter: true, sortable: true },
    { headerName: "User", field: 'name', filter: true },
    { headerName: "Total Commits", field: 'git_url', filter: true },
    { headerName: "Total Pull Requests", field: 'disabled', filter: true },
    { headerName: "Total Issues", field: 'disabled', filter: true },
  ];
}
