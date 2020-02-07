import { Component, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
import { AuthService } from "../../shared/services/auth.service";
import { User } from "../../shared/services/user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userMenu = [ { title: 'Signout' } ];
  user: User;

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'user-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe((title) => {
        if(title.toLowerCase() == 'signout'){
          this.authService.SignOut();
        }
      });
    let userData = JSON.parse(localStorage.getItem('userData'));
    this.user = userData[0];
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

}
