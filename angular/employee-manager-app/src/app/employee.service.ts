import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = `${environment.apiUrl}/employee`;

  constructor(
    private http: HttpClient
  ) { }


  public add(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}/add`, employee);
  }

  public update(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/update`, employee);
  }

  public getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/all`);
  }

  public getById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${id}`);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

}
