import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatMenu, MatMenuTrigger } from "@angular/material/menu"
import { BreakpointObserver } from '@angular/cdk/layout';
import { UserInfo, User } from 'src/app/models/user.model';
import { LogInService } from 'src/app/services/log-in.service';
import { Router } from '@angular/router';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  lanId: string;
  usersInfo: UserInfo[];
  user: UserInfo;
  

  status: boolean = false;
  clickEvent(){
      this.status = !this.status;       
  }

  constructor(
    private router: Router,
    private observer: BreakpointObserver,
    private loginService: LogInService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.observer.observe(['(max-width : 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });

    this.changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {
    this.lanId = sessionStorage.getItem('lanId') || '';
    this.loginService.users.subscribe((users) => {
      this.usersInfo = users;
    });

    this.loginService.userProfile.subscribe((res) => {
      this.user = res;
    });


  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

}
