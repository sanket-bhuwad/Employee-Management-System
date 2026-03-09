export interface Employee {
	id?: number;
	name: string;
	email: string;
	department: string;
	salary: number;
	joining_date: string;
	created_at?: string;
}

export interface EmployeePagination {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
}

export interface EmployeeListResponse {
	data: Employee[];
	pagination: EmployeePagination;
}

export interface EmployeeStats {
	totalEmployees: number;
	totalSalary: number;
	averageSalary: number;
	totalDepartments: number;
}
