import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeStats } from '../../models/employee.model';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  sidebarOpen = true;
  darkMode = false;
  userEmail = 'admin@example.com';
  stats: EmployeeStats = {
    totalEmployees: 0,
    totalSalary: 0,
    averageSalary: 0,
    totalDepartments: 0
  };

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly authService: AuthService,
    private readonly themeService: ThemeService,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    this.userEmail = user?.email || this.userEmail;
    this.darkMode = this.themeService.isDarkMode();
    this.themeService.darkMode$.subscribe((isDark) => {
      this.darkMode = isDark;
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects.startsWith('/dashboard')) {
        this.loadStats();
      }
    });

    this.loadStats();
  }

  loadStats(): void {
    this.employeeService.getEmployeeStats().subscribe({
      next: (stats) => {
        this.stats = stats;
      },
      error: (error) => {
        if (error?.status !== 401) {
          this.toastr.error('Failed to load employee statistics');
        }
      }
    });
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar(): void {
    if (window.innerWidth <= 992) {
      this.sidebarOpen = false;
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  logout(): void {
    this.authService.logout();
    this.toastr.info('Logged out successfully');
    this.router.navigate(['/login']);
  }

}
