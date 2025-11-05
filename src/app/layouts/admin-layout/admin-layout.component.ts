import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { PageContentComponent } from "./components/page-content/page-content.component";

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    PageContentComponent
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
  isSidebarCollapsed: boolean = false;

  toggleSidebar(isSidebarCollapsed: boolean): void {
    this.isSidebarCollapsed = !isSidebarCollapsed
  }
}
