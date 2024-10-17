import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IConnectedUser } from 'src/app/model/user';
import { ConectivityService } from 'src/app/services/conectivity.service';

@Component({
  selector: 'app-conectivity',
  templateUrl: './conectivity.component.html',
  styleUrls: ['./conectivity.component.scss'],
  providers: [DatePipe],
})
export class ConectivityComponent implements OnInit {
  panelOpenState = false;
  connectedUser: IConnectedUser | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private conectivityService: ConectivityService,
    private spinner: NgxSpinnerService
  ) {
    const user = localStorage.getItem('user');
    if (user) {
      this.connectedUser = JSON.parse(user);
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(({ code, state }) => {
      const storedState = localStorage.getItem('latestCSRFToken');
      if (state !== storedState) return;

      localStorage.removeItem('latestCSRFToken');
      this.getCallback(code, state);
    });
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
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/']);
        this.spinner.hide();
      },
      error: () => this.spinner.hide(),
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
        this.connectedUser = null;
        this.spinner.hide();
      },
      error: () => this.spinner.hide(),
    });
  }
}
