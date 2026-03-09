import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee, EmployeeListResponse, EmployeeStats } from '../models/employee.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly apiUrl = 'http://localhost:5000/api/employees';

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) {}

  getEmployees(search = '', page = 1, limit = 10): Observable<EmployeeListResponse> {
    const params = new HttpParams()
      .set('search', search)
      .set('page', String(page))
      .set('limit', String(limit));

    return this.http.get<EmployeeListResponse>(this.apiUrl, {
      headers: this.getAuthHeaders(),
      params
    });
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  createEmployee(payload: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, payload, {
      headers: this.getAuthHeaders()
    });
  }

  updateEmployee(id: number, payload: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, payload, {
      headers: this.getAuthHeaders()
    });
  }

  deleteEmployee(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  getEmployeeStats(): Observable<EmployeeStats> {
    return this.http.get<EmployeeStats>(`${this.apiUrl}/stats`, {
      headers: this.getAuthHeaders()
    });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();

    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }
}
