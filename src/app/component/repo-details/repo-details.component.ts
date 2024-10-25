import { Component, Input } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { RepoRetail } from 'src/app/model/user';


@Component({
  selector: 'app-repo-details',
  templateUrl: './repo-details.component.html',
  styleUrls: ['./repo-details.component.scss']
})
export class RepoDetailsComponent {
  @Input() data :RepoRetail[]=[];
  colDetailsDefs: ColDef<any>[] = [
    { headerName: "UserId", field: 'userId', filter: true, sortable: true },
    { headerName: "User", field: 'userName', filter: true },
    { headerName: "Total Commits", field: 'totalCommits', filter: true },
    { headerName: "Total Pull Requests", field: 'totalPullRequest', filter: true },
    { headerName: "Total Issues", field: 'totalIssues', filter: true },
  ];
}
