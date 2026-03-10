import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Employee, EmployeePagination } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  @Output() employeeChanged = new EventEmitter<void>();

  employees: Employee[] = [];
  displayedColumns: string[] = ['name', 'email', 'department', 'salary', 'joining_date', 'actions'];
  searchTerm = '';
  departmentFilter = '';
  departments: string[] = [];
  page = 1;
  limit = 10;
  pagination: EmployeePagination = {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  };
  deleteModalOpen = false;
  selectedEmployee: Employee | null = null;

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly toastr: ToastrService,
    private readonly spinner: NgxSpinnerService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadDepartmentOptions();
    this.loadEmployees();
  }

  loadDepartmentOptions(): void {
    this.employeeService.getEmployees('', '', 1, 1000).subscribe({
      next: (response) => {
        this.departments = this.getDepartmentsFromRows(response.data);
      }
    });
  }

  loadEmployees(): void {
    this.spinner.show();
    this.employeeService.getEmployees(this.searchTerm, this.departmentFilter, this.page, this.limit).subscribe({
      next: (response) => {
        this.employees = response.data;
        this.pagination = response.pagination;
      },
      error: () => {
        this.toastr.error('Unable to fetch employees');
      },
      complete: () => this.spinner.hide()
    });
  }

  onSearch(): void {
    this.page = 1;
    this.loadEmployees();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.departmentFilter = '';
    this.page = 1;
    this.loadEmployees();
  }

  onDepartmentChange(): void {
    this.page = 1;
    this.loadEmployees();
  }

  createEmployee(): void {
    this.router.navigate(['/dashboard/employees/new']);
  }

  editEmployee(employee: Employee): void {
    this.router.navigate([`/dashboard/employees/${employee.id}/edit`]);
  }

  openDeleteModal(employee: Employee): void {
    this.selectedEmployee = employee;
    this.deleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.deleteModalOpen = false;
    this.selectedEmployee = null;
  }

  confirmDelete(): void {
    if (!this.selectedEmployee?.id) {
      return;
    }

    this.spinner.show();
    this.employeeService.deleteEmployee(this.selectedEmployee.id).subscribe({
      next: () => {
        this.toastr.success('Employee deleted');
        this.closeDeleteModal();

        if (this.employees.length === 1 && this.page > 1) {
          this.page -= 1;
        }

        this.loadEmployees();
        this.employeeChanged.emit();
      },
      error: () => {
        this.toastr.error('Failed to delete employee');
      },
      complete: () => this.spinner.hide()
    });
  }

  changePage(newPage: number): void {
    if (newPage < 1 || newPage > this.pagination.totalPages) {
      return;
    }

    this.page = newPage;
    this.loadEmployees();
  }

  get pageNumbers(): number[] {
    const totalPages = this.pagination.totalPages || 1;
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  private getDepartmentsFromRows(rows: Employee[]): string[] {
    return Array.from(new Set(rows.map((row) => row.department).filter(Boolean))).sort();
  }

}
