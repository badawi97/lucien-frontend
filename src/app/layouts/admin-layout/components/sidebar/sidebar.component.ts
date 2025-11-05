import { CommonModule } from '@angular/common';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { PanelMenu } from 'primeng/panelmenu';
import { RouterModule } from '@angular/router';
import { IdentityManagementRoutesEnum } from '../../../../proxy/user/enums/identity-management-routes.enum';
import { ModulesRoutesEnum } from '../../../../proxy/common/Modules/enums/modules-routes.enum';

@Component({
  selector: 'app-sidebar',
  standalone: true,

  imports: [
    CommonModule,
    PanelMenu,
    RouterModule,
  ],
  providers: [MessageService],

  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  isSidebarCollapsed: boolean = true;
  @Output() isSidebarCollapsedChange = new EventEmitter<boolean>(true);

  toggleSidebar() {

    this.isSidebarCollapsed = !this.isSidebarCollapsed
    this.isSidebarCollapsedChange.emit(this.isSidebarCollapsed);
  }
  menuItems: MenuItem[] | undefined;

  ngOnInit() {
    this.menuItems = [
      {
        label: 'Dashboard',
        icon: 'pi pi-link',
        routerLink: ModulesRoutesEnum.dashboard,
      },
      {
        label: 'Identity Management',
        icon: 'pi pi-palette',
        items: [
          {
            label: 'Users',
            icon: 'pi pi-eraser',
            routerLink: ModulesRoutesEnum.identityManagement + '/' + IdentityManagementRoutesEnum.users
          },
          {
            label: 'Roles',
            icon: 'pi pi-heart',
            routerLink: ModulesRoutesEnum.identityManagement + '/' + IdentityManagementRoutesEnum.roles
          }
        ],
      }
    ];
  }
}
