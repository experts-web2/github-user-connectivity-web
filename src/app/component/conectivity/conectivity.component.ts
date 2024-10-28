import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { IConnectedUser, IOrganization, RepoRetail } from 'src/app/model/user';
import { ConectivityService } from 'src/app/services/conectivity.service';
import { ColDef } from 'ag-grid-community';
import { IOrganizationRepo, IOrganizationRoot } from 'src/app/model/organization';
import { ICommitRoot } from 'src/app/model/commits';
import { IPullRequestRoot } from 'src/app/model/pull-request';
import { IRepoIssueRoot } from 'src/app/model/repo-issues';

@Component({
  selector: 'app-conectivity',
  templateUrl: './conectivity.component.html',
  styleUrls: ['./conectivity.component.scss'],
})
export class ConectivityComponent implements OnInit {
  panelOpenState = false;
  connectedUser: IConnectedUser | null = null;
  organizationRepos: Array<IOrganizationRepo> = []
  display: boolean = false;
  colDefs: ColDef<any>[] = [
    { headerName: "Id", field: 'id', filter: true, sortable: true },
    { headerName: "Name",field: 'name', filter: true },
    { headerName: "Link",field: 'git_url', filter: true },
    { headerName: "Slug", field: 'disabled', filter: true },
    { headerName: "Included", field: '' ,checkboxSelection:true }
  ];

  repoComments!: number;
  repoPullRequest!: number;
  repoIssues!: number;
  repoRetails: RepoRetail[]=[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private conectivityService: ConectivityService,
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef
  ) {
    const user = localStorage.getItem('user');
    const repos = localStorage.getItem('repos');
    if (user) {
      this.connectedUser = JSON.parse(user);
    }
    if (repos) {
      this.organizationRepos = JSON.parse(repos);
      this.conectivityService.organizationRepos$.next(this.organizationRepos)
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(({ code, state }) => {
      const storedState = localStorage.getItem('latestCSRFToken');
      if (state !== storedState) return;
      localStorage.removeItem('latestCSRFToken');
      this.getCallback(code, state);

    });

    this.conectivityService.organizationRepos$.subscribe(data => {
      this.organizationRepos = data
    })
  }

  /**
   * Formats the given date string into a user-friendly format.
   * @param createAt The date string to format.
   * @returns A formatted date string in the format 'yyyy-MM-dd hh:mm a'.
   */
  getDate(createAt: string): string {
    return this.datePipe.transform(createAt, 'yyyy-MM-dd hh:mm a') || '';
  }

  /**
   * Initiates the GitHub login process.
   */
  connect(): void {
    this.conectivityService.loginWithGitHub();
  }

  /**
   * Handles the callback from GitHub OAuth process.
   * @param code The authorization code received from GitHub.
   * @param state The state parameter for CSRF protection.
   */
  private getCallback(code: string, state: string): void {
    this.spinner.show();
    this.conectivityService.getCallBack({ code, state }).subscribe({
      next: (user) => {
        localStorage.setItem('token',JSON.stringify(user.accessToken))
        this.getOrganizations(user.accessToken);
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/']);
        this.spinner.hide();
      },
      error: () => this.spinner.hide(),
    });
  }

  /**
   * Handles the callback from GitHub OAuth process.
   * @param code The authorization code received from GitHub.
   * @param state The state parameter for CSRF protection.
   */
  private getOrganizations(token: string): void {
    let payload = {
      accessToken: token
    }
    this.spinner.show();
    this.conectivityService.getOrganizations(payload).subscribe({
      next: (organizations : IOrganization[]) => {
        this.getOrganizationsRepo(token)
        this.spinner.hide();
      },
      error: () => this.spinner.hide(),
    });
  }

  /**
   * Handles the callback from GitHub OAuth process.
   * @param code The authorization code received from GitHub.
   * @param state The state parameter for CSRF protection.
   */
  getOrganizationsRepo(token: string): void {
    let payload = {
      accessToken: token,
    }
    this.spinner.show();
    this.conectivityService.getOrganizationRepos(payload).subscribe({
      next: (user : IOrganizationRoot) => {
        this.conectivityService.organizationRepos$.next(user.data)
        localStorage.setItem('repos', JSON.stringify(user.data))
        this.spinner.hide();
      },
      error: () => this.spinner.hide(),
    });
  }


  onActionClick(event:any){
    let token
    let tok = localStorage.getItem('token');
    if(tok){
      token = JSON.parse(tok)
    }

    this.spinner.show();
    combineLatest([this.conectivityService.getOrganizationReposCommits({ accessToken:token ,orgName:event.owner.login , repoName:event.name }), this.conectivityService.getOrganizationReposPullRequests({ accessToken:token ,orgName:event.owner.login , repoName:event.name }), this.conectivityService.getOrganizationReposIssues({ accessToken:token ,orgName:event.owner.login , repoName:event.name })]).subscribe({
      next: ([commits, pullRequests, issues]: [ICommitRoot, IPullRequestRoot, IRepoIssueRoot]) => {
        this.repoComments = commits.data.length
        this.repoPullRequest = pullRequests.data.length;
        this.repoIssues = issues.data.length;
        this.spinner.hide();
        this.repoRetails = [
          {
           userId: this.connectedUser?.data.id,
           userName: this.connectedUser?.data.name,
           totalCommits:this.repoComments,
           totalPullRequest: this.repoPullRequest,
           totalIssues: this.repoIssues
           },
        ];

      },
      error(err) {
        console.log(err)
      },
    });
  }

  /**
   * Disconnects the current user from the application.
   * @param userToken The access token of the user to be disconnected.
   */
  disconectUser(userToken: string): void {
    this.spinner.show();
    this.conectivityService.disconnectUser(userToken).subscribe({
      next: () => {
        localStorage.removeItem('user');
        localStorage.removeItem('repos');
        this.conectivityService.organizationRepos$.next([])
        this.connectedUser = null;
        this.spinner.hide();
      },
      error: () => this.spinner.hide(),
    });
  }
}
