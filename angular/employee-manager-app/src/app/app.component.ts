import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public employees!: Employee[];
  public editEmployee!: Employee;
  public deleteEmployee!: Employee;

  constructor(
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getAll().subscribe({
      next: (employeesResponse: Employee[]) => {
        this.employees = employeesResponse
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    });
  }

  public onAddEmloyee(addForm: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.add(addForm.value).subscribe({
      next: () => {
        this.getEmployees();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    });
  }

  public onUpdateEmloyee(employee: Employee): void {
    this.employeeService.update(employee).subscribe({
      next: () => {
        this.getEmployees();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public onDeleteEmloyee(employeeId: number): void {
    this.employeeService.delete(employeeId).subscribe({
      next: () => {
        this.getEmployees();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public searchEmployees(key: string): void {
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }

  public onOpenModal(employee: Employee | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }

    if (employee) {
      if (mode === 'edit') {
        this.editEmployee = employee;
        button.setAttribute('data-target', '#updateEmployeeModal');
      }

      if (mode === 'delete') {
        this.deleteEmployee = employee;
        button.setAttribute('data-target', '#deleteEmployeeModal');
      }
    }

    container?.appendChild(button);
    button.click();
  }

}
