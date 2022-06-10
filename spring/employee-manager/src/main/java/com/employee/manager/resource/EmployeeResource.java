package com.employee.manager.resource;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.employee.manager.model.Employee;
import com.employee.manager.service.EmployeeService;

@RestController
@RequestMapping("/employee")
public class EmployeeResource {

	private final EmployeeService employeeService;

	public EmployeeResource(EmployeeService employeeService) {
		this.employeeService = employeeService;
	}
	
	@PostMapping("/add")
	public ResponseEntity<Employee> add(@RequestBody Employee employee) {
		Employee newEmployee = employeeService.add(employee);
		return new ResponseEntity<>(newEmployee, HttpStatus.CREATED);
	}
	
    @PutMapping("/update")
    public ResponseEntity<Employee> updateEmployee(@RequestBody Employee employee) {
        Employee updateEmployee = employeeService.update(employee);
        return new ResponseEntity<>(updateEmployee, HttpStatus.OK);
    }

	@GetMapping("/all")
	public ResponseEntity<List<Employee>> getAll() {
		List<Employee> employees = employeeService.findAll();
		return new ResponseEntity<>(employees, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Employee> getById(@PathVariable Long id) {
		Employee employee = employeeService.findById(id);
		return new ResponseEntity<>(employee, HttpStatus.OK);
	}

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
        employeeService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
	
}
