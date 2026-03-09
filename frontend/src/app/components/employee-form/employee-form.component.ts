import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  isEditMode = false;
  employeeId: number | null = null;
  departments = ['Engineering', 'Human Resources', 'Sales', 'Marketing', 'Finance', 'Operations'];

  constructor(
    private readonly fb: FormBuilder,
    private readonly employeeService: EmployeeService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly toastr: ToastrService,
    private readonly spinner: NgxSpinnerService
  ) {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      department: ['', [Validators.required]],
      salary: [null, [Validators.required, Validators.min(0)]],
      joining_date: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.employeeId = Number(id);
      this.fetchEmployee(this.employeeId);
    }
  }

  get formControls() {
    return this.employeeForm.controls;
  }

  fetchEmployee(id: number): void {
    this.spinner.show();
    this.employeeService.getEmployeeById(id).subscribe({
      next: (employee) => {
        this.employeeForm.patchValue({
          ...employee,
          joining_date: this.formatDate(employee.joining_date)
        });
      },
      error: () => {
        this.toastr.error('Failed to load employee details');
        this.router.navigate(['/dashboard/employees']);
      },
      complete: () => this.spinner.hide()
    });
  }

  submit(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const payload: Employee = {
      ...this.employeeForm.value,
      salary: Number(this.employeeForm.value.salary)
    };

    this.spinner.show();

    if (this.isEditMode && this.employeeId) {
      this.employeeService.updateEmployee(this.employeeId, payload).subscribe({
        next: () => {
          this.toastr.success('Employee updated successfully');
          this.router.navigate(['/dashboard/employees']);
        },
        error: (error) => {
          this.toastr.error(error?.error?.message || 'Failed to update employee');
        },
        complete: () => this.spinner.hide()
      });
      return;
    }

    this.employeeService.createEmployee(payload).subscribe({
      next: () => {
        this.toastr.success('Employee added successfully');
        this.router.navigate(['/dashboard/employees']);
      },
      error: (error) => {
        this.toastr.error(error?.error?.message || 'Failed to create employee');
      },
      complete: () => this.spinner.hide()
    });
  }

  cancel(): void {
    this.router.navigate(['/dashboard/employees']);
  }

  private formatDate(date: string): string {
    return date ? new Date(date).toISOString().split('T')[0] : '';
  }

}
