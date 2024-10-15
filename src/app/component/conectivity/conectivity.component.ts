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

  getDate(createAt: string): string {
    return this.datePipe.transform(new Date(createAt), 'yyyy-MM-dd hh:mm a') || '';
  }

  connect(): void {
    this.conectivityService.loginWithGitHub();
  }

  private getCallback(code: string, state: string): void {
    this.spinner.show();
    this.conectivityService.getCallBack({ code, state }).subscribe({
      next: (x) => {
        localStorage.setItem('user', JSON.stringify(x));
        this.router.navigate(['/']);
        this.spinner.hide();
      },
      error: () => this.spinner.hide(),
    });
  }

  disconectUser(userToken: string): void {
    this.spinner.show();
    this.conectivityService.disconectUser(userToken).subscribe({
      next: () => {
        localStorage.removeItem('user');
        this.connectedUser = null;
        this.spinner.hide();
      },
      error: () => this.spinner.hide(),
    });
  }
}
