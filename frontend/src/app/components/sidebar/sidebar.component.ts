import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() isOpen = true;
  @Output() closeSidebar = new EventEmitter<void>();
  @Output() logoutClick = new EventEmitter<void>();

  close(): void {
    this.closeSidebar.emit();
  }

  logout(): void {
    this.logoutClick.emit();
    this.close();
  }

}
